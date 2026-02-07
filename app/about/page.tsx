'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import BackToTop from '@/components/BackToTop'
import SectionHeading from '@/components/SectionHeading'
import FadeIn from '@/components/FadeIn'

const values = [
  {
    icon: '🚀',
    title: 'Fast',
    description: 'Bergerak cepat dalam mengembangkan solusi teknologi dan merespons tantangan industri.',
    gradient: 'from-purple-500 to-blue-500',
  },
  {
    icon: '🧠',
    title: 'Smart',
    description: 'Mengutamakan pendekatan cerdas dan berbasis data dalam setiap pengembangan proyek.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: '⚡',
    title: 'Efficient',
    description: 'Mengoptimalkan proses dan sumber daya untuk menghasilkan output terbaik.',
    gradient: 'from-amber-500 to-orange-500',
  },
]

const milestones = [
  { year: '2021', title: 'V1', description: 'EISD Laboratory didirikan di Telkom University dengan fokus pada pengembangan Teknologi.' },
  { year: '2022', title: 'V2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor.'},
  { year: '2023', title: 'V3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor.'},
  { year: '2024', title: 'V4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor.'},
  { year: '2025', title: 'V5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor.'},
  { year: '2026', title: 'V6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labor.'},
]

export default function About() {
  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative glow-blue-top-right overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn direction="up" delay={0.2}>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 glass-card px-5 py-2.5 rounded-full shadow-soft mb-6 shimmer-enhanced"
              >
                <div className="w-2 h-2 bg-primary rounded-full pulse-subtle" />
                <span className="text-sm text-gray-700 font-medium">About Us</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Tentang EISD</span>{' '}
                <span className="text-gray-900">Laboratory</span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Enterprise Intelligence System Development Laboratory adalah laboratorium riset dan pengembangan 
                di Telkom University yang berfokus pada pengembangan sistem cerdas, software development, 
                UI/UX design, dan technopreneurship.
              </p>
            </div>
          </FadeIn>

          {/* About Image / Logo */}
          <FadeIn direction="up" delay={0.4}>
            <div className="relative max-w-4xl mx-auto">
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/60">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-3xl blur-xl -z-10" />
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 relative flex-shrink-0">
                    <Image src="/images/logo.png" alt="EISD Logo" fill className="object-contain" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Enterprise Intelligence System Development</h2>
                    <p className="text-gray-600 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 relative glow-blue-left overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading eyebrow="Our Purpose" title="Visi & Misi" subtitle="Arah dan tujuan yang kami kejar bersama." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FadeIn direction="left" delay={0.2}>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60 h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-t-3xl" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-5 shadow-lg">
                  <span className="text-2xl">🔭</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visi</h3>
                <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.3}>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60 h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-green to-emerald-500 rounded-t-3xl" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-green to-emerald-500 flex items-center justify-center mb-5 shadow-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi</h3>
                <ul className="text-gray-600 leading-relaxed space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green mt-2 flex-shrink-0" />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green mt-2 flex-shrink-0" />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green mt-2 flex-shrink-0" />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green mt-2 flex-shrink-0" />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 relative glow-pink-left overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading eyebrow="Values" title="Core Values" subtitle="Fast, Smart, Efficient — prinsip yang kami pegang." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {values.map((value, index) => (
              <FadeIn key={value.title} direction="up" delay={0.1 * (index + 1)}>
                <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60 text-center hover:shadow-2xl transition-all duration-300 h-full">
                  <div className={`absolute -inset-0.5 bg-gradient-to-br ${value.gradient} rounded-3xl opacity-0 group-hover:opacity-10 blur transition-opacity duration-500 -z-10`} />
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                    <span className="text-3xl">{value.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-16 px-4 relative glow-blue-right overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeading eyebrow="Journey" title="Our Milestones" subtitle="Perjalanan EISD Laboratory dari awal hingga sekarang." />

          <div className="relative mt-8">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/60 to-primary/30 -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <FadeIn key={milestone.year} direction={index % 2 === 0 ? 'left' : 'right'} delay={0.1 * (index + 1)}>
                  <div className={`flex flex-col md:flex-row items-center gap-6 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{milestone.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent-green flex items-center justify-center shadow-lg z-10">
                      <span className="text-white font-bold text-xs">{milestone.year}</span>
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  )
}
