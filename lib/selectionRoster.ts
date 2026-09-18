// Server-only selection roster (Task B).
//
// This module MUST never be imported by client components — `import 'server-only'`
// throws at build time if that happens. The plaintext roster lives ONLY here:
//   prod: SELECTION_ROSTER_B64 env (gzip+base64, see scripts/sync-roster-to-env.mjs)
//   dev:  data/selection-result/roster.json fallback when the env var is missing
//
// Lookup key normalization MUST match the old client (`lib/selectionCrypto.ts`):
//   nimNorm = nim.trim(), digits only
import 'server-only'

import { existsSync, readFileSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'
import { join } from 'node:path'

export const SELECTION_GENERIC_ERROR =
  'No selection result found for this NIM. Please double-check your NIM and try again.'

export const SELECTION_CLOSED_ERROR =
  'The selection announcement period has ended. Thank you for your participation.'

const DEFAULT_DEADLINE_ISO = '2026-09-21T23:59:59+07:00'

export type SelectionResult =
  | { nim: string; name: string; passed: true; courses: string[]; wa: string }
  | { nim: string; name: string; passed: false }

interface RosterFile {
  deadline?: string
  wa?: string
  passed?: Array<{ nim: unknown; name: unknown; courses?: unknown }>
  failed?: Array<{ nim: unknown; name: unknown }>
}

export function normalizeNim(nim: string): string {
  return nim.trim().replace(/\D/g, '')
}

function parseRoster(raw: string, source: string): { records: Map<string, SelectionResult>; deadline: string } {
  let parsed: RosterFile
  try {
    parsed = JSON.parse(raw) as RosterFile
  } catch {
    throw new Error(`selection roster from ${source} is not valid JSON`)
  }
  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.passed) || !Array.isArray(parsed.failed)) {
    throw new Error(`selection roster from ${source} must have { deadline, wa, passed[], failed[] }`)
  }
  const wa = typeof parsed.wa === 'string' ? parsed.wa : ''
  const records = new Map<string, SelectionResult>()
  for (const p of parsed.passed) {
    const nim = typeof p.nim === 'string' ? p.nim : ''
    const name = typeof p.name === 'string' ? p.name : ''
    const courses = Array.isArray(p.courses) ? p.courses.filter((c): c is string => typeof c === 'string') : []
    const nimNorm = normalizeNim(nim)
    if (!nimNorm || !name.trim() || courses.length === 0) {
      throw new Error(`selection roster from ${source} has a bad passed entry (nim: ${nim || '?'})`)
    }
    records.set(nimNorm, { nim, name, passed: true, courses, wa })
  }
  for (const f of parsed.failed) {
    const nim = typeof f.nim === 'string' ? f.nim : ''
    const name = typeof f.name === 'string' ? f.name : ''
    const nimNorm = normalizeNim(nim)
    if (!nimNorm || !name.trim()) {
      throw new Error(`selection roster from ${source} has a bad failed entry (nim: ${nim || '?'})`)
    }
    records.set(nimNorm, { nim, name, passed: false })
  }
  const deadline =
    process.env.SELECTION_DEADLINE_ISO ??
    (typeof parsed.deadline === 'string' ? parsed.deadline : undefined) ??
    DEFAULT_DEADLINE_ISO
  return { records, deadline }
}

let cached: { records: Map<string, SelectionResult>; deadlineMs: number } | null = null

function load(): { records: Map<string, SelectionResult>; deadlineMs: number } {
  if (cached) return cached
  const b64 = process.env.SELECTION_ROSTER_B64
  let raw: string
  let source: string
  if (b64) {
    try {
      raw = gunzipSync(Buffer.from(b64, 'base64')).toString('utf8')
    } catch {
      throw new Error('SELECTION_ROSTER_B64 is not valid gzip+base64 (see scripts/sync-roster-to-env.mjs)')
    }
    source = 'SELECTION_ROSTER_B64'
  } else {
    // Dev-only fallback: the gitignored authoring file. Never exists on Vercel
    // production deploys (gitignored), so prod MUST set the env var.
    const file = join(process.cwd(), 'data', 'selection-result', 'roster.json')
    if (!existsSync(file)) {
      throw new Error(
        'selection roster unavailable: set SELECTION_ROSTER_B64 or provide data/selection-result/roster.json',
      )
    }
    raw = readFileSync(file, 'utf8')
    source = 'data/selection-result/roster.json'
  }
  const { records, deadline } = parseRoster(raw, source)
  const deadlineMs = Date.parse(deadline)
  if (Number.isNaN(deadlineMs)) throw new Error(`selection deadline is not a valid date: ${deadline}`)
  cached = { records, deadlineMs }
  return cached
}

/** Unix-ms timestamp after which the endpoint returns 410. Env override wins. */
export function getSelectionDeadlineMs(): number {
  return load().deadlineMs
}

/** Single-record lookup by normalized NIM. Returns undefined on miss (caller maps to generic 404). */
export function findSelectionResult(nimNorm: string): SelectionResult | undefined {
  return load().records.get(nimNorm)
}
