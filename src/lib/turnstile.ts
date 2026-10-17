export function shouldBypassTurnstile(
  secret: string | undefined,
  environment: string | undefined
): boolean {
  return !secret && environment !== 'production'
}

export async function verifyTurnstileToken(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return shouldBypassTurnstile(secret, process.env.NODE_ENV)
  if (!token) return false

  const body = new URLSearchParams({
    secret,
    response: token,
  })

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return false

    const data: unknown = await res.json()
    return typeof data === 'object' && data !== null && 'success' in data && data.success === true
  } catch (error) {
    console.error('[turnstile] verification request failed:', error)
    return false
  }
}
