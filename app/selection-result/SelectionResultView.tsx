'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { SearchX, ArrowLeft, MessageCircle } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import Envelope from '@/components/Envelope'
import {
  lookupSelectionResult,
  SELECTION_GENERIC_ERROR,
  type SelectionResult,
} from '@/lib/selectionCrypto'
import { SELECTION_NIM_STORAGE_KEY } from '@/lib/selectionSession'

function JoinGroupButton({ link }: { link: string }) {
  const className = "inline-flex items-center gap-3 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-base sm:text-lg pl-2 pr-6 py-2 shadow-card transition-colors duration-300"
  const icon = (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
      <MessageCircle strokeWidth={1.8} className="w-5 h-5" />
    </span>
  )

  if (!link || link === '#') {
    return (
      <button type="button" onClick={() => toast('Coming Soon')} className={className}>
        {icon}
        Join Group
      </button>
    )
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
      {icon}
      Join Group
    </a>
  )
}

type ViewState =
  | { status: 'checking' }
  | { status: 'no-params' }
  | { status: 'loading' }
  | { status: 'not-found' }
  | { status: 'found'; result: SelectionResult }

export default function SelectionResultView() {
  const [view, setView] = useState<ViewState>({ status: 'checking' })

  // `html { scroll-behavior: smooth }` (globals.css) is meant for the Hero's
  // in-page jump to #selection-check, but it also hijacks Next's router
  // scroll-to-top on navigation here, so the page can visibly stop mid-scroll
  // while this view's content height is still settling. Force an instant jump
  // to the top on mount, bypassing the CSS smooth-scroll for just this landing.
  useLayoutEffect(() => {
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    root.style.scrollBehavior = previousScrollBehavior
  }, [])

  // Read the NIM from sessionStorage instead of the URL, so a
  // shared/bookmarked /selection-result link can't leak someone else's
  // selection result. sessionStorage doesn't exist during the static build,
  // so this can only run post-mount. The record is decrypted locally from
  // the static-encrypted blob — unknown NIMs land on 'not-found'.
  useEffect(() => {
    let cancelled = false
    const nim = sessionStorage.getItem(SELECTION_NIM_STORAGE_KEY)?.trim() ?? ''
    if (!nim) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setView({ status: 'no-params' })
      return
    }
    setView({ status: 'loading' })
    lookupSelectionResult(nim).then(
      (result) => {
        if (!cancelled) setView({ status: 'found', result })
      },
      () => {
        if (!cancelled) setView({ status: 'not-found' })
      },
    )
    return () => {
      cancelled = true
    }
  }, [])

  const result = view.status === 'found' ? view.result : undefined

  return (
    <section className="pt-16 px-4">
      <div className="max-w-3xl w-full mx-auto">
        <FadeIn direction="up" delay={0.1}>
          <div className="card-surface rounded-3xl p-6 sm:p-10 text-center">
            {view.status === 'checking' || view.status === 'loading' ? (
              <div className="py-10 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
              </div>
            ) : view.status === 'no-params' || view.status === 'not-found' ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 text-gray-500 flex items-center justify-center mx-auto mb-5">
                  <SearchX strokeWidth={1.8} className="w-8 h-8" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Result Not Found</h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {view.status === 'not-found'
                    ? SELECTION_GENERIC_ERROR
                    : 'No search parameters provided. Please enter your NIM from the home page and try again.'}
                </p>
              </>
            ) : result && result.passed ? (
              <>
                <Envelope status="Passed" />
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Welcome On Board!</h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Dear <span className="font-semibold text-gray-900">{result.name}</span>{' '}
                  <span className="text-gray-400">({result.nim})</span>,
                </p>
                <p className="mt-2 text-base sm:text-lg text-gray-600 leading-relaxed">
                  We are pleased to inform you that you have been selected as a Lab Practicum
                  Assistant and Lab Assistant for{' '}
                  {result.courses.map((course: string, i: number) => (
                    <span key={course}>
                      {i > 0 && (i === result.courses.length - 1 ? ' and ' : ', ')}
                      <span className="font-semibold text-primary">{course}</span>
                    </span>
                  ))}
                  .
                </p>

                <div className="mt-6 flex justify-center">
                  <JoinGroupButton link={result.wa} />
                </div>
              </>
            ) : result ? (
              <>
                <Envelope status="Failed" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Thank You for Your Participation</h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Dear <span className="font-semibold text-gray-900">{result.name}</span>{' '}
                  <span className="text-gray-400">({result.nim})</span>,
                </p>
                <p className="mt-2 text-base sm:text-lg text-gray-600 leading-relaxed">
                  Unfortunately, you were not selected this time. Don&apos;t give up, there will
                  be another opportunity next time.
                </p>
              </>
            ) : null}

            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 text-base sm:text-lg font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft strokeWidth={1.8} className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
