'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { highlights } from '@/lib/data'
import SectionHeading from './SectionHeading'
import WaveShape from './WaveShape'

export default function Highlights() {
  return (
    <section className="py-20 px-4 relative glow-blue-right overflow-hidden">
      <WaveShape position="top" color="rgba(16, 185, 129, 0.03)" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading 
          eyebrow="Highlight Events"
          title="Latest Highlight, Real Impact" 
          subtitle="Catch up on our recent events—where innovation, collaboration, and creativity came to life."
        />

        {/* Layout match Homepage.png: 2 cards top, 1 bottom-left, 1 bottom-right (More Events) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {highlights.slice(0, 3).map((h, index) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
              className="h-full"
            >
              <div className="group card-surface rounded-2xl p-5 md:p-6 card-hover h-full min-h-[180px]">
                <div className="grid grid-cols-[44%_56%] gap-5 items-center h-full">
                  <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 h-28 md:h-32">
                    <Image
                      src={h.image}
                      alt={h.title}
                      width={900}
                      height={600}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary">{h.category}</p>
                    <p className="mt-2 text-xs text-gray-600 leading-relaxed line-clamp-3">{h.description}</p>
                    <div className="mt-4 flex justify-end">
                      <button className="text-xs font-semibold text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
                        See More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* More Events (bottom-right) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 3 * 0.06, ease: 'easeOut' }}
            className="h-full"
          >
            <div className="group card-surface rounded-2xl p-5 md:p-6 card-hover h-full min-h-[180px] relative">
              {/* tiny accent dot like screenshot */}
              <span className="absolute top-6 left-20 w-2.5 h-2.5 rounded-full bg-yellow-300" />
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <Image src="/images/logo.png" alt="More" width={26} height={26} className="opacity-80" />
                </div>
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-soft flex items-center justify-center text-gray-700 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg">
                  ↗
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary">More Events</p>
                <p className="mt-1 text-xs text-gray-600">Dive deeper into our journey.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
