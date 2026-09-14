'use client'

import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

interface EnvelopeProps {
  status: 'Passed' | 'Failed'
}

export default function Envelope({ status }: EnvelopeProps) {
  const [flapOpen, setFlapOpen] = useState(false)
  const [letterOut, setLetterOut] = useState(false)
  const isPassed = status === 'Passed'

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFlapOpen(true)
      setLetterOut(true)
      return
    }

    const flapTimer = setTimeout(() => {
      setFlapOpen(true)

      if (status === 'Passed') {
        setTimeout(() => {
          confetti({
            particleCount: 110,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#00d97a', '#00e681', '#494ca0', '#FFC53D', '#ffffff'],
          })
        }, 350)
      }
    }, 600)

    const letterTimer = setTimeout(() => setLetterOut(true), 1150)

    return () => {
      clearTimeout(flapTimer)
      clearTimeout(letterTimer)
    }
  }, [status])

  return (
    <div className="flex justify-center px-4 pt-12 pb-4">
      <div className="relative" style={{ perspective: '1200px' }}>
        <div
          className={`relative h-28 w-48 rounded-b-2xl sm:h-32 sm:w-52 ${
            isPassed ? 'bg-accent-green' : 'bg-gray-200'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 16px 32px -16px rgba(100, 116, 139, 0.4)',
          }}
        >
          {/* Mouth interior — full-bleed so no corner notches, fades in as the flap lifts */}
          <div
            aria-hidden
            className={`absolute inset-x-0 top-0 h-6 rounded-t-sm transition-opacity duration-500 ${
              isPassed ? 'bg-[#007a46]' : 'bg-gray-400'
            }`}
            style={{ opacity: flapOpen ? 1 : 0 }}
          />

          {/* Letter — white card, label pinned to top, slides up out of the envelope */}
          <div
            aria-hidden
            className="absolute bottom-1 left-1/2 flex h-[85%] w-[76%] flex-col items-center overflow-hidden rounded-lg bg-white px-3"
            style={{
              paddingTop: 8,
              opacity: letterOut ? 1 : 0,
              transform: letterOut
                ? 'translateX(-50%) translateY(-68px) scale(1)'
                : 'translateX(-50%) translateY(4px) scale(0.94)',
              transition: 'transform 1.4s cubic-bezier(0.23, 1, 0.32, 1) 0.15s, opacity 0.5s ease-out',
              zIndex: 20,
              boxShadow: '0 8px 20px -8px rgba(15, 23, 42, 0.18), 0 1px 3px rgba(15, 23, 42, 0.08)',
            }}
          >
            <div
              className={`whitespace-nowrap text-[10px] font-extrabold uppercase ${
                isPassed ? 'text-primary' : 'text-gray-400'
              }`}
              style={{ letterSpacing: '0.18em' }}
            >
              {isPassed ? 'Passed' : 'Notice'}
            </div>
            <div
              className={`mt-1.5 h-[3px] w-10 rounded-full ${isPassed ? 'bg-accent-green/60' : 'bg-gray-200'}`}
            />
            <div className="mt-2.5 h-1.5 w-[45%] self-start rounded-full bg-gray-200" />
            <div className="mt-1.5 h-1.5 w-[60%] self-start rounded-full bg-gray-100" />
            <div className="mt-1.5 h-1.5 w-[52%] self-start rounded-full bg-gray-100" />
          </div>

          {/* Left pocket — slightly deeper shade for the 3D fold */}
          <div className="absolute bottom-0 h-full w-full" style={{ zIndex: 30 }}>
            <div
              className={`h-full w-full rounded-b-2xl ${isPassed ? 'bg-[#00c26f]' : 'bg-gray-300'}`}
              style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
            />
          </div>

          {/* Right pocket — lightest, catches the light */}
          <div className="absolute bottom-0 h-full w-full" style={{ zIndex: 30 }}>
            <div
              className={`h-full w-full rounded-b-2xl ${isPassed ? 'bg-[#00dd80]' : 'bg-gray-200'}`}
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
            />
          </div>

          {/* Top flap — auto-opens once, then swings behind the pockets to disappear */}
          <div
            aria-hidden
            className="absolute top-0 h-1/2 w-full origin-top"
            style={{
              zIndex: flapOpen ? 10 : 40,
              transform: flapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              transition: 'transform 0.7s cubic-bezier(0.77, 0, 0.175, 1)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className={`h-full w-full ${isPassed ? 'bg-[#00a85e]' : 'bg-gray-400'}`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0 0)',
                boxShadow: flapOpen ? 'none' : '0 6px 12px -6px rgba(0, 168, 94, 0.45)',
              }}
            />
            {isPassed && !flapOpen && (
              <div
                className="absolute inset-0 bg-white/10"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0 0)' }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
