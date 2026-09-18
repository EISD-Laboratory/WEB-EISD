'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, IdCard, User } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { lookupSelectionResult } from '@/lib/selectionCrypto'
import { SELECTION_NAME_STORAGE_KEY, SELECTION_NIM_STORAGE_KEY } from '@/lib/selectionSession'

export default function SelectionCheck() {
  const router = useRouter()
  const [nim, setNim] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return

    const trimmedNim = nim.trim()
    const trimmedName = name.trim()
    if (!trimmedNim) {
      setError('NIM cannot be empty')
      return
    }
    if (!trimmedName) {
      setError('Full name cannot be empty')
      return
    }

    setError(null)
    setLoading(true)
    try {
      // Decrypts the static-encrypted blob locally; throws a generic error
      // for unknown NIM and wrong name alike (no oracle).
      await lookupSelectionResult(trimmedNim, trimmedName)
      sessionStorage.setItem(SELECTION_NIM_STORAGE_KEY, trimmedNim)
      sessionStorage.setItem(SELECTION_NAME_STORAGE_KEY, trimmedName)
      router.push('/selection-result')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors ${
      hasError ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20'
    }`

  return (
    <section id="selection-check" className="py-12 px-4 relative overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Announcement"
          title="Check Selection Result"
          subtitle="Enter your NIM and full name (as registered) to check your selection result for the lab assistant recruitment."
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

              <div className="relative">
                <IdCard strokeWidth={1.8} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="nim"
                  name="nim"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="e.g. 1301223456"
                  value={nim}
                  disabled={loading}
                  onChange={(e) => {
                    setNim(e.target.value.replace(/\D/g, ''))
                    if (error) setError(null)
                  }}
                  className={inputClass(!!error)}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'nim-error' : undefined}
                />
              </div>

              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User strokeWidth={1.8} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. John Doe"
                  value={name}
                  disabled={loading}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (error) setError(null)
                  }}
                  className={inputClass(!!error)}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'nim-error' : undefined}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Search strokeWidth={1.8} className="w-4 h-4" />
                {loading ? 'Searching...' : 'Search'}
              </button>

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
