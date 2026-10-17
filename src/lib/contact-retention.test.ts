import assert from 'node:assert/strict'
import test from 'node:test'
import type { D1Database, D1PreparedStatement } from '@cloudflare/workers-types'
import { getContactRetentionCutoff, pruneExpiredContactData } from './contact-retention'

test('contact retention cutoff is twelve calendar months before the reference time', () => {
  assert.equal(
    getContactRetentionCutoff(new Date('2026-10-17T01:00:00.000Z')).toISOString(),
    '2025-10-17T01:00:00.000Z'
  )
  assert.equal(
    getContactRetentionCutoff(new Date('2024-02-29T12:30:00.000Z')).toISOString(),
    '2023-02-28T12:30:00.000Z'
  )
})

test('contact data cleanup batches old messages and expired rate-limit keys', async () => {
  const queries: string[] = []
  const values: unknown[][] = []
  const statements: D1PreparedStatement[] = []

  const db = {
    prepare(query: string) {
      queries.push(query)
      const statement = {
        bind(...boundValues: unknown[]) {
          values.push(boundValues)
          return statement
        },
      }
      statements.push(statement as D1PreparedStatement)
      return statement
    },
    async batch() {
      return [{ meta: { changes: 2 } }, { meta: { changes: 3 } }]
    },
  } as unknown as D1Database

  const result = await pruneExpiredContactData(db, new Date('2026-10-17T01:00:00.000Z'))

  assert.equal(result.deletedMessages, 2)
  assert.equal(result.deletedRateLimitBuckets, 3)
  assert.equal(result.cutoff.toISOString(), '2025-10-17T01:00:00.000Z')
  assert.equal(queries.length, 2)
  assert.match(queries[0], /DELETE FROM "ContactMessage"/)
  assert.match(queries[1], /DELETE FROM "RateLimitBucket"/)
  assert.deepEqual(values, [
    ['2025-10-17T01:00:00.000Z'],
    ['2026-10-17T01:00:00.000Z'],
  ])
})

test('contact retention cutoff rejects an invalid reference time', () => {
  assert.throws(() => getContactRetentionCutoff(new Date(Number.NaN)), RangeError)
})
