'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { BrainCircuit, Gauge, Lightbulb, Target, Zap, type LucideIcon } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import FadeIn from '@/components/FadeIn'
import { SpeedInsights } from "@vercel/speed-insights/next"

type CoreValue = {
  icon: LucideIcon
  title: string
  description: string
}

const values: CoreValue[] = [
  {
    icon: Zap,
    title: 'Fast',
    description: 'Moving fast in developing technology solutions and responding to industry challenges.',
  },
  {
    icon: BrainCircuit,
    title: 'Smart',
    description: 'Prioritizing a smart, data-driven approach in every project we build.',
  },
  {
    icon: Gauge,
    title: 'Efficient',
    description: 'Optimizing processes and resources to produce the best output.',
  },
]

const milestones = [
  { year: '2021', title: 'V1' },
  { year: '2022', title: 'V2' },
  { year: '2023', title: 'V3' },
  { year: '2024', title: 'V4' },
  { year: '2025', title: 'V5' },
  { year: '2026', title: 'V6' },
]

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-0">
        {/* Full-width photo background */}
        <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
          <Image src="/images/photo-landing.webp" alt="EISD Laboratory Team" fill className="object-cover object-[center_25%] scale-110 translate-x-8" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAFBFF] via-[#FAFBFF]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFBFF] via-transparent to-transparent" />

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-start px-4 pt-8 z-10">
            <FadeIn direction="up" delay={0.2}>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 glass-card px-5 py-2 rounded-full shadow-soft mb-5 shimmer-enhanced">
                  <div className="w-1.5 h-1.5 bg-accent-green rounded-full" />
                  <span className="text-xs font-semibold text-primary tracking-wide uppercase">About Us</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                  <span className="text-gray-600">Welcome To</span><br />
                  <span className="text-gray-900">Our </span>
                  <span className="text-primary">Research Laboratory</span>
                </h1>
                <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
                  Where Enterprise, Intelligence, and System Development meets
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About description */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn direction="up" delay={0.2}>
            <div className="relative w-16 h-16 mx-auto mb-6">
              <Image src="/images/logo.png" alt="EISD Logo" fill className="object-contain" />
            </div>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Our laboratory focuses on developing four main fields: <span className="font-medium text-gray-800">technopreneurship</span> to create digital businesses, <span className="font-medium text-gray-800">software engineering</span> for reliable system architecture, <span className="font-medium text-gray-800">UI/UX design</span> for intuitive user experiences, and <span className="font-medium text-gray-800">AI/IoT</span> for smart, connected system integration.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading eyebrow="Our Purpose" title="Vision & Mission" subtitle="The direction and goals we pursue together." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FadeIn direction="left" delay={0.2}>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60 h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-t-3xl" />
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 text-primary flex items-center justify-center mb-5">
                  <Lightbulb className="w-7 h-7" strokeWidth={1.8} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become a research laboratory that shapes innovative students who can create products and hold strong capabilities, especially in software development.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.3}>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60 h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-green to-emerald-500 rounded-t-3xl" />
                <div className="w-14 h-14 rounded-2xl bg-accent-green/10 border border-accent-green/20 text-accent-green flex items-center justify-center mb-5">
                  <Target className="w-7 h-7" strokeWidth={1.8} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
                <ul className="text-gray-600 leading-relaxed space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green mt-2 flex-shrink-0" />
                    Supporting all members&apos; participation in at least two competitions over the coming year.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green mt-2 flex-shrink-0" />
                    Building products that can be used by the university community and society at large.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green mt-2 flex-shrink-0" />
                    Developing human resources who can compete and are ready to face industry change.
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading eyebrow="Values" title="Core Values" subtitle="Fast, Smart, Efficient - the principles we hold onto." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {values.map((value, index) => {
              const Icon = value.icon

              return (
                <FadeIn key={value.title} direction="up" delay={0.1 * (index + 1)}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60 text-center hover:shadow-2xl transition-shadow duration-300 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 text-primary flex items-center justify-center mx-auto mb-5">
                      <Icon className="w-8 h-8" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Journey" title="Our Milestones" subtitle="EISD Laboratory's journey from the beginning until now." />

          <div className="relative mt-12">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 hidden md:block" />

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-0">
              {milestones.map((milestone, index) => {
                const isLatest = index === milestones.length - 1
                return (
                  <FadeIn key={milestone.year} direction="up" delay={0.08 * (index + 1)}>
                    <div className="flex flex-col items-center text-center group">
                      <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl ${
                        isLatest
                          ? 'bg-gradient-to-br from-primary to-accent-green text-white'
                          : 'bg-white border border-gray-200 text-gray-900 group-hover:border-primary/30'
                      }`}>
                        {isLatest && (
                          <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent-green rounded-2xl opacity-25 blur-md" />
                        )}
                        <span className="relative text-xl md:text-2xl font-black">{milestone.title}</span>
                      </div>
                      <p className={`mt-3 text-xs md:text-sm font-semibold ${
                        isLatest ? 'text-primary' : 'text-gray-400'
                      }`}>{milestone.year}</p>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
