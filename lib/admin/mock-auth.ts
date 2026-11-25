import { useCallback, useEffect, useState } from 'react'
import type { User } from '@/lib/admin/auth'

const STORAGE_KEY = 'cms.mockSession'

interface StoredSession {
  id: string
  username: string
}

// Mock session lives only in the browser. Any non-empty credentials sign in;
// no password is ever persisted and no backend is ever called.
function readStoredSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredSession
    if (typeof parsed?.id !== 'string' || typeof parsed?.username !== 'string') {
      return null
    }
    if (parsed.username.trim() === '') return null
    return parsed
  } catch {
    return null
  }
}

function writeStoredSession(session: StoredSession | null) {
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // Storage unavailable (private mode, etc.) — session just won't persist.
  }
}

export function getMockSession(): User | null {
  const stored = readStoredSession()
  if (!stored) return null
  return { id: stored.id, username: stored.username }
}

export function signIn(username: string): User {
  const session: StoredSession = {
    id: 'mock-user',
    username: username.trim(),
  }
  writeStoredSession(session)
  return { ...session }
}

export function signOut() {
  writeStoredSession(null)
}

export function useMockSession() {
  // SSR-safe: logged-out on both the server prerender and the first client
  // render (identical HTML, no hydration mismatch), then resolve the real
  // session post-mount. The synchronous setState-in-effect calls below are
  // intentional — a lazy initializer reading localStorage would render
  // different UI on the client than the server prerendered whenever a mock
  // session exists (i.e. hydration failed on every logged-in refresh).
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Deferred past the commit phase so the first client render matches the
    // server prerender exactly (logged-out loading state on both sides).
    // Without the defer, a stored mock session would render protected content
    // on the first client pass while the server emitted the loading UI —
    // a hydration mismatch on every logged-in refresh.
    let live = true
    void Promise.resolve().then(() => {
      if (!live) return
      setUser(getMockSession())
      setLoading(false)
    })
    return () => {
      live = false
    }
  }, [])

  const handleSignIn = useCallback((username: string) => {
    const next = signIn(username)
    setUser(next)
    return next
  }, [])

  const handleSignOut = useCallback(async () => {
    signOut()
    setUser(null)
  }, [])

  return {
    user,
    isAuthenticated: user !== null,
    loading,
    signIn: handleSignIn,
    signOut: handleSignOut,
  }
}
