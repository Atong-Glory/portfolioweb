import assert from 'node:assert/strict'
import test from 'node:test'
import { shouldBypassTurnstile, verifyTurnstileToken } from './turnstile'

test('Turnstile may be bypassed only outside production when no secret is configured', () => {
  assert.equal(shouldBypassTurnstile(undefined, 'development'), true)
  assert.equal(shouldBypassTurnstile(undefined, 'test'), true)
  assert.equal(shouldBypassTurnstile(undefined, 'production'), false)
  assert.equal(shouldBypassTurnstile('configured-secret', 'development'), false)
})

test('Turnstile rejects a missing token and unsuccessful verification response', async () => {
  const originalSecret = process.env.TURNSTILE_SECRET_KEY
  const originalFetch = globalThis.fetch

  try {
    process.env.TURNSTILE_SECRET_KEY = 'test-secret'
    assert.equal(await verifyTurnstileToken(undefined), false)

    globalThis.fetch = async () => new Response('unavailable', { status: 503 })
    assert.equal(await verifyTurnstileToken('test-token'), false)
  } finally {
    globalThis.fetch = originalFetch
    if (originalSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY
    else process.env.TURNSTILE_SECRET_KEY = originalSecret
  }
})
