import assert from 'node:assert/strict'
import test from 'node:test'
import { contactReadStatusSchema, contactSubmissionSchema } from './request-schemas'

test('contact submissions trim and validate bounded contact fields', () => {
  const parsed = contactSubmissionSchema.safeParse({
    name: '  Atong Glory  ',
    email: '  atong@example.com ',
    message: '  I would like to discuss a software role.  ',
  })

  assert.equal(parsed.success, true)
  if (parsed.success) {
    assert.equal(parsed.data.name, 'Atong Glory')
    assert.equal(parsed.data.email, 'atong@example.com')
  }
})

test('contact submissions reject malformed, oversized, and unexpected fields', () => {
  assert.equal(
    contactSubmissionSchema.safeParse({
      name: 'Atong',
      email: 'not-an-email',
      message: 'A sufficiently long message.',
    }).success,
    false
  )
  assert.equal(
    contactSubmissionSchema.safeParse({
      name: 'Atong',
      email: 'atong@example.com',
      message: 'x'.repeat(5001),
    }).success,
    false
  )
  assert.equal(
    contactSubmissionSchema.safeParse({
      name: 'Atong',
      email: 'atong@example.com',
      message: 'A sufficiently long message.',
      isAdmin: true,
    }).success,
    false
  )
})

test('contact read status requires an explicit boolean and rejects extra fields', () => {
  assert.equal(contactReadStatusSchema.safeParse({ id: 'message-1', isRead: false }).success, true)
  assert.equal(contactReadStatusSchema.safeParse({ id: 'message-1', isRead: 'false' }).success, false)
  assert.equal(
    contactReadStatusSchema.safeParse({ id: 'message-1', isRead: true, role: 'admin' }).success,
    false
  )
})
