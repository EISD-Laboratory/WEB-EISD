'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import { useState } from 'react'
import { BookOpen, CalendarDays, Handshake, Microscope, PenLine, Trophy, type LucideIcon } from 'lucide-react'
import toast from 'react-hot-toast'

interface MemberData {
  name: string
  code: string
  role: 'koordinator' | 'member'
  image: string
  linkedin: string
}

interface Division {
  name: string
  icon: LucideIcon
  gradient: string
  members: MemberData[]
}

const coreDivision = [
  { name: 'Deazard Muhammad Arrayyan', code: 'DEZA', role: 'Vice Head of Lab', image: '/images/members/core/DEZA.webp', linkedin: '#' },
  { name: 'Fadia Rizqa Yunanto', code: 'RYUU', role: 'Head of Lab', image: '/images/members/core/RYUU.webp', linkedin: '#' },
  { name: 'Kirei Najwa Shafira', code: 'IYEY', role: 'Lab Secretary', image: '/images/members/core/IYEY.webp', linkedin: '#' },
]

const divisions: Division[] = [
  {
    name: 'Competition',
    icon: Trophy,
    gradient: 'from-amber-500 to-orange-500',
    members: [
      { name: 'Bimo Alfarizy Lukman', code: 'FRZY', role: 'koordinator', image: '/images/members/competition/FRZY.webp', linkedin: '#' },
      { name: 'Azzahra Aulia Khoirunnisa', code: 'ZAAR', role: 'member', image: '/images/members/competition/ZAAR.webp', linkedin: '#' },
      { name: 'Nashwa Alya Zahra Pratiwi', code: 'NAZP', role: 'member', image: '/images/members/competition/NAZP.webp', linkedin: '#' },
      { name: 'Dhydo Aryo Jayanata', code: 'JAYY', role: 'member', image: '/images/members/competition/JAYY.webp', linkedin: '#' },
    ],
  },
  {
    name: 'Content',
    icon: PenLine,
    gradient: 'from-pink-500 to-rose-500',
    members: [
      { name: 'Muhammad Mufid Taqiyuddin', code: 'VIDS', role: 'koordinator', image: '/images/members/content/MUFID.webp', linkedin: '#' },
      { name: 'Maurithania Joleesha Maria Tjakra', code: 'NIYO', role: 'member', image: '/images/members/content/THANIA.webp', linkedin: '#' },
      { name: 'Muhammad Reyhan Armadani', code: 'REYY', role: 'member', image: '/images/members/content/REYHAN.webp', linkedin: '#' },
      { name: 'Renasya Cahya Handayani', code: 'IYAN', role: 'member', image: '/images/members/content/RENASYA.webp', linkedin: '#' },
      { name: 'Dinar Muhammad Akbar', code: 'DNMA', role: 'member', image: '/images/members/content/DINAR.webp', linkedin: '#' },
      { name: 'Zhafran Ahmad Zaidan', code: 'FRAN', role: 'member', image: '/images/members/content/ZHAFRAN.webp', linkedin: '#' },
    ],
  },
  {
    name: 'Enabler',
    icon: Handshake,
    gradient: 'from-emerald-500 to-teal-500',
    members: [
      { name: 'Refaya Azzam Maheswara', code: 'PAYY', role: 'koordinator', image: '/images/members/enabler/REFAYA.webp', linkedin: '#' },
      { name: 'Muhammad Fatih', code: 'MFTH', role: 'member', image: '/images/members/enabler/FATIH.webp', linkedin: '#' },
      { name: 'Fasya Arinal Hudha', code: 'SYRN', role: 'member', image: '/images/members/enabler/FASYA.webp', linkedin: '#' },
      { name: 'Elsa Ainun Yusniar', code: 'ESNY', role: 'member', image: '/images/members/enabler/ELSA.webp', linkedin: '#' },
      { name: 'Aisyah Nur Raihandany Putri', code: 'ASYH', role: 'member', image: '/images/members/enabler/AISYAH.webp', linkedin: '#' },
    ],
  },
  {
    name: 'Event',
    icon: CalendarDays,
    gradient: 'from-indigo-500 to-purple-500',
    members: [
      { name: 'Muhammad Luthfi Tukhfattur Romadhoni', code: 'MLTR', role: 'koordinator', image: '/images/members/event/DHONI.webp', linkedin: '#' },
      { name: 'Djaudza Djiyya Muhammad', code: 'DJZA', role: 'member', image: '/images/members/event/DJAUDZA.webp', linkedin: '#' },
      { name: 'Viki Firmansyah', code: 'VIKS', role: 'member', image: '/images/members/event/VIKI.webp', linkedin: '#' },
      { name: 'Rosita Jian Syahiirah', code: 'RORA', role: 'member', image: '/images/members/event/JIAN.webp', linkedin: '#' },
      { name: 'Jian Hazel Sitorus', code: 'ZELL', role: 'member', image: '/images/members/event/HAZEL.webp', linkedin: '#' },
      { name: 'Jehezkiel Agna', code: 'JEZA', role: 'member', image: '/images/members/event/JEZA.webp', linkedin: '#' },
    ],
  },
  {
    name: 'Research & Community',
    icon: Microscope,
    gradient: 'from-cyan-500 to-blue-500',
    members: [
      { name: 'Hilmi Zikri', code: 'ZIKK', role: 'koordinator', image: '/images/members/rnc/ZIKRI.webp', linkedin: '#' },
      { name: 'Zuhri Pratisto Basuki', code: 'ZRII', role: 'member', image: '/images/members/rnc/ZUHRI.webp', linkedin: '#' },
      { name: 'Rasya Akbar Lazuardi', code: 'LAZY', role: 'member', image: '/images/members/rnc/RASYA.webp', linkedin: '#' },
      { name: 'Rizky Saputra Al Amir', code: 'EKAA', role: 'member', image: '/images/members/rnc/EKA.webp', linkedin: '#' },
      { name: 'Alif Muslim Abdurrahman', code: 'MSLM', role: 'member', image: '/images/members/rnc/ALIF.webp', linkedin: '#' },
      { name: 'Anisa Hanun', code: 'ASAA', role: 'member', image: '/images/members/rnc/ASA.webp', linkedin: '#' },
      { name: 'Fairuzia Meyla Fatinah', code: 'FZMY', role: 'member', image: '/images/members/rnc/ZIA.webp', linkedin: '#' },
    ],
  },
  {
    name: 'Study Group',
    icon: BookOpen,
    gradient: 'from-violet-500 to-purple-600',
    members: [
      { name: 'Clarissa Tompunu', code: 'CARL', role: 'koordinator', image: '/images/members/studygroup/CLARISSA.webp', linkedin: '#' },
      { name: 'M. Paksi Pratama', code: 'PAKS', role: 'member', image: '/images/members/studygroup/PAKSI.webp', linkedin: '#' },
      { name: 'Naswa Gyna Sahira', code: 'SGYN', role: 'member', image: '/images/members/studygroup/NASWA.webp', linkedin: '#' },
      { name: 'Siti Amany Fakhirah Riby', code: 'SAFR', role: 'member', image: '/images/members/studygroup/AMANY.webp', linkedin: '#' },
    ],
  },
]

function PersonCard({ name, code, image, linkedin, badge, badgeGradient, size = 'sm' }: {
  name: string
  code: string
  image: string
  linkedin: string
  badge?: string
  badgeGradient?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const [hovered, setHovered] = useState(false)
  const isPlaceholder = image === '/images/logo.png'

  const sizeClasses = {
    sm: 'w-[6.5rem] h-[6.5rem] md:w-[8rem] md:h-[8rem]',
    md: 'w-[7.5rem] h-[7.5rem] md:w-[8.5rem] md:h-[8.5rem]',
    lg: 'w-[9.5rem] h-[9.5rem] md:w-[10.5rem] md:h-[10.5rem]',
  }

  const imageSizes = {
    sm: '(max-width: 768px) 80px, 96px',
    md: '(max-width: 768px) 96px, 112px',
    lg: '(max-width: 768px) 128px, 144px',
  };

  return (
    <div
      className="group text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative mx-auto mb-2 ${sizeClasses[size]} rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-white ${
        badge ? 'border-primary/25 shadow-lg group-hover:border-primary/40 group-hover:shadow-xl' : 'border-gray-100 shadow-md group-hover:border-primary/20 group-hover:shadow-lg'
      }`}>
        <Image
          src={image}
          alt={name}
          fill
          sizes={imageSizes[size]}
          className={isPlaceholder ? 'object-contain p-2' : 'object-cover'}
        />
      </div>
      <h4 className="text-xs md:text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-3 leading-tight">
        {name}
      </h4>
      {badge && (
        <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r ${badgeGradient || 'from-primary to-accent-green'}`}>
          {badge}
        </span>
      )}
      <p className="mt-0.5 font-mono text-[10px] tracking-wider text-gray-400">{code}</p>
    </div>
  )
}

export default function Structure() {
  const [activeTab, setActiveTab] = useState(0)
  const activeDivision = divisions[activeTab]

  const koordinator = activeDivision.members.find(m => m.role === 'koordinator')
  const members = activeDivision.members.filter(m => m.role === 'member')

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pb-8 px-4 hero-offset">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn direction="up" delay={0.2}>
            <div className="inline-flex items-center gap-2 glass-card px-5 py-2 rounded-full shadow-soft mb-6 shimmer-enhanced">
              <div className="w-1.5 h-1.5 bg-accent-green rounded-full" />
              <span className="text-sm font-semibold text-primary tracking-wide uppercase">Organization</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              <span className="text-gray-900">Our </span>
              <span className="text-primary">Structure</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
              Get to know the great people behind every division of EISD Laboratory.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Core Division — Compact horizontal */}
      <section className="py-8 px-4 w-full">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
          <FadeIn direction="up" delay={0.15}>
            <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Core Division</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 items-center justify-items-center w-full">
              {coreDivision.map((member) => {
                const isKetua = member.role === 'Head of Lab'
                const mobileOrder =
                  member.role === 'Head of Lab'
                    ? 'order-1 sm:order-2'
                    : member.role === 'Vice Head of Lab'
                    ? 'order-2 sm:order-1'
                    : 'order-3 sm:order-3'

                return (
                  <div key={member.code} className={mobileOrder}>
                    <PersonCard
                      name={member.name}
                      code={member.code}
                      image={member.image}
                      linkedin={member.linkedin}
                      badge={member.role}
                      size={isKetua ? 'lg' : 'md'}
                    />
                  </div>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

      {/* Division Tabs + Members */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Tab Bar */}
          <FadeIn direction="up" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {divisions.map((div, i) => {
                const Icon = div.icon

                return (
                  <button
                    key={div.name}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      i === activeTab
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.8} />
                    <span className="hidden sm:inline">{div.name}</span>
                  </button>
                )
              })}
            </div>
          </FadeIn>

          {/* Active Division Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mt-18 text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{activeDivision.name}</h2>
                <div className={`mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r ${activeDivision.gradient}`} />
              </div>

              {/* MEMBERS */}
              <div className="mt-6 flex flex-col items-center gap-10">

                {/* KOORDINATOR */}
                {koordinator && (
                  <div className="flex justify-center w-full">
                    <PersonCard
                      name={koordinator.name}
                      code={koordinator.code}
                      image={koordinator.image}
                      linkedin={koordinator.linkedin}
                      badge="Coordinator"
                      badgeGradient={activeDivision.gradient}
                      size="md"
                    />
                  </div>
                )}

                {/* MEMBERS */}
                {(() => {
                  const count = members.length

                  // ===== 1–3 ORANG =====
                  if (count <= 3) {
                    const cols = count === 1 ? 'grid-cols-1' : count === 2 ? 'grid-cols-2' : 'grid-cols-3'

                    return (
                      <div className="w-full max-w-3xl mx-auto px-4">
                        <div
                          className={`grid ${cols} gap-6 md:gap-8 justify-items-center items-start justify-center`}
                        >
                          {members.map((member) => (
                            <PersonCard
                              key={member.code}
                              name={member.name}
                              code={member.code}
                              image={member.image}
                              linkedin={member.linkedin}
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                    )
                  }

                  // ===== 4 ORANG (mobile: 3-1, desktop: 1 baris) =====
                  if (count === 4) {
                    return (
                      <div className="w-full max-w-3xl mx-auto px-4">
                        {/* Mobile: 3 atas, 1 bawah */}
                        <div className="flex flex-col items-center gap-6 md:hidden">
                          <div className="grid grid-cols-3 gap-6 justify-items-center">
                            {members.slice(0, 3).map((member) => (
                              <PersonCard
                                key={member.code}
                                name={member.name}
                                code={member.code}
                                image={member.image}
                                linkedin={member.linkedin}
                                size="sm"
                              />
                            ))}
                          </div>
                          <div className="flex justify-center gap-6">
                            {members.slice(3).map((member) => (
                              <PersonCard
                                key={member.code}
                                name={member.name}
                                code={member.code}
                                image={member.image}
                                linkedin={member.linkedin}
                                size="sm"
                              />
                            ))}
                          </div>
                        </div>

                        {/* Desktop: 1 baris 4 kolom */}
                        <div className="hidden md:grid md:grid-cols-4 md:gap-8 justify-items-center">
                          {members.map((member) => (
                            <PersonCard
                              key={member.code}
                              name={member.name}
                              code={member.code}
                              image={member.image}
                              linkedin={member.linkedin}
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                    )
                  }

                  // ===== 5 ORANG (3-2 CENTER) =====
                  if (count === 5) {
                    return (
                      <div className="flex flex-col items-center gap-8">

                        {/* ROW ATAS */}
                        <div className="grid grid-cols-3 gap-6 md:gap-8 justify-items-center">
                          {members.slice(0, 3).map((member) => (
                            <PersonCard
                              key={member.code}
                              name={member.name}
                              code={member.code}
                              image={member.image}
                              linkedin={member.linkedin}
                              size="sm"
                            />
                          ))}
                        </div>

                        {/* ROW BAWAH */}
                        <div className="flex justify-center gap-6 md:gap-8">
                          {members.slice(3).map((member) => (
                            <PersonCard
                              key={member.code}
                              name={member.name}
                              code={member.code}
                              image={member.image}
                              linkedin={member.linkedin}
                              size="sm"
                            />
                          ))}
                        </div>

                      </div>
                    )
                  }

                  // ===== 6 ORANG (3-3) =====
                  if (count === 6) {
                    return (
                      <div className="grid grid-cols-3 gap-6 md:gap-8 justify-items-center">
                        {members.map((member) => (
                          <PersonCard
                            key={member.code}
                            name={member.name}
                            code={member.code}
                            image={member.image}
                            linkedin={member.linkedin}
                            size="sm"
                          />
                        ))}
                      </div>
                    )
                  }

                  // ===== DEFAULT (7+ ORANG) =====
                  return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-items-center">
                      {members.map((member) => (
                        <PersonCard
                          key={member.code}
                          name={member.name}
                          code={member.code}
                          image={member.image}
                          linkedin={member.linkedin}
                          size="sm"
                        />
                      ))}
                    </div>
                  )
                })()}
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn direction="up" delay={0.2}>
            <div className="relative bg-gradient-to-br from-primary to-purple-700 rounded-3xl p-10 text-center text-white overflow-hidden">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Interested in Joining?</h2>
                <p className="text-white/80 mb-6 max-w-xl mx-auto">
                  EISD Laboratory always welcomes students who want to learn,
                  grow, and contribute in the field of technology.
                </p>
                <button
                  type="button"
                  onClick={() => toast('Coming Soon')}
                  className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Join Open Recruitment
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
