'use client'

import { User, Mail, MapPin, Download } from 'lucide-react'
import { Reveal, SectionHeader } from './shared'
import { useI18n } from './language-provider'
import { SITE_EMAIL } from '@/lib/site'

export function About() {
  const { t } = useI18n()

  const INFO = [
    { Icon: User, label: t.about.info.name, value: t.about.info.nameValue },
    { Icon: Mail, label: t.about.info.email, value: SITE_EMAIL },
    { Icon: MapPin, label: t.about.info.location, value: t.about.info.locationValue },
  ]

  return (
    <section id="about" className="relative bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          label={t.about.label}
          align="left"
          title={t.about.title}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: story + stats */}
          <div>
            <Reveal>
              <p className="leading-relaxed text-soft">
                {t.about.paragraphs[0]}
              </p>
              <p className="mt-4 leading-relaxed text-soft">
                {t.about.paragraphs[1]}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href="/Atong-Glory-Resume.pdf"
                download
                className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-orange-500/40 px-6 py-3 text-[13px] font-bold uppercase tracking-wider text-orange-400 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10"
              >
                {t.about.downloadResume}
                <Download className="h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          {/* Right: info card + signature */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-2xl border border-edge bg-panel p-8 sm:p-10">
              {/* Decorative map-ish dots */}
              <div className="rt-noise absolute inset-0 opacity-60" aria-hidden="true" />
              <div
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative space-y-5">
                {INFO.map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-orange-500/25 bg-orange-500/10 text-orange-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-faint">
                        {label}
                      </div>
                      <div className="text-[15px] font-semibold text-ink">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mt-10 border-t border-edge pt-6">
                <p className="font-script bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-5xl text-transparent">
                  Atong Glory
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
