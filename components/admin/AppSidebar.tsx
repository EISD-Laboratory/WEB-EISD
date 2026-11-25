'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Calendar,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Trophy,
} from 'lucide-react'
import { useAuth } from '@/lib/admin/auth-context'

const NAV = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Events', to: '/admin/events', icon: Calendar },
  { label: 'Articles', to: '/admin/articles', icon: Newspaper },
  { label: 'Achievements', to: '/admin/achievements', icon: Trophy },
]

// Admin sidebar in brand purple: full-height flush panel, grouped menu with
// active pill + accent bar, user card with sign-out at the bottom.
export function AppSidebar() {
  const { signOut, user } = useAuth()
  const pathname = usePathname()
  const initial = (user?.username?.trim()?.charAt(0) ?? 'A').toUpperCase()

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col overflow-y-auto bg-[#25254d] p-4 text-white">
      <div className="flex items-center gap-2 px-1">
        <span className="grid size-8 place-items-center rounded-lg bg-[#494CA0]/40 text-[#D3D6FB]">
          <FlaskConical className="size-4" />
        </span>
        <p className="text-[15px] font-semibold tracking-tight">EISD CMS</p>
      </div>

      <div className="mt-6">
        <p className="px-2 text-[11px] font-medium tracking-wide text-white/40 uppercase">Main Menu</p>
        <nav className="mt-2 flex flex-col gap-1">
          {NAV.map((item) => {
            // A section stays active on its nested routes (e.g. /admin/articles/new).
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`)
            return (
              <Link
                key={item.label}
                href={item.to}
                className={`relative flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-[#B0B3DE] hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="size-[18px] shrink-0" />
                {item.label}
                {active && (
                  <span className="absolute top-1/2 right-0 h-6 w-1 -translate-y-1/2 rounded-l-full bg-[#8B90E8]" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.07] p-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#494CA0]/40 text-sm font-bold text-[#D3D6FB]">
          {initial}
        </span>
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-white">
          {user?.username ?? 'Admin'}
        </p>
        <button
          type="button"
          onClick={() => void signOut()}
          title="Log out"
          aria-label="Log out"
          className="grid size-8 shrink-0 place-items-center rounded-lg text-[#B0B3DE] transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-4" />
        </button>
      </div>
    </aside>
  )
}
