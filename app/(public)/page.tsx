import Hero from '@/components/Hero'
import FocusArea from '@/components/FocusArea'
import Divisions from '@/components/Divisions'
import ArticlesPreview from '@/components/ArticlesPreview'
import FadeIn from '@/components/FadeIn'

export default function Home() {
  return (
    <main className="min-h-screen">
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
    </main>
  )
}
