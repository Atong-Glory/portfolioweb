'use client'

import { useCallback, useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, Loader2, CalendarDays } from 'lucide-react'
import { Reveal, SectionHeader } from './shared'
import { useI18n } from './language-provider'
import { TurnstileWidget } from './turnstile-widget'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { SITE_PHONE, SITE_PHONE_TEL, SITE_CAL_URL } from '@/lib/site'

type FormState = {
  name: string
  email: string
  projectType: string
  budgetRange: string
  message: string
}

const INITIAL: FormState = {
  name: '',
  email: '',
  projectType: '',
  budgetRange: '',
  message: '',
}

export function Contact() {
  const { t } = useI18n()
  const { toast } = useToast()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>(undefined)

  const handleTurnstileToken = useCallback((token: string | undefined) => {
    setTurnstileToken(token)
  }, [])

  const CONTACT_INFO = [
    {
      Icon: Mail,
      label: t.contact.info.email,
      value: 'atongglory17@gmail.com',
      href: 'mailto:atongglory17@gmail.com',
    },
    {
      Icon: Phone,
      label: t.contact.info.phone,
      value: SITE_PHONE,
      href: `tel:${SITE_PHONE_TEL}`,
    },
    {
      Icon: MapPin,
      label: t.contact.info.location,
      value: t.about.info.locationValue,
      href: undefined,
    },
    {
      Icon: Clock,
      label: t.contact.info.responseTime,
      value: t.contact.info.responseTimeValue,
      href: undefined,
    },
  ]

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (form.name.trim().length < 2) next.name = t.contact.validation.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t.contact.validation.email
    if (form.message.trim().length < 10) next.message = t.contact.validation.message
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
      })
      const data = (await res.json()) as any

      if (res.ok && data.success) {
        toast({
          title: t.contact.toast.sentTitle,
          description: t.contact.toast.sentDescription,
          variant: 'default',
        })
        setForm(INITIAL)
        setTurnstileToken(undefined)
      } else {
        // Surface server-side field errors if present
        if (data.errors) setErrors(data.errors)
        toast({
          title: t.contact.toast.errorTitle,
          description:
            (Object.values(data.errors ?? {})[0] as string) ??
            data.message ??
            t.contact.toast.fallbackDescription,
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: t.contact.toast.networkTitle,
        description: t.contact.toast.networkDescription,
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative bg-base">
      <div
        className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-orange-500/5 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          label={t.contact.label}
          align="left"
          title={t.contact.title}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          {/* Form */}
          <Reveal>
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-body">
                    {t.contact.form.yourName}
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder={t.contact.form.yourNamePlaceholder}
                    autoComplete="name"
                    className="h-12 border-edge-strong bg-panel text-ink placeholder:text-faint focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-body">
                    {t.contact.form.yourEmail}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder={t.contact.form.yourEmailPlaceholder}
                    autoComplete="email"
                    className="h-12 border-edge-strong bg-panel text-ink placeholder:text-faint focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-body">{t.contact.form.projectType}</Label>
                  <Select value={form.projectType} onValueChange={(v) => set('projectType', v)}>
                    <SelectTrigger className="h-12 border-edge-strong bg-panel text-ink data-[placeholder]:text-faint focus:ring-orange-500/50">
                      <SelectValue placeholder={t.contact.form.projectTypePlaceholder} />
                    </SelectTrigger>
                    <SelectContent className="border-edge-strong bg-panel text-ink">
                      {t.contact.projectTypes.map((type) => (
                        <SelectItem key={type} value={type} className="focus:bg-orange-500/15 focus:text-orange-300">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-body">{t.contact.form.budgetRange}</Label>
                  <Select value={form.budgetRange} onValueChange={(v) => set('budgetRange', v)}>
                    <SelectTrigger className="h-12 border-edge-strong bg-panel text-ink data-[placeholder]:text-faint focus:ring-orange-500/50">
                      <SelectValue placeholder={t.contact.form.budgetRangePlaceholder} />
                    </SelectTrigger>
                    <SelectContent className="border-edge-strong bg-panel text-ink">
                      {t.contact.budgets.map((budget) => (
                        <SelectItem key={budget} value={budget} className="focus:bg-orange-500/15 focus:text-orange-300">
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-body">
                  {t.contact.form.message}
                </Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder={t.contact.form.messagePlaceholder}
                  rows={5}
                  className="min-h-[130px] resize-none border-edge-strong bg-panel text-ink placeholder:text-faint focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
              </div>

              {/* Cloudflare Turnstile — renders only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set */}
              <TurnstileWidget onToken={handleTurnstileToken} />

              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_32px_rgba(249,115,22,0.4)] transition-all duration-300 hover:shadow-[0_8px_44px_rgba(249,115,22,0.6)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    {t.contact.form.sending}
                  </>
                ) : (
                  <>
                    {t.contact.form.send}
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </Reveal>

          {/* Contact info sidebar */}
          <Reveal delay={0.15}>
            <div className="space-y-4">
              {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-xl border border-edge bg-panel p-4 transition-colors duration-300 hover:border-orange-500/30"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-orange-500/25 bg-orange-500/10 text-orange-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-medium uppercase tracking-wider text-faint">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="truncate text-[15px] font-semibold text-ink transition-colors hover:text-orange-400"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-[15px] font-semibold text-ink">{value}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* Cal.com / Calendly booking CTA */}
              {SITE_CAL_URL && (
                <a
                  href={SITE_CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-orange-500/30 bg-orange-500/5 p-4 transition-all duration-300 hover:border-orange-500/60 hover:bg-orange-500/10 group"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-500/15 text-orange-400 transition-colors group-hover:bg-orange-500/25">
                    <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-medium uppercase tracking-wider text-faint">
                      Free discovery call
                    </div>
                    <div className="text-[15px] font-semibold text-orange-400 group-hover:text-orange-300 transition-colors">
                      Book a free 15-min call →
                    </div>
                  </div>
                </a>
              )}

              <div className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent p-5">
                <p className="text-sm leading-relaxed text-body">
                  <span className="font-semibold text-orange-400">
                    {t.contact.availabilityCard.strong}
                  </span>{' '}
                  {t.contact.availabilityCard.rest}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
