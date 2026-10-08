'use client'

import { createContext, useContext, useCallback, useEffect, useSyncExternalStore } from 'react'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'
import { dictionaries, type Dictionary, type Lang } from '@/lib/i18n'

type I18nContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dictionary
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = 'rt-lang'
const LANG_EVENT = 'rt-lang-change'

/* ---------- Language preference as an external store (localStorage) ----------
 * useSyncExternalStore keeps this lint-clean and hydration-safe:
 * - Server & first client render use "en" (getServerSnapshot)
 * - The persisted choice is picked up right after hydration
 * - Cross-tab changes sync via the native "storage" event
 * -------------------------------------------------------------------------- */
function subscribe(callback: () => void) {
  window.addEventListener(LANG_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(LANG_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

function getSnapshot(): Lang {
  return window.localStorage.getItem(STORAGE_KEY) === 'fr' ? 'fr' : 'en'
}

function getServerSnapshot(): Lang {
  return 'en'
}

function useLang(): [Lang, (lang: Lang) => void] {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setLang = useCallback((next: Lang) => {
    window.localStorage.setItem(STORAGE_KEY, next)
    window.dispatchEvent(new Event(LANG_EVENT))
  }, [])

  return [lang, setLang]
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useLang()

  // Keep <html lang> in sync with the active language
  useEffect(() => {
    document.documentElement.lang = lang
    // Belt & braces: also set it imperatively on the single React-owned title node
    document.title = dictionaries[lang].meta.title
  }, [lang])

  const value: I18nContextValue = { lang, setLang, t: dictionaries[lang] }

  return (
    <I18nContext.Provider value={value}>
      {/* React 19 hoists this <title> into <head> and keeps it in sync —
          immune to Next.js metadata re-asserting after hydration */}
      <title>{dictionaries[lang].meta.title}</title>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>')
  return ctx
}

/* ---------- EN | FR pill toggle (navbar) ---------- */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useI18n()

  return (
    <div
      role="group"
      aria-label="Language / Langue"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-edge-strong bg-wash p-1',
        className
      )}
    >
      <Languages className="ml-1.5 mr-0.5 h-3.5 w-3.5 text-orange-400" aria-hidden="true" />
      {(['en', 'fr'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={code === 'en' ? 'English' : 'Français'}
          className={cn(
            'rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-all duration-300',
            lang === code
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-[0_0_16px_rgba(249,115,22,0.45)]'
              : 'text-soft hover:text-ink'
          )}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
