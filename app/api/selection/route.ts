import { NextRequest, NextResponse } from 'next/server'

import {
  SELECTION_CLOSED_ERROR,
  SELECTION_GENERIC_ERROR,
  findSelectionResult,
  getSelectionDeadlineMs,
  normalizeNim,
} from '@/lib/selectionRoster'

export const runtime = 'nodejs'

// In-memory per-instance throttle: 5 lookups / 60s / IP. Resets on cold start
// (documented Hobby tradeoff — enough for an announcement window).
const WINDOW_MS = 60_000
const LIMIT = 5
const hits = new Map<string, { count: number; reset: number }>()

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}

function noStore(res: NextResponse): NextResponse {
  res.headers.set('Cache-Control', 'no-store')
  return res
}

function tooMany(resetInMs: number): NextResponse {
  const res = NextResponse.json(
    { error: 'Too many requests. Please wait a moment and try again.' },
    { status: 429 },
  )
  res.headers.set('Retry-After', String(Math.max(1, Math.ceil(resetInMs / 1000))))
  return noStore(res)
}

export async function POST(req: NextRequest) {
  // Throttle first so even malformed floods burn quota.
  const ip = clientIp(req)
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS })
  } else {
    entry.count += 1
    if (entry.count > LIMIT) return tooMany(entry.reset - now)
  }
  if (hits.size > 2000) {
    for (const [key, value] of hits) {
      if (now > value.reset) hits.delete(key)
    }
  }

  let nim: unknown
  try {
    nim = (await req.json() as { nim?: unknown }).nim
  } catch {
    return noStore(NextResponse.json({ error: SELECTION_GENERIC_ERROR }, { status: 400 }))
  }
  const nimNorm = typeof nim === 'string' ? normalizeNim(nim) : ''
  if (!nimNorm) {
    return noStore(NextResponse.json({ error: SELECTION_GENERIC_ERROR }, { status: 400 }))
  }

  if (Date.now() > getSelectionDeadlineMs()) {
    return noStore(NextResponse.json({ error: SELECTION_CLOSED_ERROR }, { status: 410 }))
  }

  const result = findSelectionResult(nimNorm)
  if (!result) {
    return noStore(NextResponse.json({ error: SELECTION_GENERIC_ERROR }, { status: 404 }))
  }
  return noStore(NextResponse.json(result))
}
