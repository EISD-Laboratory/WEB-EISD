'use client'

import SectionHeading from './SectionHeading'

export default function FocusArea() {
  const items = [
    {
      id: 1,
      title: 'Software Development',
      description: 'Building scalable applications and innovative software solutions for real-world problems.',
      icon: '💻',
    },
    {
      id: 2,
      title: 'UI / UX Design',
      description: 'Creating beautiful and intuitive user experiences with modern design principles.',
      icon: '🎨',
    },
    {
      id: 3,
      title: 'Intelligence System',
      description: 'Exploring AI, machine learning, and Internet of Things for smart solutions.',
      icon: '🤖',
    },
    {
      id: 4,
      title: 'Technopreneurship',
      description: 'Developing entrepreneurial mindset and building tech-based startups.',
      icon: '🚀',
    },
  ]

  const iconGradient = 'from-primary via-purple-600 to-accent-green'

  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading 
          eyebrow="Explore"
          title="Our Focus Area" 
          subtitle="Code, Create, Launch, Learn."
        />

        {/* Grid Layout */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-3xl border-2 border-primary/25 bg-white shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className={`h-1.5 bg-gradient-to-r ${iconGradient}`} />

              <div className="flex flex-col items-center text-center p-7">
                <div className={`rounded-2xl bg-gradient-to-br ${iconGradient} flex items-center justify-center shadow-lg mb-4 w-20 h-20`}>
                  <span className="text-4xl">{item.icon}</span>
                </div>

                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-900 mb-2 shadow-md">
                  <span className="text-white text-[10px] font-bold">{String(index + 1).padStart(2, '0')}</span>
                </div>

                <h3 className="font-bold mb-2 text-primary text-xl">{item.title}</h3>

                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </div>

              <div className={`h-1 bg-gradient-to-r ${iconGradient}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
