'use client'

import { useEffect } from 'react'
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

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(`/admin/login?from=${encodeURIComponent(pathname)}`)
    }
  }, [loading, isAuthenticated, pathname, router])

  if (loading || !isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    )
  }

  return <>{children}</>
}
