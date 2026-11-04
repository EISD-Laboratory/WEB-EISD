'use client'

import { useEffect, useRef, type PointerEvent } from 'react'
import Image from 'next/image'
import styles from './EventDetail.module.css'

const SPEED = 40 // px per second
const RESUME_DELAY = 2000 // ms after a swipe, so momentum scrolling can finish first

export default function EventGallery({ images, title }: { images: string[]; title: string }) {
  const scroller = useRef<HTMLDivElement>(null)
  const held = useRef(false)
  const dragX = useRef<number | null>(null)
  const resumeAt = useRef(0)
  const loops = images.length > 1

  useEffect(() => {
    const el = scroller.current
    if (!el || !loops) return
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let last = 0
    // scrollLeft may round to whole pixels, so the running position is kept here.
    let position = el.scrollLeft

    const tick = (now: number) => {
      const [first, repeat] = [el.children[0], el.children[images.length]] as HTMLElement[]
      const period = repeat.offsetLeft - first.offsetLeft
      const auto = !reducedMotion && !held.current && dragX.current === null && now >= resumeAt.current
      position = auto ? position + (SPEED * Math.min(now - last, 50)) / 1000 : el.scrollLeft

      // The second set is a copy of the first, so jumping one period is invisible.
      let wrapped = true
      if (position > period) position -= period
      else if (!auto && position <= 0) position += period
      else wrapped = false

      if (auto || wrapped) el.scrollLeft = position
      last = now
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [images.length, loops])

  // Touch swipes use native scrolling; only the mouse needs dragging by hand.
  const startDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    dragX.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const drag = (e: PointerEvent<HTMLDivElement>) => {
    if (dragX.current === null) return
    e.currentTarget.scrollLeft -= e.clientX - dragX.current
    dragX.current = e.clientX
  }

  const endDrag = () => {
    dragX.current = null
  }

  const pauseAfterTouch = () => {
    resumeAt.current = performance.now() + RESUME_DELAY
  }

  const renderImage = (src: string, idx: number, copy: boolean) => (
    <div
      key={`${copy ? 'copy' : 'img'}-${idx}`}
      aria-hidden={copy || undefined}
      className={`${styles.galleryItem} rounded-xl overflow-hidden relative`}
    >
      <Image
        src={src}
        alt={copy ? '' : `${title} photo ${idx + 1}`}
        fill
        sizes="(max-width: 768px) 80vw, 400px"
        className="object-cover"
        draggable={false}
      />
    </div>
  )

  return (
    <div
      ref={scroller}
      role="region"
      aria-label={`${title} gallery`}
      tabIndex={0}
      className={`${styles.gallery} flex gap-4 w-full`}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') held.current = true }}
      onPointerLeave={() => { held.current = false }}
      onPointerDown={startDrag}
      onPointerMove={drag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onTouchStart={pauseAfterTouch}
      onTouchMove={pauseAfterTouch}
      onTouchEnd={pauseAfterTouch}
      onFocus={() => { held.current = true }}
      onBlur={() => { held.current = false }}
    >
      {images.map((src, idx) => renderImage(src, idx, false))}
      {loops && images.map((src, idx) => renderImage(src, idx, true))}
    </div>
  )
}
