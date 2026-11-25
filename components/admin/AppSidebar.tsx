'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Calendar,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import { useAuth } from '@/lib/admin/auth-context'
import { fetchDashboard } from '@/lib/admin/dashboard'

interface NavEntry {
  label: string
  to: string
  icon: LucideIcon
  countKey?: 'events' | 'articles' | 'achievements'
}

const NAV_GROUPS: { label: string; items: NavEntry[] }[] = [
  { label: 'Overview', items: [{ label: 'Dashboard', to: '/admin', icon: LayoutDashboard }] },
  {
    label: 'Manage',
    items: [
      { label: 'Events', to: '/admin/events', icon: Calendar, countKey: 'events' },
      { label: 'Articles', to: '/admin/articles', icon: Newspaper, countKey: 'articles' },
      { label: 'Achievements', to: '/admin/achievements', icon: Trophy, countKey: 'achievements' },
    ],
  },
]

// Admin sidebar: brand-indigo panel, grouped nav with section labels and live
// counts; the active item gets a soft white wash plus a brand-green bar.
export function AppSidebar() {
  const { signOut, user } = useAuth()
  const pathname = usePathname()
  const initial = (user?.username?.trim()?.charAt(0) ?? 'A').toUpperCase()
  const [counts, setCounts] = useState<Record<'events' | 'articles' | 'achievements', number> | null>(null)

  useEffect(() => {
    let live = true
    fetchDashboard()
      .then((d) => {
        if (!live) return
        setCounts({
          events: d.totalEvents,
          articles: d.totalArticles,
          achievements: d.totalAchievements,
        })
      })
      .catch(() => {})
    return () => {
      live = false
    }
  }, [])

  return (
    <aside className="flex h-full w-[272px] shrink-0 flex-col overflow-hidden bg-secondary text-white">
      <div className="flex items-center gap-2 px-4 pt-4">
        <span className="grid size-8 place-items-center rounded-lg bg-white/15 text-white">
          <FlaskConical className="size-4" />
        </span>
        <p className="text-[15px] font-semibold tracking-tight">EISD CMS</p>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-2 pt-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="px-3 pb-1 text-[11px] font-medium tracking-wide text-white/60 uppercase">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                // A section stays active on its nested routes (e.g.
                // /admin/articles/new) — except Dashboard, which would
                // otherwise match every /admin/* page by prefix.
                const active =
                  item.to === '/admin'
                    ? pathname === '/admin'
                    : pathname === item.to || pathname.startsWith(`${item.to}/`)
                const count = item.countKey && counts ? counts[item.countKey] : null
                return (
                  <Link
                    key={item.label}
                    href={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
                      active
                        ? 'bg-white/10 font-semibold text-white'
                        : 'font-medium text-white/75 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {active && (
                      <span className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#00D97A]" />
                    )}
                    <item.icon className="size-[18px] shrink-0" />
                    {item.label}
                    {typeof count === 'number' && (
                      <span className="ml-auto rounded-full bg-[#00D97A] px-2 py-0.5 text-[11px] font-medium text-white tabular-nums">
                        {count}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-2.5 border-t border-white/15 p-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/15 text-sm font-bold text-white">
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
          className="grid size-8 shrink-0 place-items-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-4" />
        </button>
      </div>
    </aside>
  )
}
