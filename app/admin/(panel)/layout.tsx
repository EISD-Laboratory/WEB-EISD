import { Toaster } from 'sonner'
import { AuthProvider } from '@/lib/admin/auth-context'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { AppSidebar } from '@/components/admin/AppSidebar'

// Admin shell: sidebar rendered once here and persists across navigation.
// Sonner is scoped to admin routes only — public keeps react-hot-toast.
// Auth is mock (localStorage) until Fase 2 replaces it with Better Auth.
export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="flex min-h-screen bg-white text-foreground">
          <AppSidebar />
          {children}
          <Toaster position="bottom-right" />
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
