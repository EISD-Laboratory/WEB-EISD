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

      {/* Diagonal Corner Overlay - Top Right (Darker Border) */}
      <div 
        className="absolute top-0 right-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, transparent 60%, rgba(199, 210, 254, 0.4) 85%, rgba(167, 139, 250, 0.3) 100%)',
          clipPath: 'polygon(60% 0%, 100% 0%, 100% 50%)',
        }}
      />

      {/* Diagonal Corner Overlay - Bottom Left (Darker Border) */}
      <div 
        className="absolute bottom-0 left-0 w-full h-full"
        style={{
          background: 'linear-gradient(-45deg, transparent 0%, transparent 60%, rgba(191, 219, 254, 0.35) 85%, rgba(165, 180, 252, 0.3) 100%)',
          clipPath: 'polygon(0% 50%, 0% 100%, 40% 100%)',
        }}
      />

      {/* Enhanced Smooth Bottom Transition - More Gradual */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(249, 250, 251, 0.1) 20%, rgba(249, 250, 251, 0.3) 40%, rgba(249, 250, 251, 0.6) 65%, rgba(249, 250, 251, 0.85) 85%, rgba(249, 250, 251, 1) 100%)',
        }}
      />

      {/* Subtle Animated Wave for Even Smoother Transition */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10">
        <svg 
          className="w-full h-20" 
          viewBox="0 0 1440 80" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,40 C360,60 720,60 1080,40 C1200,30 1320,30 1440,40 L1440,80 L0,80 Z"
            fill="rgba(249, 250, 251, 0.6)"
            animate={{ 
              d: [
                "M0,40 C360,60 720,60 1080,40 C1200,30 1320,30 1440,40 L1440,80 L0,80 Z",
                "M0,35 C360,55 720,55 1080,35 C1200,25 1320,25 1440,35 L1440,80 L0,80 Z",
                "M0,40 C360,60 720,60 1080,40 C1200,30 1320,30 1440,40 L1440,80 L0,80 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
    </div>
  )
}

