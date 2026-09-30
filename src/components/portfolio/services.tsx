'use client'

import { Code2, MonitorSmartphone, PenTool, Palette, ArrowRight } from 'lucide-react'
import { Reveal, SectionHeader } from './shared'
import { useI18n } from './language-provider'

const SERVICE_ICONS = [Code2, MonitorSmartphone, PenTool, Palette]

export function Services() {
  const { t } = useI18n()

  return (
    <section id="services" className="relative bg-base">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          label={t.services.label}
          title={t.services.title}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {t.services.items.map(({ title, description }, i) => {
            const Icon = SERVICE_ICONS[i]
            return (
            <Reveal key={title} delay={i * 0.1} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-panel p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-[0_16px_48px_rgba(249,115,22,0.12)]">
                {/* Hover glow */}
                <div
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-500/0 blur-2xl transition-all duration-500 group-hover:bg-orange-500/15"
                  aria-hidden="true"
                />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-orange-500/25 bg-gradient-to-br from-orange-500/15 to-transparent text-orange-400 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(249,115,22,0.35)]">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="font-display relative mt-5 text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-soft">
                  {description}
                </p>
                <a
                  href="#contact"
                  className="relative mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-orange-400 transition-colors hover:text-amber-400"
                  aria-label={t.services.learnMoreAria(title)}
                >
                  {t.services.learnMore}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </article>
            </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
