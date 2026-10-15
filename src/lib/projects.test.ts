import assert from 'node:assert/strict'
import test from 'node:test'
import { isSampleProjectSlug, parseProjectMetrics, slugifyTitle } from './projects'

test('slugifyTitle creates a lowercase URL-safe slug', () => {
  assert.equal(slugifyTitle('Full-Stack Portfolio: Next.js & Prisma'), 'full-stack-portfolio-next-js-prisma')
})

test('isSampleProjectSlug identifies only the retired template entries', () => {
  assert.equal(isSampleProjectSlug('analytics-dashboard'), true)
  assert.equal(isSampleProjectSlug('bilingual-full-stack-portfolio'), false)
})

test('parseProjectMetrics keeps only entries with string labels and values', () => {
  assert.deepEqual(
    parseProjectMetrics(
      JSON.stringify([
        { label: 'Stack', value: 'Next.js' },
        { label: 'Missing value' },
        { label: 5, value: 'Invalid label' },
      ])
    ),
    [{ label: 'Stack', value: 'Next.js' }]
  )
})

test('parseProjectMetrics returns an empty list for invalid or absent data', () => {
  assert.deepEqual(parseProjectMetrics(null), [])
  assert.deepEqual(parseProjectMetrics('not json'), [])
  assert.deepEqual(parseProjectMetrics('{"label":"not an array","value":"x"}'), [])
})
