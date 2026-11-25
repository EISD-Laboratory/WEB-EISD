import { Suspense } from 'react'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/lib/admin/auth-context'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { AppSidebar } from '@/components/admin/AppSidebar'

// Admin shell: sidebar rendered once here and persists across navigation.
// Sonner is scoped to admin routes only — public keeps react-hot-toast.
// Auth is mock (localStorage) until Fase 2 replaces it with Better Auth.
//
// Admin pages are session-gated and load fixture data client-side, so there
// is nothing meaningful for instant-navigation prefetch validation to check.
// Opt the whole panel subtree out — otherwise dev drops whichever admin
// segment renders first with an `instant-unrendered-segment` error. Public
// routes keep instant navigation untouched.
export const instant = false
export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {/* usePathname inside ProtectedRoute needs a Suspense boundary to prerender. */}
      <Suspense
        fallback={
          <div className="grid min-h-screen place-items-center bg-background">
            <p className="text-sm text-muted-foreground">Loading…</p>
          </div>
        }
      >
        <ProtectedRoute>
          <div className="flex h-dvh overflow-hidden bg-white text-foreground">
            <AppSidebar />
            <div className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
              {children}
            </div>
            <Toaster position="bottom-right" />
          </div>
        </ProtectedRoute>
      </Suspense>
    </AuthProvider>
  )
}
