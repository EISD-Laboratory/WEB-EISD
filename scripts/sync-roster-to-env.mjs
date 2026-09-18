// Sync the gitignored roster to the Vercel Env bridge (Task A).
//
// Local authoring file: data/selection-result/roster.json (NEVER committed).
// Production runtime reads: SELECTION_ROSTER_B64 (gzip+base64 of roster.json).
//
// Usage:
//   node scripts/sync-roster-to-env.mjs            # print value + Vercel instructions
//   node scripts/sync-roster-to-env.mjs --write     # also upsert into .env.local (dev only)
//
// After printing, run once per data change:
//   vercel env add SELECTION_ROSTER_B64 production < value.txt
// (paste the printed value; then redeploy so the Function picks it up.)
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { gzipSync, gunzipSync } from 'node:zlib'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ROSTER = join(ROOT, 'data', 'selection-result', 'roster.json')
const ENV_LOCAL = join(ROOT, '.env.local')

function fail(msg) {
  console.error(`sync-roster-to-env: ${msg}`)
  process.exit(1)
}

let raw
try {
  raw = readFileSync(ROSTER, 'utf8')
} catch {
  fail(`cannot read ${ROSTER} — copy data/selection-result/roster.example.json to roster.json first`)
}

let roster
try {
  roster = JSON.parse(raw)
} catch {
  fail(`${ROSTER} is not valid JSON`)
}

if (!roster || typeof roster !== 'object') fail('roster must be an object')
if (!Array.isArray(roster.passed) || !Array.isArray(roster.failed)) {
  fail('roster must have { deadline, wa, passed[], failed[] }')
}
for (const p of roster.passed) {
  if (typeof p.nim !== 'string' || typeof p.name !== 'string' || !Array.isArray(p.courses)) {
    fail('every passed entry must be { nim, name, courses[] }')
  }
}
for (const f of roster.failed) {
  if (typeof f.nim !== 'string' || typeof f.name !== 'string') fail('every failed entry must be { nim, name }')
}

// Round-trip sanity: value must decode back to the same record counts.
const b64 = gzipSync(Buffer.from(raw, 'utf8')).toString('base64')
const back = JSON.parse(gunzipSync(Buffer.from(b64, 'base64')).toString('utf8'))
if (back.passed.length !== roster.passed.length || back.failed.length !== roster.failed.length) {
  fail('gzip round-trip mismatch — refusing to emit')
}

console.log(`roster: ${roster.passed.length} passed + ${roster.failed.length} failed`)
console.log(`raw bytes: ${Buffer.byteLength(raw)} | SELECTION_ROSTER_B64 chars: ${b64.length}`)
console.log('')
console.log('--- SELECTION_ROSTER_B64 (paste into `vercel env add`) ---')
console.log(b64)

if (process.argv.includes('--write')) {
  const line = `SELECTION_ROSTER_B64=${b64}`
  let env = existsSync(ENV_LOCAL) ? readFileSync(ENV_LOCAL, 'utf8') : ''
  if (/^SELECTION_ROSTER_B64=/m.test(env)) {
    env = env.replace(/^SELECTION_ROSTER_B64=.*$/m, () => line)
  } else {
    if (env && !env.endsWith('\n')) env += '\n'
    env += line + '\n'
  }
  writeFileSync(ENV_LOCAL, env)
  console.log(`\nwrote ${ENV_LOCAL} (dev only — never commit; .env* is gitignored)`)
} else {
  console.log('\nNext: vercel env add SELECTION_ROSTER_B64 production  # then paste the value above')
  console.log('Dev:  node scripts/sync-roster-to-env.mjs --write     # upsert into .env.local')
}
