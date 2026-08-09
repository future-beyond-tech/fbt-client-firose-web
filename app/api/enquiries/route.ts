import { NextRequest, NextResponse } from 'next/server';
import {
  INQUIRY_TYPES,
  INTEREST_OPTIONS,
  type EnquiryPayload,
  type InquiryType,
  type InterestOption,
} from '@/app/lib/enquiries';

export const runtime = 'nodejs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\-\s0-9]{7,24}$/;
const MAX_BODY_BYTES = 32_000;
const MIN_COMPLETION_MS = 1_500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = { count: number; resetAt: number };
const rateLimitStore = new Map<string, RateLimitEntry>();

type ValidationResult =
  | { ok: true; payload: EnquiryPayload }
  | { ok: false; fieldErrors: Record<string, string> };

function readString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  return normalized.length <= maxLength ? normalized : null;
}

function validatePayload(input: unknown): ValidationResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, fieldErrors: { form: 'Please review the form and try again.' } };
  }

  const data = input as Record<string, unknown>;
  const name = readString(data.name, 120);
  const company = readString(data.company, 160);
  const email = readString(data.email, 254);
  const phone = readString(data.phone, 24);
  const countryLocation = readString(data.countryLocation, 120);
  const inquiryType = readString(data.inquiryType, 80);
  const interestedDivision = readString(data.interestedDivision, 100);
  const message = readString(data.message, 3_000);
  const context = readString(data.context, 80);
  const website = readString(data.website, 200);
  const startedAt = typeof data.startedAt === 'number' ? data.startedAt : 0;
  const fieldErrors: Record<string, string> = {};

  if (!name || name.length < 2) fieldErrors.name = 'Please enter your name.';
  if (!email || !EMAIL_PATTERN.test(email)) fieldErrors.email = 'Please enter a valid email address.';
  if (phone && !PHONE_PATTERN.test(phone)) fieldErrors.phone = 'Please enter a valid phone number.';
  if (!message || message.length < 10) fieldErrors.message = 'Please provide at least 10 characters.';
  if (!inquiryType || !INQUIRY_TYPES.includes(inquiryType as InquiryType)) {
    fieldErrors.inquiryType = 'Please select a valid enquiry type.';
  }
  if (!interestedDivision || !INTEREST_OPTIONS.includes(interestedDivision as InterestOption)) {
    fieldErrors.interestedDivision = 'Please select a valid division or brand.';
  }
  if (!context) fieldErrors.form = 'Please refresh the page and try again.';
  if (!startedAt || Date.now() - startedAt < MIN_COMPLETION_MS) {
    fieldErrors.form = 'Please take a moment to review your enquiry and submit again.';
  }

  if (Object.keys(fieldErrors).length > 0) return { ok: false, fieldErrors };

  return {
    ok: true,
    payload: {
      name: name!,
      company: company ?? '',
      email: email!,
      phone: phone ?? '',
      countryLocation: countryLocation ?? '',
      inquiryType: inquiryType as InquiryType,
      interestedDivision: interestedDivision as InterestOption,
      message: message!,
      context: context!,
      website: website ?? '',
      startedAt,
    },
  };
}

function getClientIdentifier(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

function exceedsRateLimit(identifier: string): boolean {
  const now = Date.now();

  if (rateLimitStore.size > 1_000) {
    for (const [key, entry] of rateLimitStore) {
      if (entry.resetAt <= now) rateLimitStore.delete(key);
    }
  }

  const current = rateLimitStore.get(identifier);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function hasValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  return origin === request.nextUrl.origin;
}

async function deliverEnquiry(payload: EnquiryPayload): Promise<boolean> {
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL?.trim();
  if (!webhookUrl) return false;

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(webhookUrl);
  } catch {
    return false;
  }

  if (parsedUrl.protocol !== 'https:') return false;

  const token = process.env.ENQUIRY_WEBHOOK_TOKEN?.trim();
  const recipient = process.env.ENQUIRY_RECIPIENT_EMAIL?.trim();
  const response = await fetch(parsedUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      event: 'business_enquiry.created',
      recipient: recipient || undefined,
      receivedAt: new Date().toISOString(),
      enquiry: {
        name: payload.name,
        company: payload.company || undefined,
        email: payload.email,
        phone: payload.phone || undefined,
        countryLocation: payload.countryLocation || undefined,
        inquiryType: payload.inquiryType,
        interestedDivision: payload.interestedDivision,
        message: payload.message,
        context: payload.context,
      },
    }),
    cache: 'no-store',
    redirect: 'error',
    signal: AbortSignal.timeout(8_000),
  });

  return response.ok;
}

export async function POST(request: NextRequest) {
  if (!hasValidOrigin(request)) {
    return NextResponse.json({ error: 'Unable to submit this enquiry.' }, { status: 403 });
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'The enquiry is too large.' }, { status: 413 });
  }

  if (exceedsRateLimit(getClientIdentifier(request))) {
    return NextResponse.json(
      { error: 'Too many enquiries were submitted. Please try again later.' },
      { status: 429 }
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: 'Please review the form and try again.' }, { status: 400 });
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'The enquiry is too large.' }, { status: 413 });
  }

  let input: unknown;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Please review the form and try again.' }, { status: 400 });
  }

  // Return a neutral success for a populated honeypot without processing the submission further.
  if (
    input &&
    typeof input === 'object' &&
    !Array.isArray(input) &&
    typeof (input as Record<string, unknown>).website === 'string' &&
    (input as Record<string, string>).website.trim()
  ) {
    return NextResponse.json({ ok: true });
  }

  const result = validatePayload(input);
  if (!result.ok) {
    return NextResponse.json(
      { error: 'Please correct the highlighted fields.', fieldErrors: result.fieldErrors },
      { status: 400 }
    );
  }

  try {
    const delivered = await deliverEnquiry(result.payload);
    if (!delivered) {
      return NextResponse.json(
        { error: 'We could not send your enquiry right now. Please try again shortly.' },
        { status: 503 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'We could not send your enquiry right now. Please try again shortly.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
