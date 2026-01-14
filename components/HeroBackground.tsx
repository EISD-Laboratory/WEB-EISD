'use client'

import { motion } from 'framer-motion'

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Purple Orb - Top Right */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(109, 94, 246, 0.35) 0%, rgba(109, 94, 246, 0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
          top: '5%',
          right: '-5%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary Green Orb - Bottom Left */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.06) 40%, transparent 70%)',
          filter: 'blur(50px)',
          bottom: '10%',
          left: '0%',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Accent Pink Orb - Center */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 207, 232, 0.25) 0%, rgba(251, 207, 232, 0.04) 40%, transparent 70%)',
          filter: 'blur(45px)',
          top: '45%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        animate={{
          x: [-30, 30, -30],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(109, 94, 246, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(109, 94, 246, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Diagonal Corner Pattern - Top Right (More Visible) */}
      <div 
        className="absolute top-0 right-0 w-full h-full"
        style={{
          background: `
            linear-gradient(135deg, transparent 0%, transparent 55%, rgba(199, 210, 254, 0.7) 80%, rgba(167, 139, 250, 0.6) 100%),
            repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(109, 94, 246, 0.08) 10px, rgba(109, 94, 246, 0.08) 20px)
          `,
          clipPath: 'polygon(60% 0%, 100% 0%, 100% 50%)',
        }}
      />

      {/* Diagonal Corner Pattern - Bottom Left (More Visible) */}
      <div 
        className="absolute bottom-0 left-0 w-full h-full"
        style={{
          background: `
            linear-gradient(-45deg, transparent 0%, transparent 55%, rgba(191, 219, 254, 0.7) 80%, rgba(165, 180, 252, 0.6) 100%),
            repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(59, 130, 246, 0.08) 10px, rgba(59, 130, 246, 0.08) 20px)
          `,
          clipPath: 'polygon(0% 50%, 0% 100%, 40% 100%)',
        }}
      />

      {/* Ultra Smooth Bottom Transition - Extended Height */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-96"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.15) 15%, rgba(255, 255, 255, 0.35) 30%, rgba(255, 255, 255, 0.55) 45%, rgba(255, 255, 255, 0.75) 60%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0.98) 90%, rgb(255, 255, 255) 100%)',
        }}
      />

      {/* Layered Wave Transition for Complete Seamlessness */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10">
        {/* Bottom solid wave */}
        <svg 
          className="w-full h-32" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,60 C360,80 720,80 1080,60 C1200,50 1320,50 1440,60 L1440,120 L0,120 Z"
            fill="rgb(255, 255, 255)"
            animate={{ 
              d: [
                "M0,60 C360,80 720,80 1080,60 C1200,50 1320,50 1440,60 L1440,120 L0,120 Z",
                "M0,55 C360,75 720,75 1080,55 C1200,45 1320,45 1440,55 L1440,120 L0,120 Z",
                "M0,60 C360,80 720,80 1080,60 C1200,50 1320,50 1440,60 L1440,120 L0,120 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
        
        {/* Top semi-transparent wave for extra smoothness */}
        <svg 
          className="w-full h-24 absolute bottom-20" 
          viewBox="0 0 1440 100" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,40 C360,60 720,60 1080,40 C1200,30 1320,30 1440,40 L1440,100 L0,100 Z"
            fill="rgba(255, 255, 255, 0.6)"
            animate={{ 
              d: [
                "M0,40 C360,60 720,60 1080,40 C1200,30 1320,30 1440,40 L1440,100 L0,100 Z",
                "M0,45 C360,65 720,65 1080,45 C1200,35 1320,35 1440,45 L1440,100 L0,100 Z",
                "M0,40 C360,60 720,60 1080,40 C1200,30 1320,30 1440,40 L1440,100 L0,100 Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
    </div>
  )
}

