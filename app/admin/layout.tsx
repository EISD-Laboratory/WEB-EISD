import './admin.css'

// Admin root shell: applies the admin theme scope (`.admin` tokens from
// admin.css) to every admin route, including /admin/login which lives
// outside (panel). Panel-specific chrome (sidebar, guard, toasts) stays in
// (panel)/layout.tsx. Public routes never import this file, so admin
// styles cannot leak into the public bundle.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="admin">{children}</div>
}
