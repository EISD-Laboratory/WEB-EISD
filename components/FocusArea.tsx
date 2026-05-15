'use client'

import { BrainCircuit, Code2, Palette, Rocket, type LucideIcon } from 'lucide-react'
import SectionHeading from './SectionHeading'

type FocusAreaItem = {
  id: number
  title: string
  description: string
  icon: LucideIcon
  accent: string
  gradient: string
}

const focusAreas: FocusAreaItem[] = [
  {
    id: 1,
    title: 'Software Development',
    description: 'Building scalable applications and innovative software solutions for real-world problems.',
    icon: Code2,
    accent: 'text-primary bg-primary/10 border-primary/15',
    gradient: 'from-primary via-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'UI / UX Design',
    description: 'Creating beautiful and intuitive user experiences with modern design principles.',
    icon: Palette,
    accent: 'text-primary bg-primary/10 border-primary/15',
    gradient: 'from-primary via-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Intelligence System',
    description: 'Exploring AI, machine learning, and Internet of Things for smart solutions.',
    icon: BrainCircuit,
    accent: 'text-primary bg-primary/10 border-primary/15',
    gradient: 'from-accent-green via-teal-500 to-cyan-500',
  },
  {
    id: 4,
    title: 'Technopreneurship',
    description: 'Developing entrepreneurial mindset and building tech-based startups.',
    icon: Rocket,
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
  const Icon = item.icon

  return (
    <div className="rounded-2xl border border-primary/15 ring-1 ring-primary/5 bg-white shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className={`h-1 w-full shrink-0 bg-gradient-to-r ${item.gradient}`} />

      <div className="flex flex-col items-center text-center p-7 flex-grow">
        <div className={`rounded-2xl border flex items-center justify-center mb-4 w-16 h-16 shrink-0 ${item.accent}`}>
          <Icon className="w-8 h-8" strokeWidth={1.8} />
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
