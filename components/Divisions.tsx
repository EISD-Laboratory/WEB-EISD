'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { divisions } from '@/lib/data'
import SectionHeading from './SectionHeading'
import Counter from './Counter'
import { useState } from 'react'

export default function Divisions() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const [isAnimating, setIsAnimating] = useState(false)

  // Use divisions directly for infinite loop
  const allCards = divisions

  const gradients = [
    'from-purple-500 via-blue-500 to-cyan-500',
    'from-pink-500 via-rose-500 to-orange-500',
    'from-emerald-500 via-teal-500 to-cyan-500',
    'from-amber-500 via-orange-500 to-red-500',
    'from-indigo-500 via-purple-500 to-pink-500',
  ]

  const cardsPerView = 3 // Show 3 cards at a time
  const totalCards = allCards.length

  const navigate = (dir: number) => {
    if (isAnimating) return
    
    setDirection(dir)
    setIsAnimating(true)
    
    setCurrentIndex((prev) => {
      if (dir === 1) {
        // Going right
        return (prev + 1) % totalCards
      } else {
        // Going left
        return prev === 0 ? totalCards - 1 : prev - 1
      }
    })

    setTimeout(() => setIsAnimating(false), 500)
  }

  // Get visible cards with wrapping
  const getVisibleCards = () => {
    const visible = []
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % totalCards
      visible.push({ ...allCards[index], displayIndex: index })
    }
    return visible
  }

  const visibleCards = getVisibleCards()

  // Smooth fade + scale animation variants (less dizzying)
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.92,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.92,
      rotateY: direction > 0 ? -15 : 15,
    }),
  }

  return (
    <section className="py-16 px-4 relative glow-pink-left overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading 
          eyebrow="Division"
          title="Meet Our Division" 
          subtitle="From strategy to execution, these teams keep the lab running, growing, and innovating."
        />

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => navigate(-1)}
            disabled={isAnimating}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-2xl flex items-center justify-center text-white hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => navigate(1)}
            disabled={isAnimating}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-2xl flex items-center justify-center text-white hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {visibleCards.map((card, idx) => (
                <motion.div
                  key={`${card.id}-${currentIndex}-${idx}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 200, damping: 25 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                    rotateY: { type: "spring", stiffness: 200, damping: 25 },
                  }}
                  style={{ perspective: 1000 }}
                  className="w-full"
                >
                  {/* Division Card */}
                  <div className="group relative h-full bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/80 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] min-h-[400px] flex flex-col">
                      {/* Gradient Accent Top */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[card.displayIndex % gradients.length]} rounded-t-3xl`} />
                      
                      {/* Gradient Glow on Hover */}
                      <div className={`absolute -inset-0.5 bg-gradient-to-br ${gradients[card.displayIndex % gradients.length]} rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500 -z-10`} />
                      
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        {/* Number Badge - No Hover Animation */}
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[card.displayIndex % gradients.length]} flex items-center justify-center shadow-lg`}>
                          <span className="text-2xl font-black text-white">
                            {String(card.displayIndex + 1).padStart(2, '0')}
                          </span>
                        </div>
                        
                        {/* Member Badge - No Hover Animation */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span className="text-sm font-bold text-gray-900">
                            <Counter to={card.members} />
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                        {card.description}
                      </p>

                      {/* Image */}
                      <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 h-36 group-hover:border-primary/30 transition-colors duration-300 mt-auto">
                        <Image
                          src={card.image}
                          alt={card.title}
                          width={1200}
                          height={800}
                          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                    </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {allCards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-primary to-accent-green'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-6 text-sm text-gray-500"
          >
            <span className="inline-flex items-center gap-2">
              <motion.span
                animate={{ x: [-3, 0, -3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ←
              </motion.span>
              Navigate through divisions
              <motion.span
                animate={{ x: [3, 0, 3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
