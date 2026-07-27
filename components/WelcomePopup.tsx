'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { welcomePopupConfig } from '@/lib/data'

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false)
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    if (!welcomePopupConfig.enabled) return
    if (new Date() > new Date(`${welcomePopupConfig.activeUntil}T23:59:59`)) return
    const dismissed = sessionStorage.getItem(welcomePopupConfig.storageKey)
    if (!dismissed) setVisible(true)
  }, [])

  const handleDismiss = () => {
    setVisible(false)
    setZoomed(false)
    sessionStorage.setItem(welcomePopupConfig.storageKey, 'true')
  }

  const handleBackdropClick = () => {
    if (zoomed) {
      setZoomed(false)
      return
    }
    handleDismiss()
  }

  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleDismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Welcome"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={handleBackdropClick}
        >
          <motion.div
            layout
            className={`relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-[4/5] ${
              zoomed ? 'w-[min(95vw,52rem,88vh)]' : 'w-[min(90vw,28rem,68vh)]'
            }`}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={welcomePopupConfig.image}
              alt={welcomePopupConfig.imageAlt}
              fill
              priority
              onClick={(e) => {
                e.stopPropagation()
                setZoomed((z) => !z)
              }}
              className={`object-cover ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            />

            {!zoomed && (
              <button
                onClick={handleDismiss}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm p-2 text-white transition-colors duration-300"
              >
                <X className="w-5 h-5" strokeWidth={1.8} />
              </button>
            )}

            {!zoomed && (
              <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-16 sm:p-6 sm:pt-20">
                <Link
                  href={welcomePopupConfig.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white shadow-lg transition-colors duration-300 hover:bg-primary-dark"
                >
                  {welcomePopupConfig.ctaLabel}
                  <ExternalLink className="w-4 h-4" strokeWidth={1.8} />
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
