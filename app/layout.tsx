import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// 1. Site chrome lives in app/(public)/layout.tsx (Fase 0); root stays minimal
// so app/admin (Fase 2) can mount its own shell.
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = 'https://www.eisd.site/'
const title = 'EISD Laboratory - Enterprise Intelligence System Development Laboratory'
const description = 'Laboratory focused on software development, IoT, AI, and digital innovation'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Lab EISD',
    images: [
      {
        url: '/images/og-image-whatsapp.jpg',
        width: 2520,
        height: 1074,
        alt: 'EISD Laboratory Team',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className}>
        {children}

        <SpeedInsights />
      </body>
    </html>
  )
}
