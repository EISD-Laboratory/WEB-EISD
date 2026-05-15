'use client'

import Image from 'next/image'
import SectionHeading from './SectionHeading'

type FocusAreaItem = {
  id: number
  title: string
  description: string
  image: string
  accent: string
  gradient: string
}

const focusAreas: FocusAreaItem[] = [
  {
    id: 1,
    title: 'Software Development',
    description: 'Building end-to-end web applications, from frontend and backend logic to deployment.',
    image: '/images/imgfocusarea/softdev.webp',
    accent: 'text-primary bg-primary/10 border-primary/15',
    gradient: 'from-primary via-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'Turning user problems into intuitive digital solutions through research, design, and testing.',
    image: '/images/imgfocusarea/uiux.webp',
    accent: 'text-primary bg-primary/10 border-primary/15',
    gradient: 'from-primary via-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Intelligence System',
    description: 'Designing and building IoT-based solutions from sensor data to web and business integration.',
    image: '/images/imgfocusarea/is.webp',
    accent: 'text-primary bg-primary/10 border-primary/15',
    gradient: 'from-accent-green via-teal-500 to-cyan-500',
  },
  {
    id: 4,
    title: 'Technopreneur',
    description: 'Validating ideas and turning them into viable digital products through strategy and execution.',
    image: '/images/imgfocusarea/techno.webp',
    accent: 'text-primary bg-primary/10 border-primary/15',
    gradient: 'from-accent-green via-emerald-500 to-primary',
  },
]

export default function FocusArea() {
  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Explore"
          title="Our Focus Area"
          subtitle="Code, Create, Launch, Learn."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
          {focusAreas.map((item, index) => (
            <FocusAreaCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FocusAreaCard({ item, index }: { item: FocusAreaItem; index: number }) {
  return (
    <div className="rounded-2xl border border-primary/15 ring-1 ring-primary/5 bg-white shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className={`h-1 w-full shrink-0 bg-gradient-to-r ${item.gradient}`} />

      <div className="flex flex-col items-center text-center p-7 flex-grow">
        <div className={`rounded-2xl border flex items-center justify-center mb-4 w-16 h-16 shrink-0 ${item.accent}`}>
          <div className="relative h-10 w-10">
            <Image
              src={item.image}
              alt={`${item.title} illustration`}
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
        </div>

        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 mb-2 shrink-0">
          <span className="text-gray-500 text-[10px] font-bold">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <h3 className="font-bold mb-2 text-primary text-xl">{item.title}</h3>

        <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
      </div>

      <div className="h-px w-full mt-auto shrink-0 bg-primary/10" />
    </div>
  )
}
