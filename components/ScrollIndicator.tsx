'use client'

import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="text-xs text-gray-600 font-medium">Scroll</span>
      <motion.div
        className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-1.5"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="w-1.5 h-1.5 bg-gray-600 rounded-full"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  )
}

