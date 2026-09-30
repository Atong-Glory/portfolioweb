// DevFusion Portfolio — single source of truth for site identity constants.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atongglory.pages.dev'
).replace(/\/+$/, '')

export const SITE_NAME = 'Atong Glory — DevFusion Portfolio'

export const SITE_EMAIL = 'atongglory17@gmail.com'

/** E.164 or display format — update to your real number before launch. */
export const SITE_PHONE = '+237 6XX XXX XXX'
export const SITE_PHONE_TEL = '+237600000000'

export const SITE_LOCATION = 'Douala, Cameroon'

/** Cal.com / Calendly booking URL (optional). Shown in contact when set. */
export const SITE_CAL_URL =
  process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/atongglory/15min'

export const SOCIAL_LINKS = [
  'https://github.com/atongglory',
  'https://www.linkedin.com/in/atongglory',
  'https://x.com/atongglory',
] as const

export const SITE_DESCRIPTION =
  'Portfolio of Atong Glory — Frontend Developer, UI/UX & Graphics Designer. Fast, responsive websites and web apps built with React, Next.js, TypeScript and Tailwind CSS. Clean code, pixel-perfect interfaces and human-centered design.'

export const SITE_TITLE = 'Atong Glory — Frontend Developer & Designer | DevFusion Portfolio'

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
