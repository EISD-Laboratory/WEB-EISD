'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const stats = [
  { value: '30+', label: 'Members' },
  { value: '7', label: 'Divisions' },
  { value: '4', label: 'Focus Areas' },
]

const ANNOUNCEMENT_STORAGE_KEY = 'eisd-announcement-dismissed'

export default function Hero() {
  const [announcementVisible, setAnnouncementVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem(ANNOUNCEMENT_STORAGE_KEY)
      return !dismissed
    }
    return true
  })

  useEffect(() => {
    const checkDismissed = () => {
      const dismissed = sessionStorage.getItem(ANNOUNCEMENT_STORAGE_KEY)
      setAnnouncementVisible(!dismissed)
    }

    checkDismissed()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ANNOUNCEMENT_STORAGE_KEY) {
        checkDismissed()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <section className="relative min-h-[calc(100vh-64px-var(--announcement-bar-height))] flex items-stretch bg-white">
      <div className="w-full lg:w-[32%] xl:w-[30%] flex flex-col justify-center px-6 sm:px-8 lg:px-10 xl:px-12 py-12 lg:pt-12 lg:pb-14 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex w-fit items-center gap-2 glass-card px-4 py-2 rounded-full shadow-soft mb-4 shimmer-enhanced"
        >
          <div className="w-1.5 h-1.5 bg-accent-green rounded-full" />
          <span className="text-xs font-semibold text-primary tracking-wide uppercase">Laboratory Profile</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold leading-[1.15] mb-4"
        >
          <span className="text-gray-900">Enterprise Intelligence</span><br />
          <span className="text-gray-900">System </span>
          <span className="text-accent-green">Development</span><br />
          <span className="text-primary">Laboratory</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-gray-500 text-sm lg:text-base leading-relaxed mb-6 max-w-md"
        >
          A research laboratory at Telkom University focused on IoT, Software Development, UI/UX, AI, and Digital Innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center gap-6 mb-6" 
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              {i > 0 && <div className="w-px h-8 bg-gray-200" />}
              <div className={i > 0 ? 'pl-3' : ''}>
                <p className="text-2xl lg:text-3xl font-bold text-primary leading-none">{stat.value}</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="/about"
            className="bg-primary hover:bg-primary-dark text-white px-7 py-3 rounded-full text-sm font-semibold transition-colors duration-200"
          >
            Discover More
          </a>
          <a
            href="/structure"
            className="bg-white border border-gray-200 hover:border-primary/30 hover:text-primary text-gray-600 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200"
          >
            Our Team
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block flex-1 relative"
      >
        <Image
          src="/images/photo-landing.webp"
          alt="EISD Laboratory Team"
          fill
          className="object-cover object-[20%_35%]"
          priority
        />
        <div className="absolute inset-y-0 -left-1 w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

        <div className={`absolute right-6 z-20 transition-all duration-300 ${announcementVisible ? 'bottom-8' : 'xl:bottom-20 bottom-16'}`}>
          <div className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-2 shadow-sm shimmer-enhanced">
            <p className="text-xs font-semibold text-gray-700">EISD Laboratory <span className="text-accent-green">V6</span></p>
          </div>
        </div>
      </motion.div>

      <div className="lg:hidden absolute inset-0 z-0">
        <Image
          src="/images/photo-landing.webp"
          alt="EISD Laboratory Team"
          fill
          className="object-cover opacity-[0.07]"
          priority
        />
      </div>
    </section>
  )
}