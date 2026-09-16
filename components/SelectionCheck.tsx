'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, IdCard } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { findSelectionResult } from '@/lib/selectionResults'
import { SELECTION_NIM_STORAGE_KEY } from '@/lib/selectionSession'

export default function SelectionCheck() {
  const router = useRouter()
  const [nim, setNim] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmed = nim.trim()
    if (!trimmed) {
      setError('NIM cannot be empty')
      return
    }

    if (!findSelectionResult(trimmed)) {
      setError(`No selection result found for NIM "${trimmed}"`)
      return
    }

    setError(null)
    sessionStorage.setItem(SELECTION_NIM_STORAGE_KEY, trimmed)
    router.push('/selection-result')
  }

  return (
    <section id="selection-check" className="py-12 px-4 relative overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Announcement"
          title="Check Selection Result"
          subtitle="Enter your NIM to check your selection result for the lab assistant recruitment."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <div className="card-surface rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="nim" className="block text-sm font-medium text-gray-700 mb-2">
                Student ID Number (NIM)
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <IdCard strokeWidth={1.8} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="nim"
                    name="nim"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="e.g. 1301223456"
                    value={nim}
                    onChange={(e) => {
                      setNim(e.target.value.replace(/\D/g, ''))
                      if (error) setError(null)
                    }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                      error
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-primary/20'
                    }`}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'nim-error' : undefined}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors duration-300 shrink-0"
                >
                  <Search strokeWidth={1.8} className="w-4 h-4" />
                  Search
                </button>
              </div>

              {error && (
                <p id="nim-error" className="mt-2 text-xs text-red-500">
                  {error}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
