'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Section header (label + heading), faithful to the reference ---------- */
export function SectionHeader({
  label,
  title,
  align = 'center',
}: {
  label: string
  title: React.ReactNode
  align?: 'left' | 'center'
}) {
  const centered = align === 'center'
  return (
    <Reveal className={centered ? 'text-center' : ''}>
      <div
        className={`flex items-center gap-3 ${centered ? 'justify-center' : 'justify-start'}`}
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-orange-500" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
          {label}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-orange-500" aria-hidden="true" />
      </div>
      <h2
        className={`font-display mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl`}
      >
        {title}
      </h2>
    </Reveal>
  )
}

/* ---------- Animated number counter (fires when scrolled into view) ---------- */
export function Counter({
  to,
  suffix = '',
  duration = 1.6,
  className,
}: {
  to: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
