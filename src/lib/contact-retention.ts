import type { D1Database } from '@cloudflare/workers-types'

export function getContactRetentionCutoff(now: Date): Date {
  if (!Number.isFinite(now.getTime())) {
    throw new RangeError('Retention reference time must be a valid date')
  }

  const day = now.getUTCDate()
  const cutoff = new Date(now)
  cutoff.setUTCDate(1)
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 1)

  const lastDayOfCutoffMonth = new Date(
    Date.UTC(cutoff.getUTCFullYear(), cutoff.getUTCMonth() + 1, 0)
  ).getUTCDate()
  cutoff.setUTCDate(Math.min(day, lastDayOfCutoffMonth))

  return cutoff
}

export async function pruneExpiredContactData(
  db: D1Database,
  now: Date
): Promise<{ deletedMessages: number; deletedRateLimitBuckets: number; cutoff: Date }> {
  const cutoff = getContactRetentionCutoff(now)
  const nowIso = now.toISOString()
  const cutoffIso = cutoff.toISOString()
  const results = await db.batch([
    db
      .prepare(
        'DELETE FROM "ContactMessage" WHERE julianday("createdAt") < julianday(?)'
      )
      .bind(cutoffIso),
    db
      .prepare(
        'DELETE FROM "RateLimitBucket" WHERE julianday("expiresAt") < julianday(?)'
      )
      .bind(nowIso),
  ])

  return {
    deletedMessages: results[0].meta.changes,
    deletedRateLimitBuckets: results[1].meta.changes,
    cutoff,
  }
}
