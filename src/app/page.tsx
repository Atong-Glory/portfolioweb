'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { MotionConfig } from 'framer-motion'
import { LanguageProvider, useI18n } from '@/components/portfolio/language-provider'
import { Navbar } from '@/components/portfolio/navbar'
import { Hero } from '@/components/portfolio/hero'
import { About } from '@/components/portfolio/about'
import { Services } from '@/components/portfolio/services'
import { Skills } from '@/components/portfolio/skills'
import { Projects } from '@/components/portfolio/projects'
import { Testimonials } from '@/components/portfolio/testimonials'
import { Contact } from '@/components/portfolio/contact'
import { Footer } from '@/components/portfolio/footer'

function SkipLink() {
  const { t } = useI18n()
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-gradient-to-r focus:from-amber-500 focus:to-orange-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-[0_8px_28px_rgba(249,115,22,0.45)]"
    >
      {t.nav.skipToContent}
    </a>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-[0_8px_28px_rgba(249,115,22,0.45)] transition-all duration-300 hover:scale-110 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <div className="df-root min-h-screen bg-base font-sans text-body flex flex-col">
          <Navbar />
          <main id="main" className="flex-1">
            <Hero />
            <About />
            <Services />
            <Skills />
            <Projects />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </div>
      </MotionConfig>
    </LanguageProvider>
  )
}
