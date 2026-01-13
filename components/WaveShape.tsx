'use client'

import { motion } from 'framer-motion'

interface WaveShapeProps {
  position?: 'top' | 'bottom'
  color?: string
}

export default function WaveShape({ position = 'bottom', color = 'rgba(109, 94, 246, 0.05)' }: WaveShapeProps) {
  const isTop = position === 'top'

  return (
    <div className={`absolute left-0 w-full ${isTop ? 'top-0 -translate-y-full' : 'bottom-0 translate-y-full'} overflow-hidden`}>
      <motion.svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.path
          d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
          fill={color}
          animate={{
            d: [
              "M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z",
              "M0 10L60 16.7C120 23 240 37 360 40C480 43 600 37 720 36.7C840 37 960 43 1080 43.3C1200 43 1320 37 1380 33.3L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V10Z",
              "M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.svg>
    </div>
  )
}

