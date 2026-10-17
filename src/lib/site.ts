// Portfolio identity and canonical URL constants.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atongglory.pages.dev'
).replace(/\/+$/, '')

export const SITE_NAME = 'Atong Glory — Full-Stack Software Engineer'

export const SITE_EMAIL = 'atongglory17@gmail.com'

export const SITE_LOCATION = 'Bamenda, Cameroon'

export const SOCIAL_LINKS = [
  'https://github.com/atongglory',
  'https://www.linkedin.com/in/atongglory',
  'https://x.com/atongglory',
] as const

export const SITE_DESCRIPTION =
  'Portfolio of Atong Glory, full-stack software engineer. Explore a bilingual Next.js application built with TypeScript, Prisma, and Cloudflare.'

export const SITE_TITLE = 'Atong Glory — Full-Stack Software Engineer'

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
