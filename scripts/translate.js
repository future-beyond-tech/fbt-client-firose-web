#!/usr/bin/env node

/**
 * FIROSE Auto-Translation Script
 * ================================
 * Translates messages/en.json → ta.json, hi.json, te.json, kn.json
 *
 * Usage:
 *   npm run translate
 *
 * Options:
 *   --dry-run    Show what would be translated without writing files
 *
 * Setup:
 *   1. Enable Google Cloud Translation API on your GCP project
 *   2. Set GOOGLE_APPLICATION_CREDENTIALS env var, OR
 *   3. Set GOOGLE_TRANSLATE_API_KEY env var for API key auth
 *
 * Cost: ~₹0.01 per full site translation run (< 10,000 chars)
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const crypto = require('crypto');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['ta', 'hi', 'te', 'kn'];
const LOCALE_NAMES = { ta: 'Tamil', hi: 'Hindi', te: 'Telugu', kn: 'Kannada' };
const GOOGLE_TRANSLATE_API_BASE_URL =
  process.env.GOOGLE_TRANSLATE_API_BASE_URL || 'https://translation.googleapis.com';
const GOOGLE_OAUTH_TOKEN_URL =
  process.env.GOOGLE_OAUTH_TOKEN_URL || 'https://oauth2.googleapis.com/token';
const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const GOOGLE_TRANSLATE_SCOPE = 'https://www.googleapis.com/auth/cloud-translation';
const REQUEST_TIMEOUT_MS = 30000;

// Brand names and terms that should NEVER be translated
const PRESERVE_TERMS = [
  'FIROSE',
  'Firose Enterprises',
  'Firose',
  'Femison',
  'AR Perfumes',
  'AR Perfume',
  'Neat & Fresh',
  'Future Beyond Technology',
  'FBT',
  'FMCG',
  'MSME',
  'FSSAI',
  'TN08A0024215',
  'IndiaMART',
  'WhatsApp',
  'Instagram',
  'Chennai',
  'India',
  'Arwat',
];

// Patterns that should not be translated
const SKIP_PATTERNS = [
  /^https?:\/\//,         // URLs
  /^[+]?\d[\d\s-]+$/,     // Phone numbers
  /^[\w.-]+@[\w.-]+$/,    // Emails
  /^\d+$/,                 // Pure numbers
  /^[₹$€]\s*\d/,          // Currency values
  /^#\w+$/,                // Hash tags / anchors
];

// ICU/placeholders that must remain intact for next-intl interpolation
const PRESERVE_PATTERNS = [
  /\{[^}]+\}/g,
];

const isDryRun = process.argv.includes('--dry-run');
let cachedAccessToken = null;

/* ─── Auth / Request Helpers ──────────────────────────────────────────── */

function getTransport(url) {
  return url.protocol === 'http:' ? http : https;
}

function previewBody(body) {
  return body.replace(/\s+/g, ' ').trim().slice(0, 200);
}

function base64UrlEncode(value) {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function loadServiceAccountCredentials() {
  if (!GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error(
      'Missing Google Translate credentials. Set GOOGLE_TRANSLATE_API_KEY or GOOGLE_APPLICATION_CREDENTIALS.'
    );
  }

  const credentialsPath = path.resolve(GOOGLE_APPLICATION_CREDENTIALS);

  if (!fs.existsSync(credentialsPath)) {
    throw new Error(
      `GOOGLE_APPLICATION_CREDENTIALS points to a missing file: ${credentialsPath}`
    );
  }

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

  if (credentials.type !== 'service_account') {
    throw new Error(
      'GOOGLE_APPLICATION_CREDENTIALS must point to a Google service account JSON key.'
    );
  }

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error(
      'The Google service account JSON key is missing client_email or private_key.'
    );
  }

  return credentials;
}

function getAuthSummary() {
  if (GOOGLE_TRANSLATE_API_KEY) return 'Google Cloud API key';
  if (GOOGLE_APPLICATION_CREDENTIALS) return 'Google service account';
  return 'Not configured';
}

function createServiceAccountJwt(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: credentials.client_email,
    scope: GOOGLE_TRANSLATE_SCOPE,
    aud: GOOGLE_OAUTH_TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();

  const signature = signer.sign(credentials.private_key);
  return `${unsignedToken}.${base64UrlEncode(signature)}`;
}

function formatHttpError(url, responseLabel, statusCode, headers, body) {
  const location = headers.location;
  const contentType = headers['content-type'] || 'unknown content type';
  const preview = body ? ` Body preview: ${previewBody(body)}` : '';

  if (statusCode >= 300 && statusCode < 400 && location) {
    return (
      `${responseLabel} request was redirected (HTTP ${statusCode}) to ${location}. ` +
      'This usually means the endpoint rejected automated access or the request URL is incorrect.'
    );
  }

  if (statusCode === 401 || statusCode === 403) {
    return (
      `${responseLabel} request failed with HTTP ${statusCode}. ` +
      'Check GOOGLE_TRANSLATE_API_KEY or GOOGLE_APPLICATION_CREDENTIALS and ensure the Cloud Translation API is enabled.' +
      preview
    );
  }

  return `${responseLabel} request to ${url.origin}${url.pathname} failed with HTTP ${statusCode} (${contentType}).${preview}`;
}

function requestJson(url, { method = 'GET', headers = {}, body, responseLabel }) {
  return new Promise((resolve, reject) => {
    const transport = getTransport(url);
    const req = transport.request(
      url,
      {
        method,
        headers,
        timeout: REQUEST_TIMEOUT_MS,
      },
      (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const statusCode = res.statusCode || 0;
          const contentType = res.headers['content-type'] || '';
          const looksLikeJson =
            contentType.includes('application/json') ||
            contentType.includes('application/problem+json') ||
            data.trim().startsWith('{') ||
            data.trim().startsWith('[');

          if (statusCode < 200 || statusCode >= 300) {
            reject(new Error(formatHttpError(url, responseLabel, statusCode, res.headers, data)));
            return;
          }

          if (!looksLikeJson) {
            reject(
              new Error(
                `${responseLabel} returned ${contentType || 'non-JSON content'} instead of JSON. ` +
                  `Body preview: ${previewBody(data)}`
              )
            );
            return;
          }

          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(
              new Error(
                `Failed to parse ${responseLabel} response as JSON: ${err.message}. ` +
                  `Body preview: ${previewBody(data)}`
              )
            );
          }
        });
      }
    );

    req.on('timeout', () => {
      req.destroy(new Error(`${responseLabel} request timed out after ${REQUEST_TIMEOUT_MS}ms`));
    });
    req.on('error', reject);

    if (body) {
      req.write(body);
    }

    req.end();
  });
}

async function getAccessToken() {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now()) {
    return cachedAccessToken.token;
  }

  const credentials = loadServiceAccountCredentials();
  const assertion = createServiceAccountJwt(credentials);
  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  }).toString();

  const tokenResponse = await requestJson(new URL(GOOGLE_OAUTH_TOKEN_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
    },
    body,
    responseLabel: 'Google OAuth token',
  });

  if (!tokenResponse.access_token) {
    throw new Error('Google OAuth token response did not include access_token.');
  }

  const expiresInSeconds =
    typeof tokenResponse.expires_in === 'number' ? tokenResponse.expires_in : 3600;

  cachedAccessToken = {
    token: tokenResponse.access_token,
    expiresAt: Date.now() + Math.max(expiresInSeconds - 60, 60) * 1000,
  };

  return cachedAccessToken.token;
}

async function getGoogleAuthHeaders() {
  if (GOOGLE_TRANSLATE_API_KEY) {
    return {};
  }

  if (GOOGLE_APPLICATION_CREDENTIALS) {
    return {
      Authorization: `Bearer ${await getAccessToken()}`,
    };
  }

  throw new Error(
    'Missing Google Translate credentials. Set GOOGLE_TRANSLATE_API_KEY or GOOGLE_APPLICATION_CREDENTIALS.'
  );
}

function getTranslateApiUrl() {
  const url = new URL('/language/translate/v2', GOOGLE_TRANSLATE_API_BASE_URL);

  if (GOOGLE_TRANSLATE_API_KEY) {
    url.searchParams.set('key', GOOGLE_TRANSLATE_API_KEY);
  }

  return url;
}

function decodeHtmlEntities(text) {
  const namedEntities = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
  };

  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const isHex = entity[1]?.toLowerCase() === 'x';
      const rawCode = isHex ? entity.slice(2) : entity.slice(1);
      const codePoint = Number.parseInt(rawCode, isHex ? 16 : 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }

    return namedEntities[entity.toLowerCase()] || match;
  });
}

/* ─── Flatten / Unflatten JSON ────────────────────────────────────────── */

function flatten(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flatten(value, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

function unflatten(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

/* ─── Check if string should be skipped ───────────────────────────────── */

function shouldSkip(text) {
  if (typeof text !== 'string') return true;
  if (text.trim().length === 0) return true;
  if (SKIP_PATTERNS.some((pattern) => pattern.test(text.trim()))) return true;
  return false;
}

/* ─── Protect brand names with placeholders ───────────────────────────── */

function protectBrandNames(text) {
  let protected_ = text;
  const replacements = [];

  for (const pattern of PRESERVE_PATTERNS) {
    protected_ = protected_.replace(pattern, (match) => {
      const placeholder = `⟪XQ${replacements.length}QX⟫`;
      replacements.push({ placeholder, term: match });
      return placeholder;
    });
  }

  // Sort by length descending to replace longer terms first
  const sortedTerms = [...PRESERVE_TERMS].sort((a, b) => b.length - a.length);

  for (const term of sortedTerms) {
    const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    let match;
    while ((match = regex.exec(protected_)) !== null) {
      const placeholder = `⟪XQ${replacements.length}QX⟫`;
      replacements.push({ placeholder, term });
      protected_ = protected_.slice(0, match.index) + placeholder + protected_.slice(match.index + term.length);
      regex.lastIndex = match.index + placeholder.length;
    }
  }

  return { text: protected_, replacements };
}

function restoreBrandNames(text, replacements) {
  let restored = text;
  // Restore in reverse order to handle nested replacements
  for (let i = replacements.length - 1; i >= 0; i--) {
    const { placeholder, term } = replacements[i];
    restored = restored.split(placeholder).join(term);
  }
  return restored;
}

/* ─── Google Cloud Translation Basic v2 ───────────────────────────────── */

async function translateBatch(texts, targetLang) {
  const headers = await getGoogleAuthHeaders();
  const body = JSON.stringify({
    q: texts,
    source: SOURCE_LOCALE,
    target: targetLang,
    format: 'text',
  });

  const response = await requestJson(getTranslateApiUrl(), {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
    body,
    responseLabel: 'Google Translate',
  });

  const translations = response?.data?.translations;

  if (!Array.isArray(translations)) {
    throw new Error('Google Translate response did not include data.translations.');
  }

  if (translations.length !== texts.length) {
    throw new Error(
      `Google Translate returned ${translations.length} results for ${texts.length} input strings.`
    );
  }

  return translations.map((entry) => decodeHtmlEntities(entry?.translatedText || ''));
}

/* ─── Main Translation Flow ───────────────────────────────────────────── */

async function translateLocale(flatEn, targetLocale) {
  const keys = Object.keys(flatEn);
  const result = {};

  // Separate translatable from non-translatable
  const toTranslate = [];
  const toTranslateKeys = [];

  for (const key of keys) {
    const value = flatEn[key];
    if (shouldSkip(value)) {
      result[key] = value;
    } else {
      toTranslate.push(value);
      toTranslateKeys.push(key);
    }
  }

  if (toTranslate.length === 0) {
    return result;
  }

  // Protect brand names
  const protected_ = toTranslate.map(protectBrandNames);
  const textsToSend = protected_.map((p) => p.text);

  // Smaller batches reduce the chance of oversized requests and make failures easier to isolate.
  const BATCH_SIZE = 10;
  const translatedTexts = [];

  for (let i = 0; i < textsToSend.length; i += BATCH_SIZE) {
    const batch = textsToSend.slice(i, i + BATCH_SIZE);
    const translated = await translateBatch(batch, targetLocale);
    translatedTexts.push(...translated);

    // Small delay between batches to be respectful
    if (i + BATCH_SIZE < textsToSend.length) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  // Restore brand names and assign to result
  for (let i = 0; i < toTranslateKeys.length; i++) {
    const restored = restoreBrandNames(translatedTexts[i] || toTranslate[i], protected_[i].replacements);
    result[toTranslateKeys[i]] = restored;
  }

  return result;
}

async function main() {
  console.log('');
  console.log('  🌐 FIROSE Multi-Language Translation');
  console.log('  ════════════════════════════════════');
  console.log('');

  // Read source
  const enPath = path.join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`);
  if (!fs.existsSync(enPath)) {
    console.error(`  ❌ Source file not found: ${enPath}`);
    process.exit(1);
  }

  const enJson = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  const flatEn = flatten(enJson);
  const totalStrings = Object.keys(flatEn).length;

  console.log(`  🔐 Auth: ${getAuthSummary()}`);
  console.log(`  📄 Source: messages/en.json (${totalStrings} strings)`);
  console.log(`  🎯 Targets: ${TARGET_LOCALES.map((l) => LOCALE_NAMES[l]).join(', ')}`);
  console.log('');

  if (isDryRun) {
    console.log('  ⚠️  DRY RUN — no files will be written\n');
  }

  if (!GOOGLE_TRANSLATE_API_KEY && !GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error(
      'Missing Google Translate credentials. Set GOOGLE_TRANSLATE_API_KEY or GOOGLE_APPLICATION_CREDENTIALS.'
    );
  }

  if (GOOGLE_APPLICATION_CREDENTIALS) {
    loadServiceAccountCredentials();
  }

  for (const locale of TARGET_LOCALES) {
    const label = LOCALE_NAMES[locale];
    process.stdout.write(`  ⏳ Translating to ${label} (${locale})...`);

    try {
      const flatTranslated = await translateLocale(flatEn, locale);
      const translated = unflatten(flatTranslated);
      const translatedCount = Object.keys(flatTranslated).length;

      if (!isDryRun) {
        const outPath = path.join(MESSAGES_DIR, `${locale}.json`);
        fs.writeFileSync(outPath, JSON.stringify(translated, null, 2) + '\n', 'utf-8');
      }

      console.log(` ✅ ${label}: ${translatedCount} strings translated`);
    } catch (err) {
      console.log(` ❌ ${label}: Failed — ${err.message}`);
    }
  }

  console.log('');
  console.log('  ✨ Translation complete!');
  console.log('');
}

main().catch((err) => {
  console.error(`Translation failed: ${err.message}`);
  process.exit(1);
});
