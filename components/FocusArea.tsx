'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import WaveShape from './WaveShape'

export default function FocusArea() {
  // Match Homepage.png: 2 wide cards (with image) + 2 compact cards
  const items = [
    {
      id: 1,
      title: 'Software Development',
      description:
        'Learn to build modern web apps using current frameworks, best practices, and scalable architecture.',
      variant: 'wide-left' as const,
      image: '/images/logo.png',
    },
    {
      id: 2,
      title: 'UI / UX Design',
      description:
        'Design with users in mind—exploring personas, journeys, and intuitive digital experiences.',
      variant: 'compact' as const,
    },
    {
      id: 3,
      title: 'Artificial Intelligence / IoT',
      description: 'Explore smart systems that sense, learn, and automate real-world tasks.',
      variant: 'compact' as const,
    },
    {
      id: 4,
      title: 'Technopreneurship',
      description:
        'Turn tech ideas into real products through innovation, strategy, and entrepreneurial mindset.',
      variant: 'wide-right' as const,
      image: '/images/logo.png',
    },
  ]

  const TopIcons = () => (
    <div className="flex items-start justify-between">
      <div className="w-11 h-11 rounded-xl bg-white border border-gray-100 shadow-soft flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
        {/* share-ish icon */}
        <svg className="w-5 h-5 text-primary transition-colors duration-300 group-hover:text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 8a3 3 0 10-6 0m6 0a3 3 0 01-6 0m6 0l3 2m-9-2L9 10m6 6a3 3 0 10-6 0m6 0a3 3 0 01-6 0m6 0l3-2m-9 2l-3-2"
          />
        </svg>
      </div>
      <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-soft flex items-center justify-center text-gray-700 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg">
        ↗
      </div>
    </div>
  )

  return (
    <section className="py-20 px-4 relative glow-blue-left overflow-hidden">
      <WaveShape position="bottom" color="rgba(109, 94, 246, 0.03)" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading 
          eyebrow="Explore"
          title="Our Focus Area" 
          subtitle="Code, Create, Launch, Learn."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
              className="h-full"
            >
              {/* Compact card */}
              {item.variant === 'compact' && (
                <div className="group card-surface rounded-2xl p-6 card-hover h-full min-h-[230px]">
                  <TopIcons />
                  <h3 className="mt-5 text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              )}

              {/* Wide-left card */}
              {item.variant === 'wide-left' && (
                <div className="group card-surface rounded-2xl overflow-hidden card-hover h-full min-h-[230px]">
                  <div className="grid grid-cols-[44%_56%] h-full">
                    <div className="p-4">
                      <div className="h-32 md:h-36 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                        <Image
                          src={item.image!}
                          alt={item.title}
                          width={900}
                          height={600}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <TopIcons />
                      <h3 className="mt-5 text-lg font-bold text-gray-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Wide-right card */}
              {item.variant === 'wide-right' && (
                <div className="group card-surface rounded-2xl overflow-hidden card-hover h-full min-h-[230px]">
                  <div className="grid grid-cols-[56%_44%] h-full">
                    <div className="p-6">
                      <TopIcons />
                      <h3 className="mt-5 text-lg font-bold text-gray-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="p-4">
                      <div className="h-32 md:h-36 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                        <Image
                          src={item.image!}
                          alt={item.title}
                          width={900}
                          height={600}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
