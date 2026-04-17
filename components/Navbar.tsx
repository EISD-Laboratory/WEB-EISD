'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '@/lib/data'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`w-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white/20 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 relative">
            <Image src="/images/logo.png" alt="EISD Logo" fill className="object-contain" />
          </div>
          <span className={`font-bold text-sm hidden sm:inline transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-gray-800'}`}>
            EISD Laboratory
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'))
            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : '_self'}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`relative text-sm font-medium transition-all duration-300 pb-1 ${isActive ? 'text-primary' : scrolled ? 'text-gray-600 hover:text-primary' : 'text-gray-700 hover:text-primary'}`}
              >
                {item.label}
                <span className={`absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
              </Link>
            )
          })}
        </div>

        <Link href="/contact" className="hidden md:inline-flex bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200">
          Contact
        </Link>

        <button
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span className="block w-5 h-0.5 bg-gray-700 rounded-full" animate={mobileOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
          <motion.span className="block w-5 h-0.5 bg-gray-700 rounded-full mt-1" animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
          <motion.span className="block w-5 h-0.5 bg-gray-700 rounded-full mt-1" animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 px-3 py-2.5 rounded-lg transition-all duration-200">
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/contact" className="block text-center bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}