'use client'

import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useI18n, LanguageToggle } from './language-provider'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const { t } = useI18n()

  const LINKS = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects },
    { href: '#testimonials', label: t.nav.testimonials },
    { href: '#contact', label: t.nav.contact },
  ]
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  // Glass background after scrolling + reading progress bar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    LINKS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-edge bg-base/85 backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      {/* Reading progress */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 transition-transform duration-150"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden="true"
      />

      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 shadow-[0_0_24px_rgba(249,115,22,0.45)] transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0a0e17" aria-hidden="true">
              <path d="M6 4h6.5c4.7 0 7.5 3.2 7.5 8s-2.8 8-7.5 8H6V4zm4.8 4.3v7.4h1.6c2.1 0 3.2-1.7 3.2-3.7s-1.1-3.7-3.2-3.7h-1.6z" />
            </svg>
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-ink">
            DEV<span className="text-orange-500">FUSION</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-[13px] font-medium uppercase tracking-wider transition-colors duration-200',
                  active === href.slice(1)
                    ? 'text-orange-400'
                    : 'text-body hover:text-ink'
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Language + theme toggles — always visible */}
          <LanguageToggle />
          <ThemeToggle />

          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wider text-orange-400 transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:text-white hover:shadow-[0_0_28px_rgba(249,115,22,0.45)] sm:inline-flex"
          >
            {t.nav.letsTalk}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-edge-strong bg-wash text-ink lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-edge bg-base/95 backdrop-blur-xl lg:hidden">
          <ul className="space-y-1 px-5 py-4">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors',
                    active === href.slice(1)
                      ? 'bg-orange-500/10 text-orange-400'
                      : 'text-body hover:bg-wash hover:text-ink'
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
