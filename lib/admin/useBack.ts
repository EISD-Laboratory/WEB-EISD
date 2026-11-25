import { useRouter } from 'next/navigation'

/**
 * Returns a handler that leaves the current page by returning to the previous
 * entry in history — so a form opened from the dashboard goes back to the
 * dashboard, and one opened from a list goes back to that list.
 *
 * Falls back to `fallback` when there is no in-app history to return to
 * (fresh tab, bookmark, or refresh on the form URL) so users never get sent
 * out of the app.
 *
 * Ported from the CMS `useBack` (`react-router-dom` → `next/navigation`):
 * history length replaces React Router's per-entry `idx` stamp.
 */
export function useBack(fallback: string) {
  const router = useRouter()

  return () => {
    if (typeof window !== 'undefined' && window.history.length > 1) router.back()
    else router.push(fallback)
  }
}
