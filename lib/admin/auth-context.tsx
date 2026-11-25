'use client'

import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { useMockSession } from './mock-auth'
import type { AuthState } from './auth'

export interface AuthContextValue extends AuthState {
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

// Mock session store backs app-wide auth state. No backend, no framework:
// the session is frontend-local `{ id, username }` mirrored to localStorage.
// Replaced wholesale by Better Auth in Fase 2.
export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, loading, signOut } = useMockSession()

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
