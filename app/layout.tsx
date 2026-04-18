import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// 1. Import komponen global di sini
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import BackToTop from '@/components/BackToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lab EISD - Enterprise Intelligence System Development Laboratory',
  description: 'Laboratory focused on software development, IoT, AI, and digital innovation',
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
      </body>
    </html>
  )
}