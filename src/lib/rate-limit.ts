import type { PrismaClient } from '@prisma/client'

const CONTACT_LIMIT = 5
const CONTACT_WINDOW_MS = 60 * 60 * 1000

export async function allowContactSubmission(
  db: PrismaClient,
  clientKey: string
): Promise<boolean> {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + CONTACT_WINDOW_MS)

  await db.rateLimitBucket.upsert({
    where: { id: clientKey },
    create: { id: clientKey, count: 0, expiresAt },
    update: {},
  })

  const reset = await db.rateLimitBucket.updateMany({
    where: { id: clientKey, expiresAt: { lte: now } },
    data: { count: 1, expiresAt },
  })
  if (reset.count === 1) {
    return true
  }

  const increment = await db.rateLimitBucket.updateMany({
    where: { id: clientKey, expiresAt: { gt: now }, count: { lt: CONTACT_LIMIT } },
    data: { count: { increment: 1 } },
  })
  return increment.count === 1
}

export function getClientIp(req: Request): string {
  return req.headers.get('cf-connecting-ip')?.trim() || 'unknown'
}
