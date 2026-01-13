'use client'

import { motion } from 'framer-motion'
import FloatingParticles from './FloatingParticles'
import ScrollIndicator from './ScrollIndicator'
import HeroBackground from './HeroBackground'

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <HeroBackground />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge with Shimmer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 glass-card px-5 py-2.5 rounded-full shadow-soft mb-6 shimmer-enhanced"
        >
          <div className="w-2 h-2 bg-primary rounded-full pulse-subtle"></div>
          <span className="text-sm text-gray-700 font-medium">Laboratory Profile</span>
        </motion.div>

        {/* Title with Gradient & Glow */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          <span className="text-gradient">Enterprise Intelligence</span><br />
          <span className="text-gradient">System</span>{' '}
          <motion.span 
            className="text-accent-green text-glow-green font-extrabold inline-block"
            animate={{ 
              textShadow: [
                '0 0 10px rgba(16, 185, 129, 0.6)',
                '0 0 20px rgba(16, 185, 129, 0.8)',
                '0 0 10px rgba(16, 185, 129, 0.6)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Development
          </motion.span><br />
          <span className="text-gradient">Laboratory</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-gray-700 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Welcome to the Lab EISD of STMIK Mardira Padang Academy of Technology. 
          We focus on <span className="font-semibold text-primary">IoT</span>, <span className="font-semibold text-primary">Software Development</span>, <span className="font-semibold text-primary">UI/UX Design</span>, <span className="font-semibold text-primary">Artificial Intelligence</span>, 
          and <span className="font-semibold text-primary">Digital Innovation</span> to create real impact.
        </motion.p>

        {/* CTA Buttons with Glow & Ripple */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button 
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-semibold transition-all glow-primary relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              ✨ Discover More
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ scale: 0, opacity: 1 }}
              whileHover={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
          
          <motion.button 
            className="glass-card border-2 border-primary/50 text-primary hover:bg-primary hover:text-white hover:border-primary px-8 py-3.5 rounded-full font-semibold transition-all shadow-gradient-purple relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              🚀 Open Recruitment
            </span>
            <motion.div
              className="absolute inset-0 bg-primary/10"
              initial={{ scale: 0, opacity: 1 }}
              whileHover={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </motion.div>
      </div>
      
      <ScrollIndicator />
    </section>
  )
}
