'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import { useState } from 'react'

interface Member {
  name: string
  code: string
}

interface Achievement {
  id: number
  members: Member[]
  competitionName: string
  category: string
  level: 'Nasional' | 'Internasional'
  result: string
  image: string
}

const levels = ['All', 'Nasional', 'Internasional'] as const

const levelBadge: Record<Achievement['level'], string> = {
  Nasional: 'bg-primary/90',
  Internasional: 'bg-accent-green/90',
}

// Placeholder entries — swap in real achievement photos + copy when ready.
const achievements: Achievement[] = [
  {
    id: 1,
    members: [{ name: 'Clarissa Tompunu', code: 'CARL' }],
    competitionName: 'Youth Development for Climate Tech 2026 by Sustainable Living Lab',
    category: 'AI and IoT Climate Tech Solution',
    level: 'Internasional',
    result: 'Juara 3',
    image: '/images/achievements/1.webp',
  },
  {
    id: 2,
    members: [{ name: 'Muhammad Luthfi Tukhfattur Romadhoni', code: 'MLTR' }],
    competitionName: 'Kompetisi Robot Terbang Indonesia',
    category: 'Fixed Wing',
    level: 'Nasional',
    result: 'Finalist',
    image: '/images/achievements/2.webp',
  },
  {
    id: 3,
    members: [
      { name: 'Hilmi Zikri', code: 'ZIKK' },
      { name: 'Fasya Arinal Hudha', code: 'SYRN' }
    ],
    competitionName: 'INVOSTIK 2025',
    category: 'Essay',
    level: 'Nasional',
    result: 'Juara 1',
    image: '/images/achievements/3.webp',
  },
  {
    id: 4,
    members: [
      { name: 'Rizky Saputra Al Amir', code: 'EKAA' },
    ],
    competitionName: 'ZTE Indonesia Business Plan Competition',
    category: 'Business Plan',
    level: 'Nasional',
    result: 'Finalist',
    image: '/images/achievements/4.webp',
  },
  {
    id: 5,
    members: [
      { name: 'Hilmi Zikri', code: 'ZIKK' },
    ],
    competitionName: 'ICT Business Development - ITASE FEST 6.0',
    category: 'Business Development',
    level: 'Nasional',
    result: 'Juara 2',
    image: '/images/achievements/5.webp',
  },
  {
    id: 6,
    members: [
      { name: 'Arya Kamal', code: 'AYRA' },
      { name: 'Farid Ghani', code: 'GNOY' },
      { name: 'CHarles R Barnabas', code: 'BUZZ' },
      { name: 'Bimo Alfarizy', code: 'FRZY' }
    ],
    competitionName: 'Youth Development for Climate Tech 2026 by Sustainable Living Lab',
    category: 'AI and IoT Climate Tech Solution',
    level: 'Internasional',
    result: 'Finalist',
    image: '/images/achievements/6.png', 
  },
  {
    id: 7,
    members: [
      { name: 'Muadzam Haqqani', code: 'MAJA' }
    ],
    competitionName: 'Youth Development for Climate Tech 2026 by Sustainable Living Lab',
    category: 'AI and IoT Climate Tech Solution',
    level: 'Internasional',
    result: 'Finalist',
    image: '/images/achievements/7.png',
  }
]

export default function Achievements() {
  const [activeLevel, setActiveLevel] = useState<typeof levels[number]>('All')

  const filtered = activeLevel === 'All'
    ? achievements
    : achievements.filter((item) => item.level === activeLevel)

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <FadeIn direction="up" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-card px-5 py-2.5 rounded-full shadow-soft mb-6 shimmer-enhanced"
            >
              <div className="w-2 h-2 bg-accent-green rounded-full" />
              <span className="text-sm text-gray-700 font-medium">Achievements</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Wall of </span>
              <span className="text-primary">Achievements</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Deretan prestasi anggota EISD Laboratory di berbagai kompetisi tingkat kampus,
              nasional, hingga internasional.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter */}
      <section className="px-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeLevel === level
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-white/80 text-gray-600 border border-gray-200 hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <FadeIn direction="up" delay={index * 0.05}>
                    <div className="@container card-glow-smooth relative rounded-2xl overflow-hidden shadow-card border border-gray-100">
                      <div className="relative aspect-square">
                        <Image
                          src={item.image}
                          alt={item.members.map((m) => m.name).join(', ')}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                        <span className={`absolute top-1.5 left-1.5 @[220px]:top-2 @[220px]:left-2 text-[7px] @[220px]:text-[9px] font-semibold uppercase tracking-wide text-white ${levelBadge[item.level]} backdrop-blur-sm px-1.5 @[220px]:px-2 py-0.5 rounded-full`}>
                          {item.level}
                        </span>

                        <div className="absolute top-1.5 right-1.5 @[220px]:top-2 @[220px]:right-2 inline-flex items-center gap-0.5 @[220px]:gap-1 bg-gradient-to-r from-accent-green to-primary text-white text-[7px] @[220px]:text-[10px] font-bold px-1.5 @[220px]:px-2 py-0.5 @[220px]:py-1 rounded-full shadow-lg">
                          <Trophy className="w-2 h-2 @[220px]:w-3 @[220px]:h-3" strokeWidth={2} />
                          {item.result}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-2 @[220px]:p-3">
                          <h3 className="text-white font-bold text-[10px] @[220px]:text-sm leading-tight">
                            {item.members.map((m) => m.name).join(', ')}
                          </h3>
                          <p className="text-white/70 text-[7px] @[220px]:text-[10px] font-mono tracking-wider mt-0.5">
                            {item.members.map((m) => m.code).join(' · ')}
                          </p>
                          <p className="text-white/50 text-[6px] @[220px]:text-[9px] font-semibold uppercase tracking-wide mt-1 @[220px]:mt-1.5">{item.category}</p>
                          <p className="text-white/90 text-[8px] @[220px]:text-[11px] font-medium leading-snug">{item.competitionName}</p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">Belum ada prestasi di kategori ini.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
