import type { Metadata } from 'next'

// page.tsx is a client component, so metadata must be exported from this
// separate server layout instead. This result page shows names/NIMs, so keep
// it out of search engines.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function SelectionResultLayout({ children }: { children: React.ReactNode }) {
  return children
}
