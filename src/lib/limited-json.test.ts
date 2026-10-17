import assert from 'node:assert/strict'
import test from 'node:test'
import { readLimitedJsonBody } from './limited-json'

test('readLimitedJsonBody parses JSON requests within the byte limit', async () => {
  const request = new Request('https://example.com', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ message: 'hello' }),
  })

  assert.deepEqual(await readLimitedJsonBody(request, 100), {
    success: true,
    value: { message: 'hello' },
  })
})

test('readLimitedJsonBody rejects a non-JSON content type and malformed JSON', async () => {
  const nonJsonRequest = new Request('https://example.com', {
    method: 'POST',
    headers: { 'content-type': 'text/plain' },
    body: '{}',
  })
  const malformedRequest = new Request('https://example.com', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{',
  })

  const nonJsonResult = await readLimitedJsonBody(nonJsonRequest, 100)
  const malformedResult = await readLimitedJsonBody(malformedRequest, 100)

  assert.equal(nonJsonResult.success, false)
  assert.equal(malformedResult.success ? null : malformedResult.status, 400)
})

test('readLimitedJsonBody rejects bodies that exceed the configured limit', async () => {
  const request = new Request('https://example.com', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ message: 'this body is too large' }),
  })

  const result = await readLimitedJsonBody(request, 5)
  assert.equal(result.success ? null : result.status, 413)
})
