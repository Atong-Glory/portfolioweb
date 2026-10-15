'use client'

import { Reveal, SectionHeader } from './shared'
import { TECH_ICONS } from './tech-icons'
import { useI18n } from './language-provider'

export function Skills() {
  const { t } = useI18n()

  return (
    <section id="skills" className="relative bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          label={t.skills.label}
          align="left"
          title={t.skills.title}
        />

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-soft">{t.skills.intro}</p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.skills.groups.map(({ title, items }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <article className="h-full rounded-2xl border border-edge bg-panel p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {items.map((tech) => {
                    const Icon = TECH_ICONS[tech]
                    return (
                      <li
                        key={tech}
                        className="inline-flex items-center gap-2 rounded-lg border border-edge-strong bg-wash px-3 py-2 text-sm font-medium text-body"
                      >
                        {Icon ? <Icon className="h-5 w-5" /> : null}
                        {tech}
                      </li>
                    )
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
