'use client'

import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CounterProps {
  from?: number
  to: number
  duration?: number
}

export default function Counter({ from = 0, to, duration = 2 }: CounterProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, Math.round)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration, ease: "easeOut" })
    }
  }, [inView, to, count, duration])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

