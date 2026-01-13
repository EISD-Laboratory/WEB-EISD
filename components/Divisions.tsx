'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { divisions } from '@/lib/data'
import SectionHeading from './SectionHeading'
import Counter from './Counter'

export default function Divisions() {
  return (
    <section className="py-20 px-4 relative glow-pink-left">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading 
          eyebrow="Division"
          title="Meet Our Division" 
          subtitle="From strategy to execution, these teams keep the lab running, growing, and innovating."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {divisions.map((division, index) => (
            <motion.div
              key={division.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
              className="h-full"
            >
              <div className="group card-surface rounded-2xl p-5 md:p-6 card-hover h-full min-h-[340px]">
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white border border-gray-100 shadow-soft flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                    <svg className="w-5 h-5 text-primary transition-colors duration-300 group-hover:text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 8a3 3 0 10-6 0m6 0a3 3 0 01-6 0m6 0l3 2m-9-2L9 10m6 6a3 3 0 10-6 0m6 0a3 3 0 01-6 0m6 0l3-2m-9 2l-3-2"
                      />
                    </svg>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-primary bg-primary/10 px-3 py-1 rounded-full font-semibold transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      <Counter to={division.members} /> Member
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-soft flex items-center justify-center text-gray-700 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg">
                      ↗
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-bold text-gray-900">{division.title}</h3>
                  <p className="mt-1 text-xs text-gray-600 leading-relaxed">{division.description}</p>
                </div>

                {/* inset image like Homepage.png */}
                <div className="mt-4 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 h-40 md:h-44">
                  <Image
                    src={division.image}
                    alt={division.title}
                    width={1200}
                    height={800}
                    className="w-full h-full object-contain p-6"
                  />
                </div>
              </div>
            </motion.div>
          ))}

          {/* See Our Lab Team (small white card like Homepage.png) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: divisions.length * 0.06, ease: 'easeOut' }}
            className="h-full"
          >
            <div className="group card-surface rounded-2xl p-5 md:p-6 card-hover h-full min-h-[340px] flex flex-col">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <Image src="/images/logo.png" alt="Lab" width={28} height={28} className="opacity-80" />
                </div>
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-soft flex items-center justify-center text-gray-700 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <Image src="/images/logo.png" alt="Lab team" width={44} height={44} className="opacity-90" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">See Our Lab Team</h3>
                  <p className="mt-1 text-xs text-gray-600">A journey to explore.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
