import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FocusArea from '@/components/FocusArea'
import Divisions from '@/components/Divisions'
import ArticlesPreview from '@/components/ArticlesPreview'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import BackToTop from '@/components/BackToTop'
import AnnouncementBar from '@/components/AnnouncementBar'

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full">
        <AnnouncementBar />
        <Navbar />
      </header>
      
      <Hero />
      
      <FadeIn direction="up" delay={0.3}>
        <FocusArea />
      </FadeIn>
      
      <FadeIn direction="up" delay={0.4}>
        <Divisions />
      </FadeIn>

      <FadeIn direction="up" delay={0.3}>
        <ArticlesPreview />
      </FadeIn>
      
      <Footer />
      <BackToTop />
    </main>
  )
}
