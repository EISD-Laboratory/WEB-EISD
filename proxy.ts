import { NextResponse, type NextRequest } from 'next/server'

// Fase 0 stub (Next 16 convention): pass everything through unchanged.
// The /admin session guard lands here in Fase 2.
export default function proxy(_request: NextRequest) {
  return NextResponse.next()
}
