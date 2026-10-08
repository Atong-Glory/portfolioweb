'use client'

import { useEffect, useState } from 'react'
import { Github, Linkedin, Twitter, Mail, Eye, Heart, Coffee } from 'lucide-react'
import { useI18n } from './language-provider'

const SOCIALS = [
  { href: 'https://github.com/atongglory', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/atongglory', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://x.com/atongglory', label: 'Twitter', Icon: Twitter },
  { href: 'mailto:atongglory17@gmail.com', label: 'Email', Icon: Mail },
]

export function Footer() {
  const { t } = useI18n()
  const [views, setViews] = useState<number | null>(null)

  const QUICK_LINKS = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#projects', label: t.nav.projects },
  ]

  // Live visitor counter — counts this visit once per session (stored in SQLite)
  useEffect(() => {
    const counted = sessionStorage.getItem('rt-counted')
    const url = counted ? '/api/stats' : '/api/stats?count=1'
    fetch(url)
      .then((r) => r.json() as Promise<any>)
      .then((d) => {
        if (d.success) {
          setViews(d.views)
          sessionStorage.setItem('rt-counted', '1')
        }
      })
      .catch(() => {})
  }, [])

  return (
    <footer className="mt-auto border-t border-edge bg-deep">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0a0e17" aria-hidden="true">
                  <path d="M6 4h6.5c4.7 0 7.5 3.2 7.5 8s-2.8 8-7.5 8H6V4zm4.8 4.3v7.4h1.6c2.1 0 3.2-1.7 3.2-3.7s-1.1-3.7-3.2-3.7h-1.6z" />
                </svg>
              </span>
              <span className="font-display text-lg font-bold tracking-wide text-ink">
                RHIZORA <span className="text-orange-500">TECH</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              {t.footer.description}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink">{t.footer.quickLinks}</h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-sm text-soft transition-colors hover:text-orange-400">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink">{t.footer.services}</h3>
            <ul className="mt-4 space-y-2.5">
              {t.services.items.map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-sm text-soft transition-colors hover:text-orange-400">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink">{t.footer.followMe}</h3>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge-strong bg-wash text-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/50 hover:text-orange-400"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              ))}
            </div>
            {views !== null && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-edge-strong bg-wash px-3.5 py-1.5 text-xs text-soft">
                <Eye className="h-3.5 w-3.5 text-orange-400" aria-hidden="true" />
                <span>
                  {t.footer.visitorPrefixLabel}{' '}
                  <span className="font-bold text-orange-400">#{views.toLocaleString()}</span>
                  {t.footer.visitorSuffix}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-edge pt-6 text-xs text-faint sm:flex-row">
          <p>{t.footer.rights(new Date().getFullYear())}</p>
          <p className="inline-flex items-center gap-1.5">
            {t.footer.builtWith}
            <Heart className="h-3.5 w-3.5 fill-orange-500 text-orange-500" aria-hidden="true" />
            {t.footer.builtWithMiddle}
            <Coffee className="h-3.5 w-3.5 text-orange-400" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  )
}
