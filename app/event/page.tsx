'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import BackToTop from '@/components/BackToTop'
import FadeIn from '@/components/FadeIn'
import { useState } from 'react'

/* ── Data ── */
const eventCategories = ['All', 'Workshop', 'Seminar', 'Competition', 'Study Group']

const events = [
  {
    id: 1,
    title: 'Study Group 2025',
    category: 'Study Group',
    date: 'Maret - September 2025',
    location: 'Telkom University',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/images/logo.png',
    status: 'upcoming' as const,
    gradient: 'from-purple-500 to-blue-500',
  },
  {
    id: 2,
    title: 'Belajar Blender',
    category: 'Workshop',
    date: 'Maret - September 2025',
    location: 'Telkom University',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/images/logo.png',
    status: 'upcoming' as const,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 3,
    title: 'Quality Assurance Workshop',
    category: 'Seminar',
    date: 'Maret - September 2025',
    location: 'Telkom University',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/images/logo.png',
    status: 'completed' as const,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 4,
    title: 'Hackathon EISD 2025',
    category: 'Competition',
    date: 'Maret - September 2025',
    location: 'Telkom University',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/images/logo.png',
    status: 'completed' as const,
    gradient: 'from-pink-500 to-rose-500',
  },
]

const getCategoryTextColor = (category: string) => {
  switch (category) {
    case 'Study Group': return 'text-purple-600'
    case 'Workshop': return 'text-emerald-500'
    case 'Seminar': return 'text-blue-500'
    case 'Competition': return 'text-pink-500'
    default: return 'text-gray-900'
  }
}

/* ── Page Component ── */
export default function EventsPage() {
  const [eventFilter, setEventFilter] = useState('All')

  const filteredEvents = eventFilter === 'All' ? events : events.filter(e => e.category === eventFilter)

  return (
    <main className="min-h-screen bg-gray-50/50">
      <ScrollProgressBar />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <FadeIn direction="up" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-card px-5 py-2 rounded-full shadow-soft mb-6 shimmer-enhanced bg-white border border-gray-100"
            >
              <div className="w-1.5 h-1.5 bg-accent-green rounded-full pulse-subtle" />
              <span className="text-sm font-semibold text-primary">Our Events</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Events</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Ikuti berbagai kegiatan menarik kami dari perjalanan EISD Laboratory.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Event Filters */}
      <section className="px-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {eventCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setEventFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  eventFilter === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/30 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-8 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event, index) => {
              const textColor = getCategoryTextColor(event.category)
              
              return (
                <FadeIn key={event.id} direction="up" delay={0.1 * (index + 1)}>
                  <Link href={`/event/${event.id}`} className="block h-full">
                    <div className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 h-full flex flex-col sm:flex-row">
                      
                      <div className="w-full sm:w-[45%] relative p-6 flex items-center bg-gray-50 justify-center">
                        <div className="relative w-full h-40 sm:h-full min-h-[160px]">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                          />
                        </div>
                      </div>

                      <div className={`absolute bottom-0 left-0 right-0 h-1 sm:h-full sm:w-1 sm:right-auto sm:left-[45%] sm:top-0 bg-gradient-to-r sm:bg-gradient-to-b ${event.gradient}`} />

                      <div className={`w-full sm:w-[55%] p-6 sm:pl-8 sm:my-6 flex flex-col justify-center`}>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                            event.status === 'upcoming'
                              ? 'bg-[#FF8A00] text-white' 
                              : 'bg-[#8C8C8C] text-white' 
                          }`}>
                            {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                          </span>
                          <span className="text-[11px] text-gray-400 font-medium">
                            {event.date}
                          </span>
                        </div>

                        <p className={`text-[11px] font-bold mb-1 ${textColor}`}>
                          {event.category}
                        </p>

                        <h3 className="text-[17px] font-extrabold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>

                        <p className="text-[12px] text-gray-500 leading-relaxed mb-4 line-clamp-3">
                          {event.description}
                        </p>

                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-auto font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                    </div>
                  </Link>
                </FadeIn>
              )
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">Belum ada event di kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn direction="up" delay={0.2}>
            <div className="relative bg-primary rounded-3xl p-10 text-center text-white overflow-hidden">
              <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Ingin Mengikuti Event Kami?</h2>
                <p className="text-white/80 mb-6 max-w-xl mx-auto">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ikuti media sosial kami
                  untuk informasi event terbaru.
                </p>
                <button className="bg-white text-primary font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Follow Our Instagram
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