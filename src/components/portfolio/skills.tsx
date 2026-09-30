'use client'

import { motion } from 'framer-motion'
import { Crown, Microscope, BookOpen, MessagesSquare, HeartHandshake, Plus } from 'lucide-react'
import { Reveal, SectionHeader } from './shared'
import { TECH_ICONS } from './tech-icons'
import { useI18n } from './language-provider'

const TECHS = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript',
  'Docker', 'Figma', 'Lightroom', 'Photoshop', 'Illustrator',
  'Supabase', 'Git', 'Math', 'More',
]

const SOFT_ICONS = [Crown, Microscope, BookOpen, MessagesSquare, HeartHandshake] as const

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

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: progress bars */}
          <div className="space-y-6">
            {t.skills.bars.map(({ name, level }, i) => (
              <Reveal key={name} delay={i * 0.07}>
                <div>
                  <div className="mb-2.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-body">{name}</span>
                    <span className="font-semibold text-orange-400">{level}%</span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full bg-wash"
                    role="progressbar"
                    aria-valuenow={level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={t.skills.proficiencyAria(name)}
                  >
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 shadow-[0_0_12px_rgba(249,115,22,0.5)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 1.2, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right: tech grid */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {TECHS.map((tech) => {
                const Icon = TECH_ICONS[tech]
                return (
                  <div
                    key={tech}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-edge bg-panel px-2 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/35 hover:bg-panel-hover"
                    title={tech}
                  >
                    {Icon ? (
                      <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                    ) : null}
                    <span className="text-center text-[11px] font-medium leading-tight text-soft transition-colors group-hover:text-body">
                      {tech}
                    </span>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>

        {/* Real (not "soft") skills */}
        <Reveal delay={0.05}>
          <div className="mt-12 rounded-2xl border border-edge bg-panel p-6 sm:p-8">
            <h3 className="text-center font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              <s className="mr-2 font-medium text-faint" aria-label="Soft">{t.skills.soft.strike}</s>
              {t.skills.soft.real}
            </h3>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {t.skills.soft.items.map((label, i) => {
                const Icon = SOFT_ICONS[i % SOFT_ICONS.length]
                return (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-edge-strong bg-wash px-4 py-2 text-xs font-semibold uppercase tracking-wider text-body transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/45 hover:text-orange-400"
                  >
                    <Icon className="h-4 w-4 text-orange-400" aria-hidden="true" />
                    {label}
                  </span>
                )
              })}
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-orange-500/45 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
                <Plus className="h-4 w-4" aria-hidden="true" />
                {t.skills.soft.more}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
