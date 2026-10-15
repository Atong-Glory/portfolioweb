'use client'

import { Github, Linkedin, Twitter, Mail, Heart, Coffee } from 'lucide-react'
import { useI18n } from './language-provider'

const SOCIALS = [
  { href: 'https://github.com/atongglory', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/atongglory', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://x.com/atongglory', label: 'Twitter', Icon: Twitter },
  { href: 'mailto:atongglory17@gmail.com', label: 'Email', Icon: Mail },
]

export function Footer() {
  const { t } = useI18n()

  const QUICK_LINKS = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#projects', label: t.nav.projects },
  ]

  return (
    <footer className="mt-auto border-t border-edge bg-deep">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                <span className="font-display text-xs font-extrabold tracking-tight text-[#0a0e17]" aria-hidden="true">AG</span>
              </span>
              <span className="font-display text-lg font-bold tracking-wide text-ink">
                ATONG <span className="text-orange-500">GLORY</span>
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
