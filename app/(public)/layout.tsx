import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import BackToTop from '@/components/BackToTop'
import WelcomePopup from '@/components/WelcomePopup'
import { Toaster } from 'react-hot-toast'

// Public site shell: owns all WEB-EISD chrome. Moved here in Fase 0 so
// app/layout.tsx stays root-only and app/admin (Fase 2) gets its own shell.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollProgressBar />

      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full">
        <AnnouncementBar />
        <Navbar />
      </header>

      {children}

      <Footer />
      <BackToTop />
      <Toaster position="top-center" />
      <WelcomePopup />
    </>
  )
}
