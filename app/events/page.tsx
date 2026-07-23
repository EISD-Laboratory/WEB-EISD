'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import { useEffect, useState } from 'react'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* ── Data ── */
const eventCategories = ['All', 'Webinar', 'Seminar', 'Competition', 'Study Group']

type EventStatus = 'upcoming' | 'completed'

type Event = {
  id: number
  title: string
  category: string
  date: string
  location: string
  description: string
  image: string
  status: EventStatus
  gradient: string
}

const events: Event[] = [
  {
    id: 1,
    title: 'Webinar No-Code vs Pro-Code',
    category: 'Webinar',
    date: 'April 2026',
    location: 'Online',
    description: 'A webinar discussing the comparison between No-Code and Pro-Code in the industry.',
    image: '/images/events/webinar/Webinar No-Code vs Pro-Code/webinar_nocode_sampul.webp',
    status: 'completed' as const,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 2,
    title: 'Public Lecture on Information Systems Project Management',
    category: 'Seminar',
    date: 'May 2026',
    location: 'Auditorium Gedung Damar, Telkom University',
    description: 'A public lecture on effective communication between IT teams and business.',
    image: '/images/events/seminar/Kuliah Umum MANPROSI/kulum_manprosi_sampul.webp',
    status: 'completed' as const,
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    id: 3,
    title: 'Company Visit AWS',
    category: 'Seminar',
    date: 'May 2026',
    location: 'AWS Indonesia, Jakarta',
    description: 'An exclusive visit to AWS Indonesia to explore the cloud ecosystem and industry technology.',
    image: '/images/events/seminar/Company Visit AWS/comvis_AWS_sampul.webp',
    status: 'completed' as const,
    gradient: 'from-red-500 to-orange-500',
  },
  {
    id: 4,
    title: 'Unity Nights Study Group EISD',
    category: 'Study Group',
    date: 'May 2026',
    location: 'Auditorium TULT Lantai 16, Telkom University',
    description: "A togetherness night for EISD Study Group to introduce the Final Project and strengthen team collaboration.",
    image: '/images/events/studygroup/unity_night/unity_night_cover.webp',
    status: 'completed' as const,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 5,
    title: 'Pitching Day',
    category: 'Study Group',
    date: 'June 2026',
    location: 'TULT 0810, Telkom University',
    description: 'A Final Project presentation event to share ideas and project results.',
    image: '/images/events/studygroup/pitching_day/pitching-day-cover.webp',
    status: 'completed' as const,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 6,
    title: 'Awarding Night',
    category: 'Study Group',
    date: 'June 2026',
    location: 'Online',
    description: 'An awarding event for the best teams in the EISD Study Group program.',
    image: '/images/events/studygroup/awarding_night/awarding-night-cover.webp',
    status: 'completed' as const,
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    id: 7,
    title: 'EISD Competition 2026',
    category: 'Competition',
    date: 'September 2026',
    location: 'Online',
    description: 'A technology innovation competition for students across Indonesia.',
    image: '/images/events/competition/eisd_compe_2026/eisd-compe-2026-cover.webp',
    status: 'upcoming' as const,
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    id: 8,
    title: 'Company Visit Google',
    category: 'Seminar',
    date: 'May 2025',
    location: 'Google Indonesia, Jakarta',
    description: 'An exclusive visit to Google Indonesia to explore the cloud ecosystem and industry technology.',
    image: '/images/events/seminar/Company Visit Google/comvis-google-cover.webp',
    status: 'completed' as const,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 9,
    title: 'EISD Competition 2025',
    category: 'Competition',
    date: 'November 2025',
    location: 'TULT 16th Floor, Telkom University',
    description: 'An onsite hackathon where innovation meets real-world problem solving.',
    image: '/images/events/competition/eisd_compe_2025/eisd-compe-2025-cover.webp',
    status: 'completed' as const,
    gradient: 'from-yellow-500 to-orange-500',
  }
]

const getCategoryTextColor = (category: string) => {
  switch (category) {
    case 'Study Group': return 'text-purple-600'
    case 'Webinar': return 'text-emerald-500'
    case 'Seminar': return 'text-blue-500'
    case 'Competition': return 'text-pink-500'
    default: return 'text-gray-900'
  }
}

/* ── Page Component ── */
export default function EventsPage() {
  const [eventFilter, setEventFilter] = useState('All')
  const [shuffledEvents, setShuffledEvents] = useState(events)

  useEffect(() => {
    setShuffledEvents(shuffle(events))
  }, [])

  const filteredEvents = eventFilter === 'All' ? shuffledEvents : shuffledEvents.filter(e => e.category === eventFilter)

  return (
    <main className="min-h-screen bg-gray-50/50">

      {/* Hero Section */}
      <section className="pt-28 pb-8 px-4 relative">
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
              Follow along with the exciting activities throughout EISD Laboratory&apos;s journey.
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
              const isUpcoming = event.status === 'upcoming'
              const card = (
                <div className={`group relative bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 h-full flex flex-col sm:flex-row ${
                  isUpcoming ? 'cursor-default' : 'hover:shadow-lg'
                }`}>
                  
                  <div className="w-full sm:w-[45%] relative flex items-center bg-gray-50 justify-center overflow-hidden">
                    <div className="relative w-full aspect-[4/5]">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className={`object-cover transition-transform duration-500 ${
                          isUpcoming ? '' : 'group-hover:scale-105'
                        }`}
                      />
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 sm:h-full sm:w-1 sm:right-auto sm:left-[45%] sm:top-0 bg-gradient-to-r sm:bg-gradient-to-b ${event.gradient}`} />

                  <div className="w-full sm:w-[55%] p-6 sm:pl-8 sm:my-6 flex flex-col justify-center">
                    
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                        isUpcoming
                          ? 'bg-[#FF8A00] text-white' 
                          : 'bg-emerald-500 text-white' 
                      }`}>
                        {isUpcoming ? 'Upcoming' : 'Completed'}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {event.date}
                      </span>
                    </div>

                    <p className={`text-[11px] font-bold mb-1 ${textColor}`}>
                      {event.category}
                    </p>

                    <h3 className={`text-[17px] font-extrabold text-gray-900 mb-2 leading-tight transition-colors ${
                      isUpcoming ? '' : 'group-hover:text-primary'
                    }`}>
                      {event.title}
                    </h3>

                    {!isUpcoming && (
                      <p className="text-[12px] text-gray-500 leading-relaxed mb-4 line-clamp-3">
                        {event.description}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-auto font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                </div>
              )
              
              return (
                <FadeIn key={event.id} direction="up" delay={0.1 * (index + 1)}>
                  {isUpcoming ? (
                    card
                  ) : (
                    <Link href={`/events/${event.id}`} className="block h-full">
                      {card}
                    </Link>
                  )}
                </FadeIn>
              )
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No events in this category yet.</p>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Want to Join Our Events?</h2>
                <p className="text-white/80 mb-6 max-w-xl mx-auto">
                  Follow our social media for the latest event updates.
                </p>
                <a
                  href="https://www.instagram.com/peopleateisd/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-primary font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block"
                    >
                      Follow Our Instagram
                    </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
