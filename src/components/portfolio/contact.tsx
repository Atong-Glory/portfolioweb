'use client'

import { useCallback, useRef, useState } from 'react'
import { Mail, MapPin, Send, Loader2 } from 'lucide-react'
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
import { SITE_EMAIL } from '@/lib/site'
import {
  CONTACT_FIELD_ORDER,
  validateContactForm,
  type ContactFormValues,
} from '@/lib/contact-form-validation'

type FormState = ContactFormValues

const INITIAL: FormState = {
  name: '',
  email: '',
  projectType: '',
  message: '',
}

type ContactResponse = {
  success?: boolean
  message?: string
  errors?: Partial<Record<keyof FormState, string>>
}

export function Contact() {
  const { t } = useI18n()
  const { toast } = useToast()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>(undefined)
  const [formNotice, setFormNotice] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  const fieldRefs = useRef<Record<keyof FormState, HTMLElement | null>>({
    name: null,
    email: null,
    projectType: null,
    message: null,
  })

  const handleTurnstileToken = useCallback((token: string | undefined) => {
    setTurnstileToken(token)
  }, [])

  const CONTACT_INFO = [
    {
      Icon: Mail,
      label: t.contact.info.email,
      value: SITE_EMAIL,
      href: `mailto:${SITE_EMAIL}`,
    },
    {
      Icon: MapPin,
      label: t.contact.info.location,
      value: t.about.info.locationValue,
      href: undefined,
    },
  ]

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
    setFormNotice(null)
  }

  const focusFirstError = (nextErrors: Partial<Record<keyof FormState, string>>) => {
    const firstInvalidField = CONTACT_FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalidField) fieldRefs.current[firstInvalidField]?.focus()
  }

  const validate = (): boolean => {
    const issues = validateContactForm(form)
    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    for (const field of CONTACT_FIELD_ORDER) {
      const issue = issues[field]
      if (issue) nextErrors[field] = t.contact.validation[issue]
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setFormNotice({ type: 'error', message: t.contact.validation.form })
      focusFirstError(nextErrors)
      return false
    }
    return true
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setFormNotice(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
      })
      const data = (await res.json()) as ContactResponse

      if (res.ok && data.success) {
        toast({
          title: t.contact.toast.sentTitle,
          description: t.contact.toast.sentDescription,
          variant: 'default',
        })
        setFormNotice({ type: 'success', message: t.contact.toast.sentDescription })
        setForm(INITIAL)
        setTurnstileToken(undefined)
      } else {
        const serverErrors = data.errors ?? {}
        const errorMessage =
          Object.values(serverErrors).find(Boolean) ??
          data.message ??
          t.contact.toast.fallbackDescription
        if (data.errors) {
          setErrors(serverErrors)
          focusFirstError(serverErrors)
        }
        setFormNotice({ type: 'error', message: errorMessage })
        toast({
          title: t.contact.toast.errorTitle,
          description: errorMessage,
          variant: 'destructive',
        })
      }
    } catch {
      setFormNotice({ type: 'error', message: t.contact.toast.networkDescription })
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
    <section id="contact" className="relative overflow-hidden bg-base">
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
            <form onSubmit={onSubmit} noValidate aria-busy={submitting} className="space-y-5">
              <p className="text-sm text-soft">{t.contact.form.requiredFieldsNote}</p>
              {formNotice && (
                <p
                  role={formNotice.type === 'error' ? 'alert' : 'status'}
                  aria-live={formNotice.type === 'error' ? 'assertive' : 'polite'}
                  aria-atomic="true"
                  className={
                    formNotice.type === 'error'
                      ? 'rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300'
                      : 'rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300'
                  }
                >
                  {formNotice.message}
                </p>
              )}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-body">
                    {t.contact.form.yourName}
                    <span aria-hidden="true" className="text-orange-400">({t.contact.form.required})</span>
                  </Label>
                  <Input
                    id="name"
                    ref={(element) => { fieldRefs.current.name = element }}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder={t.contact.form.yourNamePlaceholder}
                    autoComplete="name"
                    required
                    maxLength={120}
                    className="h-12 border-edge-strong bg-panel text-ink placeholder:text-faint focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <p id="name-error" className="text-xs text-red-400">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-body">
                    {t.contact.form.yourEmail}
                    <span aria-hidden="true" className="text-orange-400">({t.contact.form.required})</span>
                  </Label>
                  <Input
                    id="email"
                    ref={(element) => { fieldRefs.current.email = element }}
                    type="email"
                    inputMode="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder={t.contact.form.yourEmailPlaceholder}
                    autoComplete="email"
                    required
                    maxLength={254}
                    className="h-12 border-edge-strong bg-panel text-ink placeholder:text-faint focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <p id="email-error" className="text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectType" className="text-body">
                  {t.contact.form.projectType}{' '}
                  <span className="text-soft">({t.contact.form.optional})</span>
                </Label>
                <Select value={form.projectType} onValueChange={(v) => set('projectType', v)}>
                  <SelectTrigger
                    id="projectType"
                    ref={(element) => { fieldRefs.current.projectType = element }}
                    aria-invalid={!!errors.projectType}
                    aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                    className="h-12 border-edge-strong bg-panel text-ink data-[placeholder]:text-faint focus:ring-orange-500/50"
                  >
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
                {errors.projectType && (
                  <p id="projectType-error" className="text-xs text-red-400">{errors.projectType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-body">
                  {t.contact.form.message}
                  <span aria-hidden="true" className="text-orange-400">({t.contact.form.required})</span>
                  <span aria-hidden="true" className="ml-auto text-xs font-normal text-soft">
                    {t.contact.form.messageCount(form.message.length, 5000)}
                  </span>
                </Label>
                <Textarea
                  id="message"
                  ref={(element) => { fieldRefs.current.message = element }}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder={t.contact.form.messagePlaceholder}
                  rows={5}
                  required
                  maxLength={5000}
                  className="min-h-[130px] resize-none border-edge-strong bg-panel text-ink placeholder:text-faint focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <p id="message-error" className="text-xs text-red-400">{errors.message}</p>}
              </div>

              {/* Cloudflare Turnstile — renders only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set */}
              <TurnstileWidget onToken={handleTurnstileToken} />

              <p className="text-xs leading-relaxed text-soft">
                {t.contact.form.privacyNotice}{' '}
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="font-medium text-orange-400 underline underline-offset-2 hover:text-orange-300"
                >
                  {SITE_EMAIL}
                </a>
              </p>

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

              <div className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent p-5">
                <p className="text-sm leading-relaxed text-body">
                  <span className="font-semibold text-orange-400">
                    {t.contact.conversationCard.strong}
                  </span>{' '}
                  {t.contact.conversationCard.rest}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
