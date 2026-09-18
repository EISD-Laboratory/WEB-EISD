// Build-time generator for the static-encrypted selection dataset.
//
// Source of truth: data/selection-result/index.ts (plaintext, NEVER imported
// by client code after this change). Output: public/selection-data.json which
// contains ONLY { sha256(nim) -> { salt, iv, data } } with AES-GCM ciphertext.
//
// Key derivation (MUST match lib/selectionCrypto.ts exactly). NIM-only:
//   nimNorm  = nim.trim(), digits only
//   password = nimNorm (UTF-8)
//   key = PBKDF2-SHA256(password, salt[16B], 100_000 iterations, 256-bit)
//   plaintext = JSON.stringify({ v:1, nim, name, passed, courses?, wa? })
//   ciphertext = AES-GCM(key, iv[12B], plaintext)
//
// NOTE: NIM-only means anyone can brute-force the sequential NIM space
// offline (one blob download + PBKDF2 per guess). This stops bulk
// `curl | grep` dumps, not determined scraping. Bump ITERATIONS to raise
// the per-guess cost (at the price of slower legitimate lookups).
//
// Lookup id: id = SHA256-hex(nimNorm UTF-8).
//
// Run: npm run build:selection-data  (runs automatically via `prebuild`)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createHash, pbkdf2Sync, randomBytes, createCipheriv } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = join(ROOT, 'data', 'selection-result', 'index.ts')
const OUT = join(ROOT, 'public', 'selection-data.json')

const ITERATIONS = 100_000

function normalizeNim(nim) {
  return nim.trim().replace(/\D/g, '')
}

function sha256Hex(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex')
}

function parseSource(text) {
  const waMatch = text.match(/ALL_PASSED_WHATSAPP_LINK\s*=\s*['"]([^'"]+)['"]/)
  const wa = waMatch ? waMatch[1] : ''

  // Tolerant record matcher: handles name in '...' or "..." (one record uses
  // double quotes because the name itself contains apostrophes). The name
  // alternative must not cross its own quote char, otherwise one match can
  // swallow the whole array.
  const recordRe =
    /\{\s*nim:\s*['"]([^'"]+)['"]\s*,\s*name:\s*(?:'([^']*)'|"([^"]*)")\s*(?:,\s*courses:\s*\[([^\]]*)\]\s*,?)?\s*\}/gs

  // Split source so PASSED block records get `passed: true`.
  const parts = text.split('NOT_PASSED_PARTICIPANTS')
  const passedText = parts[0] ?? ''
  const failedText = parts.slice(1).join('NOT_PASSED_PARTICIPANTS')

  const passed = []
  const passedStart = passedText.indexOf('PASSED_PARTICIPANTS')
  for (const m of passedText.matchAll(recordRe)) {
    if (m.index < passedStart) continue
    const courses = [...(m[4] ?? '').matchAll(/['"]([^'"]+)['"]/g)].map((c) => c[1])
    if (courses.length === 0) continue // not a real passed entry
    passed.push({ nim: m[1], name: m[2] ?? m[3], courses })
  }

  const failed = []
  for (const m of failedText.matchAll(recordRe)) {
    if (m[4] !== undefined) continue // has courses -> not a failed entry
    failed.push({ nim: m[1], name: m[2] ?? m[3] })
  }

  return { wa, passed, failed }
}

function encryptRecord({ nim, name, passed, courses, wa }) {
  const nimNorm = normalizeNim(nim)
  if (!nimNorm || !name.trim()) throw new Error(`Bad record: ${nim} / ${name}`)
  const password = nimNorm
  const salt = randomBytes(16)
  const iv = randomBytes(12)
  const key = pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256')
  const plaintext = JSON.stringify(
    passed ? { v: 1, nim, name, passed: true, courses, wa } : { v: 1, nim, name, passed: false },
  )
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final(), cipher.getAuthTag()])
  return {
    id: sha256Hex(nimNorm),
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    data: enc.toString('base64'),
  }
}

const source = readFileSync(SOURCE, 'utf8')
const { wa, passed, failed } = parseSource(source)
if (passed.length === 0 || failed.length === 0) {
  throw new Error(`Parse failed: ${passed.length} passed, ${failed.length} failed from ${SOURCE}`)
}

const records = {}
for (const p of passed) {
  const r = encryptRecord({ nim: p.nim, name: p.name, passed: true, courses: p.courses, wa })
  records[r.id] = { salt: r.salt, iv: r.iv, data: r.data }
}
for (const f of failed) {
  const r = encryptRecord({ nim: f.nim, name: f.name, passed: false })
  records[r.id] = { salt: r.salt, iv: r.iv, data: r.data }
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify({ version: 1, iterations: ITERATIONS, records }) + '\n')
console.log(`Wrote ${OUT}: ${passed.length} passed + ${failed.length} failed = ${Object.keys(records).length} records`)
