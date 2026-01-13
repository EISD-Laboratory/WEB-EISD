'use client'

import { motion } from 'framer-motion'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle, eyebrow = 'Our Lab' }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-6 mb-4">
        <motion.div 
          className="hidden md:block hairline w-24"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
        <motion.div 
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft border border-white/40 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm text-gray-700 relative z-10">{eyebrow}</span>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />
        </motion.div>
        <motion.div 
          className="hidden md:block hairline w-24"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
      </div>

      <motion.h2 
        className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p 
          className="mt-2 text-gray-600 text-sm md:text-base max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

