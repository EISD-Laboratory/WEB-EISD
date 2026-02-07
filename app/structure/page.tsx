'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import BackToTop from '@/components/BackToTop'
import SectionHeading from '@/components/SectionHeading'
import FadeIn from '@/components/FadeIn'
import { useState } from 'react'

/* ── Types ── */
interface MemberData {
  name: string
  code: string
  role: 'koordinator' | 'member'
  image: string
  linkedin: string
}

interface Division {
  name: string
  icon: string
  gradient: string
  borderGradient: string
  members: MemberData[]
}

/* ── Data ── */
const coreDivision = [
  { name: 'Fadia Rizqa Yunanto', code: 'RYUU', role: 'Ketua Lab', image: '/images/logo.png', linkedin: '#' },
  { name: 'Deazard Muhammad Arrayyan', code: 'DEZA', role: 'Wakil Ketua Lab', image: '/images/members/DEZA.png', linkedin: 'https://www.linkedin.com/in/deazard/' },
  { name: 'Kirei Najwa Shafira', code: 'IYEY', role: 'Sekretaris Lab', image: '/images/logo.png', linkedin: '#' },
]

const divisions: Division[] = [
  {
    name: 'Competition',
    icon: '🏆',
    gradient: 'from-amber-500 to-orange-500',
    borderGradient: 'from-amber-400 via-orange-500 to-red-500',
    members: [
      { name: 'Bimo Alfarizy Lukman', code: 'FRZY', role: 'koordinator', image: '/images/logo.png', linkedin: '#' },
      { name: 'Azzahra Aulia Khoirunnisa', code: 'ZAAR', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Nashwa Alya Zahra Pratiwi', code: 'NAZP', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Dhydo Aryo Jayanata', code: 'JAYY', role: 'member', image: '/images/logo.png', linkedin: '#' },
    ],
  },
  {
    name: 'Content',
    icon: '✍️',
    gradient: 'from-pink-500 to-rose-500',
    borderGradient: 'from-pink-400 via-rose-500 to-red-400',
    members: [
      { name: 'Muhammad Mufid Taqiyuddin', code: 'VIDS', role: 'koordinator', image: '/images/logo.png', linkedin: '#' },
      { name: 'Maurithania Joleesha Maria Tjakra', code: 'NIYO', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Muhammad Reyhan Armadani', code: 'REYY', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Renasya Cahya Handayani', code: 'IYAN', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Dinar Muhammad Akbar', code: 'DNMA', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Zhafran Ahmad Zaidan', code: 'FRAN', role: 'member', image: '/images/logo.png', linkedin: '#' },
    ],
  },
  {
    name: 'Enabler',
    icon: '⚙️',
    gradient: 'from-emerald-500 to-teal-500',
    borderGradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    members: [
      { name: 'Refaya Azzam Maheswara', code: 'PAYY', role: 'koordinator', image: '/images/logo.png', linkedin: '#' },
      { name: 'Muhammad Fatih', code: 'mfth', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Fasya Arinal Hudha', code: 'SYRN', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Elsa Ainun Yusniar', code: 'ESNY', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Aisyah Nur Raihandany Putri', code: 'ASYH', role: 'member', image: '/images/logo.png', linkedin: '#' },
    ],
  },
  {
    name: 'Event',
    icon: '🎪',
    gradient: 'from-indigo-500 to-purple-500',
    borderGradient: 'from-indigo-400 via-purple-500 to-pink-500',
    members: [
      { name: 'Muhammad Luthfi Tukhfattur Romadhoni', code: 'MLTR', role: 'koordinator', image: '/images/logo.png', linkedin: '#' },
      { name: 'Djaudza Djiyya Muhammad', code: 'DJZA', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Viki Firmansyah', code: 'VIKS', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Rosita Jian Syahiirah', code: 'RORA', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Jian Hazel Sitorus', code: 'ZELL', role: 'member', image: '/images/logo.png', linkedin: '#' },
    ],
  },
  {
    name: 'Research & Community',
    icon: '🔬',
    gradient: 'from-cyan-500 to-blue-500',
    borderGradient: 'from-cyan-400 via-blue-500 to-indigo-500',
    members: [
      { name: 'Hilmi Zikri', code: 'ZIKK', role: 'koordinator', image: '/images/logo.png', linkedin: '#' },
      { name: 'Zuhri Pratisto Basuki', code: 'ZRII', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Rasya Akbar Lazuardi', code: 'LAZY', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Rizky Saputra Al Amir', code: 'EKAA', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Alif Muslim Abdurrahman', code: 'MSLMN', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Anisa Hanun', code: 'ASAA', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Fairuzia Meyla Fatinah', code: 'FZMY', role: 'member', image: '/images/logo.png', linkedin: '#' },
    ],
  },
  {
    name: 'Study Group',
    icon: '📚',
    gradient: 'from-violet-500 to-purple-600',
    borderGradient: 'from-violet-400 via-purple-500 to-fuchsia-500',
    members: [
      { name: 'Clarissa Tompunu', code: 'CARL', role: 'koordinator', image: '/images/logo.png', linkedin: '#' },
      { name: 'M. Paksi Pratama', code: 'MPP', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Naswa Gyna Sahira', code: 'SGYN', role: 'member', image: '/images/logo.png', linkedin: '#' },
      { name: 'Siti Amany Fakhirah Riby', code: 'SAFR', role: 'member', image: '/images/logo.png', linkedin: '#' },
    ],
  },
]

/* ── LinkedIn icon SVG path ── */
const linkedinPath = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

/* ── Reusable Member Card ── */
function MemberCard({
  name,
  code,
  image,
  linkedin,
  isKoordinator,
  gradient,
  delay,
}: {
  name: string
  code: string
  image: string
  linkedin: string
  isKoordinator: boolean
  gradient: string
  delay: number
}) {
  const [hovered, setHovered] = useState(false)
  const isPlaceholder = image === '/images/logo.png'

  return (
    <FadeIn direction="up" delay={delay}>
      <div
        className="group relative text-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Photo container */}
        <div className={`relative mx-auto mb-3 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
          isKoordinator
            ? 'w-28 h-28 md:w-32 md:h-32 border-primary/30 shadow-xl group-hover:shadow-2xl group-hover:border-primary/50'
            : 'w-24 h-24 md:w-28 md:h-28 border-white/60 shadow-lg group-hover:shadow-xl group-hover:border-primary/30'
        }`}>
          {isKoordinator && (
            <div className={`absolute -inset-1 bg-gradient-to-br ${gradient} rounded-2xl opacity-20 blur-sm -z-10`} />
          )}
          <div className="w-full h-full bg-white relative">
            <Image
              src={image}
              alt={name}
              fill
              className={isPlaceholder ? 'object-contain p-2 md:p-3' : 'object-cover'}
            />
          </div>

          {/* LinkedIn Hover Overlay */}
          {linkedin && linkedin !== '#' && (
            <motion.a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-blue-600/80 backdrop-blur-sm flex items-center justify-center gap-1.5 z-10"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d={linkedinPath} />
              </svg>
              <span className="text-white text-xs font-semibold">LinkedIn</span>
            </motion.a>
          )}
        </div>

        {/* Name */}
        <h4 className={`font-bold group-hover:text-primary transition-colors line-clamp-2 ${
          isKoordinator ? 'text-sm md:text-base text-gray-900' : 'text-xs md:text-sm text-gray-800'
        }`}>
          {name}
        </h4>

        {/* Role badge */}
        {isKoordinator && (
          <span className={`inline-block mt-1.5 px-3 py-0.5 rounded-full text-[10px] md:text-xs font-semibold bg-gradient-to-r ${gradient} text-white`}>
            Koordinator
          </span>
        )}

        {/* Code */}
        <p className={`mt-1 font-mono tracking-wider ${
          isKoordinator ? 'text-xs text-primary/60' : 'text-[10px] text-gray-400'
        }`}>
          {code}
        </p>
      </div>
    </FadeIn>
  )
}

/* ── Page Component ── */
export default function Structure() {
  const ketuaLab = coreDivision[0]
  const wakilSekretaris = coreDivision.slice(1)

  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 relative glow-blue-top-right overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <FadeIn direction="up" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-card px-5 py-2.5 rounded-full shadow-soft mb-6 shimmer-enhanced"
            >
              <div className="w-2 h-2 bg-primary rounded-full pulse-subtle" />
              <span className="text-sm text-gray-700 font-medium">Organization</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Our Structure</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Kenali orang-orang hebat di balik setiap divisi EISD Laboratory
              yang bekerja bersama membangun ekosistem teknologi.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Core Division ── */}
      <section className="py-12 px-4 relative glow-blue-left overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading
            eyebrow="Core"
            title="Core Division"
            subtitle="Pimpinan utama yang menjalankan dan mengarahkan EISD Laboratory."
          />

          {/* Ketua Lab — Featured / Highlighted */}
          <FadeIn direction="up" delay={0.15}>
            <div className="flex justify-center mt-10 mb-10">
              <KetuaCard
                name={ketuaLab.name}
                code={ketuaLab.code}
                role={ketuaLab.role}
                image={ketuaLab.image}
                linkedin={ketuaLab.linkedin}
              />
            </div>
          </FadeIn>

          {/* Wakil + Sekretaris */}
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {wakilSekretaris.map((member, index) => (
              <CoreMemberCard
                key={member.code}
                name={member.name}
                code={member.code}
                role={member.role}
                image={member.image}
                linkedin={member.linkedin}
                delay={0.2 + 0.15 * index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Divisi Sections ── */}
      {divisions.map((division, divIndex) => {
        const koordinator = division.members.find(m => m.role === 'koordinator')
        const members = division.members.filter(m => m.role === 'member')
        const isEven = divIndex % 2 === 0
        const glowClass = isEven ? 'glow-pink-left' : 'glow-blue-right'

        return (
          <section key={division.name} className={`py-12 px-4 relative ${glowClass} overflow-hidden`}>
            <div className="max-w-5xl mx-auto relative z-10">
              {/* Division Header */}
              <FadeIn direction="up" delay={0.1}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${division.gradient} flex items-center justify-center shadow-lg`}>
                    <span className="text-xl md:text-2xl">{division.icon}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{division.name}</h2>
                </div>
                <div className={`mx-auto mt-3 mb-8 h-1 w-20 rounded-full bg-gradient-to-r ${division.gradient}`} />
              </FadeIn>

              {/* Koordinator */}
              {koordinator && (
                <div className="flex justify-center mb-8">
                  <div className="w-32 md:w-40">
                    <MemberCard
                      name={koordinator.name}
                      code={koordinator.code}
                      image={koordinator.image}
                      linkedin={koordinator.linkedin}
                      isKoordinator={true}
                      gradient={division.gradient}
                      delay={0.2}
                    />
                  </div>
                </div>
              )}

              {/* Members Grid */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {members.map((member, mIndex) => (
                  <div key={member.code} className="w-28 md:w-32">
                    <MemberCard
                      name={member.name}
                      code={member.code}
                      image={member.image}
                      linkedin={member.linkedin}
                      isKoordinator={false}
                      gradient={division.gradient}
                      delay={0.1 * (mIndex + 1)}
                    />
                  </div>
                ))}
              </div>

              {/* Separator */}
              {divIndex < divisions.length - 1 && (
                <div className="mt-12 flex justify-center">
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>
              )}
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn direction="up" delay={0.2}>
            <div className="relative bg-gradient-to-br from-primary to-purple-700 rounded-3xl p-10 text-center text-white overflow-hidden">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Tertarik Bergabung?</h2>
                <p className="text-white/80 mb-6 max-w-xl mx-auto">
                  EISD Laboratory selalu membuka kesempatan bagi mahasiswa yang ingin belajar,
                  berkembang, dan berkontribusi di bidang teknologi.
                </p>
                <button className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Join Open Recruitment
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  )
}

/* ── Core Member Card (Wakil / Sekretaris) ── */
function CoreMemberCard({
  name,
  code,
  role,
  image,
  linkedin,
  delay,
}: {
  name: string
  code: string
  role: string
  image: string
  linkedin: string
  delay: number
}) {
  const [hovered, setHovered] = useState(false)
  const isPlaceholder = image === '/images/logo.png'

  return (
    <FadeIn direction="up" delay={delay}>
      <div
        className="group text-center w-40 md:w-48"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative mx-auto mb-4 w-32 h-32 md:w-36 md:h-36">
          <div className="absolute -inset-1.5 bg-gradient-to-br from-primary via-purple-500 to-accent-green rounded-2xl opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl bg-white group-hover:border-primary/40 transition-all duration-300">
            <Image
              src={image}
              alt={name}
              fill
              className={isPlaceholder ? 'object-contain p-4' : 'object-cover'}
            />
            {linkedin && linkedin !== '#' && (
              <motion.a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-blue-600/80 backdrop-blur-sm flex items-center justify-center gap-2 z-10"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d={linkedinPath} />
                </svg>
                <span className="text-white text-sm font-semibold">LinkedIn</span>
              </motion.a>
            )}
          </div>
        </div>
        <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
          {name}
        </h3>
        <span className="inline-block mt-2 px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary to-accent-green text-white shadow-md">
          {role}
        </span>
        <p className="mt-1.5 font-mono text-xs tracking-wider text-primary/50">{code}</p>
      </div>
    </FadeIn>
  )
}

/* ── Ketua Lab Featured Card ── */
function KetuaCard({
  name,
  code,
  role,
  image,
  linkedin,
}: {
  name: string
  code: string
  role: string
  image: string
  linkedin: string
}) {
  const [hovered, setHovered] = useState(false)
  const isPlaceholder = image === '/images/logo.png'

  return (
    <div
      className="group text-center w-52 md:w-60"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo with prominent glow */}
      <div className="relative mx-auto mb-5 w-40 h-40 md:w-48 md:h-48">
        {/* Animated multi-layer glow */}
        <div className="absolute -inset-3 bg-gradient-to-br from-primary via-purple-500 to-accent-green rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500 animate-gradient-border" />
        <div className="absolute -inset-1.5 bg-gradient-to-br from-primary to-accent-green rounded-3xl opacity-40 blur-md" />

        <div className="relative w-full h-full rounded-3xl overflow-hidden border-3 border-primary/30 shadow-2xl bg-white group-hover:border-primary/50 transition-all duration-300 ring-2 ring-primary/10">
          <Image
            src={image}
            alt={name}
            fill
            className={isPlaceholder ? 'object-contain p-5' : 'object-cover'}
          />

          {/* LinkedIn overlay */}
          {linkedin && linkedin !== '#' && (
            <motion.a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-blue-600/80 backdrop-blur-sm flex items-center justify-center gap-2 z-10"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d={linkedinPath} />
              </svg>
              <span className="text-white text-base font-semibold">LinkedIn</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Name & Role */}
      <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
        {name}
      </h3>
      <span className="inline-block mt-2 px-5 py-1.5 rounded-full text-xs md:text-sm font-bold bg-gradient-to-r from-primary to-accent-green text-white shadow-lg shadow-primary/20">
        {role}
      </span>
      <p className="mt-2 font-mono text-sm tracking-wider text-primary/50">{code}</p>
    </div>
  )
}
