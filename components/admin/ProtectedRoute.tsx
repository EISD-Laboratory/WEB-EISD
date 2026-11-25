'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/admin/auth-context'

// Blocks unauthenticated access against the frontend-local mock session.
// While the session is being read from localStorage a neutral loading state
// renders (no protected content flashes). Redirects preserve the intended
// destination so login can send the visitor back. Temporary pass-through
// guard — replaced by the real session check in Fase 2.
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  // Mount gate: the server prerender and the first client render must both
  // emit the loading UI, otherwise hydration mismatches (server has no
  // localStorage session, so it can never render the shell). Resolved in a
  // microtask like the mock session itself, so the first client render still
  // matches the server exactly; the protected tree appears right after.
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let live = true
    void Promise.resolve().then(() => {
      if (live) setMounted(true)
    })
    return () => {
      live = false
    }
  }, [])

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(`/admin/login?from=${encodeURIComponent(pathname)}`)
    }
  }, [loading, isAuthenticated, pathname, router])

  if (!mounted || loading || !isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    )
  }

  return <>{children}</>
}
