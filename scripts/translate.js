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
const https = require('https');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['ta', 'hi', 'te', 'kn'];
const LOCALE_NAMES = { ta: 'Tamil', hi: 'Hindi', te: 'Telugu', kn: 'Kannada' };

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

/* ─── Google Translate via free API ───────────────────────────────────── */

function translateBatch(texts, targetLang) {
  return new Promise((resolve, reject) => {
    // Use the free Google Translate endpoint
    const url = new URL('https://translate.googleapis.com/translate_a/single');
    url.searchParams.set('client', 'gtx');
    url.searchParams.set('sl', 'en');
    url.searchParams.set('tl', targetLang);
    url.searchParams.set('dt', 't');

    // For multiple texts, send them joined with a separator
    const separator = '\n⟪XQ9F2D1B7E⟫\n';
    const combined = texts.join(separator);

    const postData = `q=${encodeURIComponent(combined)}`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          let translatedCombined = '';

          if (Array.isArray(parsed)) {
            // Response format varies
            if (typeof parsed[0] === 'string') {
              translatedCombined = parsed[0];
            } else if (Array.isArray(parsed[0])) {
              translatedCombined = parsed[0].map((s) => (Array.isArray(s) ? s[0] : s)).join('');
            }
          } else if (typeof parsed === 'string') {
            translatedCombined = parsed;
          }

          const normalizedResults =
            texts.length === 1 ? [translatedCombined] : translatedCombined.split(separator);

          if (normalizedResults.length !== texts.length) {
            if (texts.length === 1) {
              resolve(normalizedResults);
              return;
            }

            Promise.all(
              texts.map((text) =>
                translateBatch([text], targetLang).then(([translated]) => translated)
              )
            )
              .then(resolve)
              .catch(reject);
            return;
          }

          resolve(normalizedResults);
        } catch (err) {
          reject(new Error(`Failed to parse translation response: ${err.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
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

  // Smaller batches are slower but produce cleaner script output from the free endpoint.
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

  console.log(`  📄 Source: messages/en.json (${totalStrings} strings)`);
  console.log(`  🎯 Targets: ${TARGET_LOCALES.map((l) => LOCALE_NAMES[l]).join(', ')}`);
  console.log('');

  if (isDryRun) {
    console.log('  ⚠️  DRY RUN — no files will be written\n');
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
  console.error('Translation failed:', err);
  process.exit(1);
});
