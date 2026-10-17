import assert from 'node:assert/strict'
import test from 'node:test'
import { getClientIp } from './rate-limit'

test('getClientIp trusts Cloudflare IP and ignores client-controlled forwarding headers', () => {
  const trusted = new Request('https://example.com', {
    headers: {
      'cf-connecting-ip': '203.0.113.8',
      'x-forwarded-for': '198.51.100.4',
    },
  })
  const spoofed = new Request('https://example.com', {
    headers: { 'x-forwarded-for': '198.51.100.4' },
  })

  assert.equal(getClientIp(trusted), '203.0.113.8')
  assert.equal(getClientIp(spoofed), 'unknown')
})
