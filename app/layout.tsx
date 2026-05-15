import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// 1. Import komponen global di sini
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import BackToTop from '@/components/BackToTop'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = 'https://www.eisd.site/'
const title = 'Lab EISD - Enterprise Intelligence System Development Laboratory'
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
        width: 1200,
        height: 630,
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
    <html lang="en">
      <body className={inter.className}>
        <ScrollProgressBar />

        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full">
          <AnnouncementBar />
          <Navbar />
        </header>

        {children}

        <Footer />
        <BackToTop />
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
