'use client'

import Image from 'next/image'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { highlights } from '@/lib/data'
import SectionHeading from './SectionHeading'
import WaveShape from './WaveShape'
import { useState } from 'react'

export default function Highlights() {
  return (
    <section className="py-20 px-4 relative glow-blue-right overflow-hidden">
      <WaveShape position="top" color="rgba(16, 185, 129, 0.03)" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading 
          eyebrow="Highlight Events"
          title="Latest Highlight, Real Impact" 
          subtitle="Catch up on our recent events—where innovation, collaboration, and creativity came to life."
        />

        {/* Asymmetric Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
          {/* First Card - Large Featured (spans 7 columns, 2 rows) */}
          {highlights[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:col-span-7 md:row-span-2"
            >
              <HighlightCard 
                highlight={highlights[0]} 
                variant="large-featured"
                index={0}
              />
            </motion.div>
          )}

          {/* Second Card - Medium Vertical (spans 5 columns, 2 rows) */}
          {highlights[1] && (
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:col-span-5 md:row-span-2"
            >
              <HighlightCard 
                highlight={highlights[1]} 
                variant="medium-vertical"
                index={1}
              />
            </motion.div>
          )}

          {/* Third Card - Medium Horizontal (spans 8 columns) */}
          {highlights[2] && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:col-span-8"
            >
              <HighlightCard 
                highlight={highlights[2]} 
                variant="medium-horizontal"
                index={2}
              />
            </motion.div>
          )}

          {/* More Events Card - Small CTA (spans 4 columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:col-span-4"
          >
            <MoreEventsCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Highlight Card Component with 3D Tilt Effect
function HighlightCard({ 
  highlight, 
  variant, 
  index 
}: { 
  highlight: any
  variant: 'large-featured' | 'medium-vertical' | 'medium-horizontal'
  index: number 
}) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const gradients = [
    'from-purple-500/20 via-blue-500/20 to-transparent',
    'from-pink-500/20 via-rose-500/20 to-transparent',
    'from-emerald-500/20 via-teal-500/20 to-transparent',
  ]

  const accentColors = [
    'bg-purple-500',
    'bg-pink-500',
    'bg-emerald-500',
  ]

  return (
    <motion.div
      className="group relative h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX: isHovered ? rotateX : 0, 
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{ scale: 1.02, z: 50 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient Glow on Hover */}
      <div className={`absolute -inset-2 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Card Surface */}
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 h-full">
        {/* Accent Color Strip */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${accentColors[index % accentColors.length]}`} />
        
        {/* Image Section */}
        <div className={`relative overflow-hidden ${
          variant === 'large-featured' ? 'h-64 md:h-80' : 
          variant === 'medium-vertical' ? 'h-56' : 
          'h-40'
        }`}>
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={highlight.image}
              alt={highlight.title}
              width={1200}
              height={800}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-4"
          >
            <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-gray-900 shadow-lg">
              {highlight.category}
            </span>
          </motion.div>
          
          {/* Index Number - Large Watermark */}
          <div className="absolute bottom-4 right-4 text-6xl md:text-7xl font-black text-white/20">
            0{index + 1}
          </div>
        </div>
        
        {/* Content Section */}
        <div className={`p-6 ${variant === 'large-featured' ? 'md:p-8' : ''}`}>
          <p className={`text-gray-600 leading-relaxed ${
            variant === 'large-featured' ? 'text-base' : 'text-sm'
          } ${variant === 'medium-horizontal' ? 'line-clamp-2' : 'line-clamp-3'}`}>
            {highlight.description}
          </p>
          
          {/* CTA Button */}
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-4 flex items-center gap-2 text-sm font-bold transition-colors duration-300 ${accentColors[index % accentColors.length].replace('bg-', 'text-')}`}
          >
            <span>Read Full Story</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </motion.div>
  )
}

// More Events Card Component
function MoreEventsCard() {
  return (
    <motion.div
      className="group relative h-full min-h-[200px]"
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated Rainbow Border */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl opacity-60 group-hover:opacity-100 blur transition-all duration-500 animate-pulse" />
      
      {/* Card Content */}
      <div className="relative bg-gradient-to-br from-primary via-purple-600 to-accent-green rounded-3xl p-8 h-full flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10">
          {/* Sparkle Icon */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 mb-4"
          >
            <div className="text-4xl">✨</div>
          </motion.div>
          
          {/* Text Content */}
          <h3 className="text-2xl font-black text-white mb-2">
            More Events
          </h3>
          <p className="text-white/80 text-sm">
            Discover all the amazing moments from our journey.
          </p>
        </div>
        
        {/* Arrow Button */}
        <motion.div
          whileHover={{ scale: 1.1, x: 3, y: -3 }}
          className="relative z-10 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-lg self-end cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}
