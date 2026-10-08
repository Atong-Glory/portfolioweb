'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { ReactIcon, NodeIcon, TypeScriptIcon, MongoDBIcon } from './tech-icons'
import { useI18n } from './language-provider'

function useTypingEffect(words: string[], typeSpeed = 75, deleteSpeed = 40, pause = 1800) {
  const [state, setState] = useState({ text: '', wordIndex: 0, deleting: false })
  const { text, wordIndex, deleting } = state

  useEffect(() => {
    const word = words[wordIndex % words.length]

    // Finished typing → pause, then start deleting
    if (!deleting && text === word) {
      const t = setTimeout(() => setState((s) => ({ ...s, deleting: true })), pause)
      return () => clearTimeout(t)
    }

    // Fully deleted → advance to next word
    if (deleting && text === '') {
      const t = setTimeout(
        () => setState((s) => ({ ...s, deleting: false, wordIndex: (s.wordIndex + 1) % words.length })),
        350
      )
      return () => clearTimeout(t)
    }

    // Type / delete one character
    const t = setTimeout(
      () =>
        setState((s) => {
          const w = words[s.wordIndex % words.length]
          return { ...s, text: w.slice(0, s.text.length + (s.deleting ? -1 : 1)) }
        }),
      deleting ? deleteSpeed : typeSpeed
    )
    return () => clearTimeout(t)
  }, [text, wordIndex, deleting, words, typeSpeed, deleteSpeed, pause])

  return text
}

/* Isolated so a language switch remounts it (key={lang}) and restarts the cycle */
function TypingLine({ words }: { words: string[] }) {
  const typed = useTypingEffect(words)
  return (
    <p className="font-display mt-4 flex min-h-[2.2rem] items-center text-xl font-medium text-body sm:text-2xl">
      <span>{typed}</span>
      <span className="rt-caret ml-1 inline-block h-6 w-[2px] bg-orange-500" aria-hidden="true" />
    </p>
  )
}

const SOCIALS = [
  { href: 'https://github.com/atongglory', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/atongglory', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://x.com/atongglory', label: 'Twitter', Icon: Twitter },
  { href: 'mailto:atongglory17@gmail.com', label: 'Email', Icon: Mail },
]

const BADGES = [
  { name: 'React.js', Icon: ReactIcon, className: 'right-2 top-10 sm:right-8 rt-float' },
  { name: 'Node.js', Icon: NodeIcon, className: 'left-0 top-[36%] rt-float-delay-1' },
  { name: 'TypeScript', Icon: TypeScriptIcon, className: 'left-2 bottom-[16%] rt-float-delay-2' },
  { name: 'MongoDB', Icon: MongoDBIcon, className: 'right-3 bottom-[4%] rt-float-delay-3' },
]

export function Hero() {
  const { t, lang } = useI18n()

  return (
    <section id="home" className="relative overflow-hidden bg-base">
      {/* Decorative background: blueprint grid + glow orbs */}
      <div className="rt-grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 right-[-120px] h-[320px] w-[420px] rounded-full bg-orange-600/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-36 sm:pt-40 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-44">
        {/* -------- Left: intro -------- */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-orange-500" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">
              {t.hero.greeting}
            </span>
          </div>

          <h1 className="font-display mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl xl:text-7xl">
            Atong{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Glory
            </span>
          </h1>

          <TypingLine key={lang} words={t.hero.roles} />

          <p className="mt-5 max-w-lg leading-relaxed text-soft">
            {t.hero.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_32px_rgba(249,115,22,0.4)] transition-all duration-300 hover:shadow-[0_8px_44px_rgba(249,115,22,0.6)] hover:brightness-110"
            >
              <Briefcase className="h-4 w-4" aria-hidden="true" />
              {t.hero.hireMe}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-orange-400 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10"
            >
              {t.hero.viewMyWork}
            </a>
          </div>

          {/* Availability */}
          <div className="mt-7 flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-wider text-body">
            <span className="relative flex h-2.5 w-2.5">
              <span className="rt-ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {t.hero.available}
          </div>

          {/* Socials */}
          <div className="mt-5 flex items-center gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge-strong bg-wash text-body transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* -------- Right: portrait in glowing ring + floating badges -------- */}
        <motion.div
          className="relative mx-auto w-full max-w-[420px] lg:max-w-[480px]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Glow + rings */}
          <div
            className="rt-glow-pulse absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/25 blur-[90px]"
            aria-hidden="true"
          />
          <div
            className="absolute left-1/2 top-1/2 h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/15"
            aria-hidden="true"
          />
          <div
            className="rt-spin-slow absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-orange-500/25"
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]" />
          </div>

          {/* Portrait */}
          <div className="relative aspect-square overflow-hidden rounded-full border-2 border-orange-500/40 bg-surface shadow-[0_0_80px_rgba(249,115,22,0.25)]">
            <img
              src="/images/hero-portrait.png"
              alt={t.hero.portraitAlt}
              className="h-full w-full scale-110 object-cover object-top"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Floating tech badges */}
          {BADGES.map(({ name, Icon, className }) => (
            <div
              key={name}
              className={`absolute z-10 flex items-center gap-2 rounded-xl border border-edge-strong bg-panel/90 px-3.5 py-2.5 shadow-lg shadow-black/40 backdrop-blur-md ${className}`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-semibold text-body">{name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
