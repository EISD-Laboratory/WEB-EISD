'use client'

import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import WaveShape from './WaveShape'
import { useState } from 'react'

export default function FocusArea() {
  // Active index: 2 means Card 03 (AI/IoT) is in center
  const [activeIndex, setActiveIndex] = useState(2)

  const items = [
    {
      id: 1,
      title: 'Software Development',
      description: 'Build modern web apps with best practices.',
      icon: '💻',
      gradient: 'from-purple-500 to-blue-500',
    },
    {
      id: 2,
      title: 'UI / UX Design',
      description: 'Design intuitive digital experiences.',
      icon: '🎨',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      id: 3,
      title: 'AI / IoT',
      description: 'Smart systems that automate tasks.',
      icon: '🤖',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      id: 4,
      title: 'Technopreneurship',
      description: 'Turn ideas into real products.',
      icon: '🚀',
      gradient: 'from-amber-500 to-orange-500',
    },
  ]

  // Calculate position for each card relative to active card
  const getCardPosition = (index: number) => {
    const diff = index - activeIndex
    
    // Normalize diff to handle wrapping (-2, -1, 0, 1)
    let normalizedDiff = diff
    if (diff > 2) normalizedDiff = diff - 4
    if (diff < -2) normalizedDiff = diff + 4
    
    switch (normalizedDiff) {
      case 1: // Card above (peek)
        return { y: -160, scale: 0.95, opacity: 0.7, zIndex: 2, visible: true }
      case 0: // Active card (center)
        return { y: 0, scale: 1, opacity: 1, zIndex: 3, visible: true }
      case -1: // Card below (peek)
        return { y: 160, scale: 0.95, opacity: 0.7, zIndex: 2, visible: true }
      default: // Hidden card
        return { y: 300, scale: 0.9, opacity: 0, zIndex: 1, visible: false }
    }
  }

  const handleRotate = () => {
    setActiveIndex((prev) => (prev + 1) % 4)
  }

  return (
    <section className="py-16 px-4 relative glow-blue-left overflow-hidden">
      <WaveShape position="bottom" color="rgba(109, 94, 246, 0.03)" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading 
          eyebrow="Explore"
          title="Our Focus Area" 
          subtitle="Code, Create, Launch, Learn."
        />

        {/* New Horizontal Layout */}
        <div className="flex items-center justify-center gap-16 mt-12 px-4 md:px-8">
          
          {/* Left: Focus Circle */}
          <div className="flex-shrink-0">
            <div
              className="cursor-pointer"
              onClick={handleRotate}
            >
              <div className="relative w-36 h-36">
                {/* Static Border */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30" />
                
                {/* Subtle Static Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 to-accent-green/15 blur-lg" />
                
                {/* Main Circle */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary via-purple-600 to-accent-green flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="text-4xl mb-1">
                      ⚡
                    </div>
                    <h3 className="text-white font-black text-sm">FOCUS</h3>
                    <p className="text-white/70 text-xs">Click to rotate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stacked Cards */}
          <div className="flex-1 relative" style={{ height: '500px', maxWidth: '700px' }}>
            <div className="relative h-full flex items-center justify-center">
              {items.map((item, index) => {
                const position = getCardPosition(index)
                
                return (
                  <motion.div
                    key={item.id}
                    className="absolute w-full"
                    initial={false}
                    animate={{
                      y: position.y,
                      scale: position.scale,
                      opacity: position.opacity,
                      zIndex: position.zIndex,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 25,
                      mass: 1,
                    }}
                  >
                    {/* Card Container */}
                    <div className="relative px-4">
                      {/* Gradient Glow */}
                      <div className={`absolute -inset-2 bg-gradient-to-r ${item.gradient} rounded-3xl opacity-0 ${index === activeIndex ? 'opacity-25' : ''} blur-xl transition-opacity duration-500`} />
                      
                      {/* Main Card */}
                      <div className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 ${
                        index === activeIndex 
                          ? 'border-primary/40 shadow-2xl' 
                          : 'border-white/60'
                      }`}>
                        
                        <div className="flex items-center gap-6">
                          {/* Icon Section */}
                          <div className={`flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                            <span className="text-5xl">{item.icon}</span>
                          </div>

                          {/* Content Section */}
                          <div className="flex-1">
                            {/* Number Badge */}
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 mb-3 shadow-md">
                              <span className="text-white text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>
                            </div>

                            {/* Title */}
                            <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                              index === activeIndex ? 'text-primary' : 'text-gray-900'
                            }`}>
                              {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Gradient Bar */}
                        <div className={`mt-5 h-1 bg-gradient-to-r ${item.gradient} rounded-full`} />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Hint Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span>⭮</span>
            Click the focus circle to rotate areas
          </p>
        </motion.div>
      </div>
    </section>
  )
}
