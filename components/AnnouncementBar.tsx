'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { announcementConfig } from '@/lib/data'

export default function AnnouncementBar() {
    const [visible, setVisible] = useState(false)
    const [animatingOut, setAnimatingOut] = useState(false)

    useEffect(() => {
        const dismissed = sessionStorage.getItem(announcementConfig.storageKey)
        if (!dismissed) {
            setVisible(true)
        }
    }, [])

    const handleDismiss = () => {
        setAnimatingOut(true)
        setTimeout(() => {
            setVisible(false)
            sessionStorage.setItem(announcementConfig.storageKey, 'true')
        }, 300)
    }

    if (!visible && !animatingOut) return null

    return (
        <div
            role="banner"
            className={`
        relative w-full overflow-hidden border-b border-white/10 shrink-0
        transition-all duration-300 ease-in-out
        ${animatingOut ? 'opacity-0 max-h-0' : 'opacity-100 max-h-[200px]'}
        `}
            style={{ background: '#494ca0' }}
        >
            <div className="absolute left-0 top-0 h-full w-1" style={{ background: '#00d97a' }} />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between py-2.5 sm:py-3 gap-3">

                <div className="flex items-start sm:items-center gap-3 flex-1">
                    <span className="relative flex h-2.5 w-2.5 shrink-0 mt-1 sm:mt-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#00d97a' }}></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: '#00d97a' }}></span>
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-white/90 leading-snug">
                        <span className="font-bold hidden sm:inline-block mr-2" style={{ color: '#00d97a' }}>{announcementConfig.highlightText}</span>
                        <span className="sm:hidden font-bold mr-1" style={{ color: '#00d97a' }}>EISD:</span>
                        {announcementConfig.message}
                    </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <Link
                        href={announcementConfig.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 sm:py-1 text-[11px] sm:text-xs font-bold transition-all duration-300 border border-white/20 bg-white/10 hover:scale-105 active:scale-95"
                        style={{ color: '#00d97a' }}
                    >
                        <span className="hidden sm:inline">{announcementConfig.ctaLabel.replace(' →', '')}</span>
                        <span className="sm:hidden tracking-wide">Gabung</span>
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                            <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <div className="w-[1px] h-4 bg-white/20 hidden sm:block"></div>
                    <button onClick={handleDismiss} aria-label="Tutup pengumuman" className="rounded-full p-1.5 text-white/60 transition-all hover:bg-white/10 hover:text-white flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    )
}