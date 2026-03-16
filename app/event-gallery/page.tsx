'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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

const galleryCategories = ['All', 'Events', 'Workshop', 'Team', 'Competition']

const galleryItems = [
  { id: 1, title: 'Web Dev Bootcamp 2025', category: 'Workshop', image: '/images/logo.png', span: 'col-span-1 row-span-1' },
  { id: 2, title: 'Team Building Activity', category: 'Team', image: '/images/logo.png', span: 'col-span-1 md:col-span-2 row-span-1' },
  { id: 3, title: 'Hackathon EISD 2024', category: 'Competition', image: '/images/logo.png', span: 'col-span-1 row-span-1' },
  { id: 4, title: 'AI Workshop Session', category: 'Workshop', image: '/images/logo.png', span: 'col-span-1 row-span-1' },
  { id: 5, title: 'Annual Lab Gathering', category: 'Events', image: '/images/logo.png', span: 'col-span-1 row-span-1' },
  { id: 6, title: 'Tech Seminar 2024', category: 'Events', image: '/images/logo.png', span: 'col-span-1 md:col-span-2 row-span-1' },
  { id: 7, title: 'Competition Team Photo', category: 'Competition', image: '/images/logo.png', span: 'col-span-1 row-span-1' },
  { id: 8, title: 'Lab Members 2024', category: 'Team', image: '/images/logo.png', span: 'col-span-1 row-span-1' },
  { id: 9, title: 'UI/UX Design Workshop', category: 'Workshop', image: '/images/logo.png', span: 'col-span-1 row-span-1' },
  { id: 10, title: 'Open Recruitment 2024', category: 'Events', image: '/images/logo.png', span: 'col-span-1 row-span-1' },
  { id: 11, title: 'IoT Project Demo', category: 'Workshop', image: '/images/logo.png', span: 'col-span-1 md:col-span-2 row-span-1' },
  { id: 12, title: 'National Competition Win', category: 'Competition', image: '/images/logo.png', span: 'col-span-1 row-span-1' },
]

// Helper untuk warna kategori teks saja (border dihapus dari helper karena pakai gradient)
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
export default function EventGallery() {
  const [activeTab, setActiveTab] = useState<'events' | 'gallery'>('events')
  const [eventFilter, setEventFilter] = useState('All')
  const [galleryFilter, setGalleryFilter] = useState('All')
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null)

  const filteredEvents = eventFilter === 'All' ? events : events.filter(e => e.category === eventFilter)
  const filteredGallery = galleryFilter === 'All' ? galleryItems : galleryItems.filter(g => g.category === galleryFilter)

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
              <span className="text-sm font-semibold text-primary">Events & Gallery</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Events & Gallery</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Ikuti berbagai kegiatan menarik kami dan lihat momen-momen terbaik
              dari perjalanan EISD Laboratory.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="px-4 pb-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn direction="up" delay={0.3}>
            <div className="flex justify-center">
              <div className="inline-flex bg-white backdrop-blur-sm rounded-2xl p-1.5 border border-gray-200 shadow-sm">
                <button
                  onClick={() => setActiveTab('events')}
                  className={`relative px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'events'
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {activeTab === 'events' && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-primary rounded-xl shadow-md"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Events
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`relative px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'gallery'
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {activeTab === 'gallery' && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-primary rounded-xl shadow-md"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Gallery
                  </span>
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'events' ? (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
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
                        <Link href={`/event-gallery/${event.id}`} className="block h-full">
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

                            {/* Pembatas Gradient Dinamis (Menggunakan Div) */}
                            {/* Memisahkan div gambar & teks, lalu menggunakan gradient dari data map */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 sm:h-full sm:w-1 sm:right-auto sm:left-[45%] sm:top-0 bg-gradient-to-r sm:bg-gradient-to-b ${event.gradient}`} />

                            {/* Kanan: Content Area */}
                            <div className={`w-full sm:w-[55%] p-6 sm:pl-8 sm:my-6 flex flex-col justify-center`}>
                              
                              {/* Top Row: Badge & Date */}
                              <div className="flex items-center gap-3 mb-3">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                                  event.status === 'upcoming'
                                    ? 'bg-[#FF8A00] text-white' // Orange
                                    : 'bg-[#8C8C8C] text-white' // Gray
                                }`}>
                                  {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                                </span>
                                <span className="text-[11px] text-gray-400 font-medium">
                                  {event.date}
                                </span>
                              </div>

                              {/* Category Name */}
                              <p className={`text-[11px] font-bold mb-1 ${textColor}`}>
                                {event.category}
                              </p>

                              {/* Title */}
                              <h3 className="text-[17px] font-extrabold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                                {event.title}
                              </h3>

                              {/* Description */}
                              <p className="text-[12px] text-gray-500 leading-relaxed mb-4 line-clamp-3">
                                {event.description}
                              </p>

                              {/* Location */}
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
          </motion.div>
        ) : (
          /* Bagian Gallery */
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Gallery Filters */}
            <section className="px-4 pb-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap justify-center gap-3">
                  {galleryCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryFilter(cat)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        galleryFilter === cat
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

            {/* Gallery Grid */}
            <section className="py-8 px-4 relative">
              <div className="max-w-6xl mx-auto relative z-10">
                <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <AnimatePresence mode="popLayout">
                    {filteredGallery.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className={`${item.span} cursor-pointer`}
                        onClick={() => setSelectedImage(item)}
                      >
                        <div className="group relative h-full min-h-[200px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-4">
                              <span className="text-white/80 text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
                              <h3 className="text-white font-bold text-sm mt-1">{item.title}</h3>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filteredGallery.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-gray-400 text-lg">Belum ada foto di kategori ini.</p>
                  </div>
                )}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-80 md:h-96 bg-gray-50 flex items-center justify-center">
                <Image src={selectedImage.image} alt={selectedImage.title} fill className="object-contain p-8" />
              </div>
              <div className="p-8">
                <span className="text-primary text-xs font-bold uppercase tracking-wider">{selectedImage.category}</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{selectedImage.title}</h3>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <BackToTop />
    </main>
  )
}