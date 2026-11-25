'use client'

import { Suspense } from 'react'

// Copyright year isolated as a client island: reading the current time
// during prerender is rejected under Cache Components, so the Suspense
// boundary renders a static fallback on the server and the client swaps
// in the live year post-hydration (same visual output).
function LiveYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>
}

export default function FooterYear() {
  return (
    <Suspense fallback={2026}>
      <LiveYear />
    </Suspense>
  )
}
