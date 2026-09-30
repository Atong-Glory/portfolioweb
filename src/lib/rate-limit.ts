import type { PrismaClient } from '@prisma/client'

const CONTACT_LIMIT = 5
const CONTACT_WINDOW_MS = 60 * 60 * 1000

export async function allowContactSubmission(
  db: PrismaClient,
  clientKey: string
): Promise<boolean> {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + CONTACT_WINDOW_MS)

  const existing = await db.rateLimitBucket.findUnique({ where: { id: clientKey } })
  if (!existing || existing.expiresAt < now) {
    await db.rateLimitBucket.upsert({
      where: { id: clientKey },
      create: { id: clientKey, count: 1, expiresAt },
      update: { count: 1, expiresAt },
    })
    return true
  }

  if (existing.count >= CONTACT_LIMIT) return false

  await db.rateLimitBucket.update({
    where: { id: clientKey },
    data: { count: { increment: 1 } },
  })
  return true
}

export function getClientIp(req: Request): string {
  const cf = req.headers.get('cf-connecting-ip')
  if (cf) return cf
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown'
  return 'unknown'
}
