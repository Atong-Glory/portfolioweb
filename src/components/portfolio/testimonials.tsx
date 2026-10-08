'use client'

import { useEffect, useRef, useState } from 'react'
import { Star, Quote } from 'lucide-react'
import { Reveal, SectionHeader } from './shared'
import { useI18n } from './language-provider'

type Testimonial = {
  id: string
  name: string
  role: string
  roleFr: string | null
  company: string
  quote: string
  quoteFr: string | null
  rating: number
  initials: string
  gradient: string
}

function Stars({ rating, ariaLabel }: { rating: number; ariaLabel: string }) {
  return (
    <div className="flex gap-1" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-orange-500 text-orange-500' : 'text-faint'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const { t, lang } = useI18n()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/testimonials')
      .then((res) => res.json() as Promise<any>)
      .then((data) => {
        if (cancelled) return
        setTestimonials(data.testimonials ?? [])
        setLoading(false)
      })
      .catch(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  // Sync dots with horizontal scroll (mobile carousel)
  const onScroll = () => {
    const el = rowRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const idx = max > 0 ? Math.round((el.scrollLeft / max) * (testimonials.length - 1)) : 0
    setPage(idx)
  }

  const scrollTo = (i: number) => {
    const el = rowRef.current
    if (!el) return
    const card = el.children[i] as HTMLElement | undefined
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <section id="testimonials" className="relative bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          label={t.testimonials.label}
          align="left"
          title={t.testimonials.title}
        />

        {loading ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-52 animate-pulse rounded-2xl border border-edge bg-panel" />
            ))}
          </div>
        ) : (
          <>
            {/* Desktop: grid / Mobile: snap carousel */}
            <div
              ref={rowRef}
              onScroll={onScroll}
              className="rt-snap-row mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-3"
            >
              {testimonials.map((item) => {
                const quote = lang === 'fr' ? item.quoteFr ?? item.quote : item.quote
                const role = lang === 'fr' ? item.roleFr ?? item.role : item.role
                return (
                <Reveal key={item.id} className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto">
                  <figure className="relative flex h-full flex-col rounded-2xl border border-edge bg-panel p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-[0_16px_48px_rgba(249,115,22,0.1)]">
                    <Quote
                      className="absolute right-6 top-6 h-8 w-8 text-orange-500/15"
                      aria-hidden="true"
                    />
                    <blockquote className="flex-1 text-sm leading-relaxed text-body">
                      &ldquo;{quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-edge pt-5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-sm font-bold text-white shadow-md`}
                          aria-hidden="true"
                        >
                          {item.initials}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-ink">{item.name}</div>
                          <div className="text-xs text-faint">
                            {role}, {item.company}
                          </div>
                        </div>
                      </div>
                      <Stars rating={item.rating} ariaLabel={t.testimonials.ratedAria(item.rating)} />
                    </figcaption>
                  </figure>
                </Reveal>
                )
              })}
            </div>

            {/* Carousel dots (mobile / tablet) */}
            <div className="mt-6 flex justify-center gap-2 md:hidden">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={t.testimonials.goToAria(i + 1)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    page === i ? 'w-6 bg-orange-500' : 'w-2 bg-edge-strong hover:bg-wash-strong'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
