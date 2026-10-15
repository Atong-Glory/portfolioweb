import assert from 'node:assert/strict'
import test from 'node:test'
import {
  createProjectSchema,
  createTestimonialSchema,
  updateProjectSchema,
} from './admin-content-schemas'

test('createProjectSchema supplies safe defaults and rejects placeholder links', () => {
  const parsed = createProjectSchema.safeParse({ title: 'Portfolio Project' })
  assert.equal(parsed.success, true)
  if (parsed.success) {
    assert.equal(parsed.data.category, 'Full-stack Application')
    assert.equal(parsed.data.demoUrl, null)
  }

  assert.equal(createProjectSchema.safeParse({ title: 'Bad link', demoUrl: '#' }).success, false)
})

test('updateProjectSchema allows partial updates but rejects unknown fields', () => {
  assert.deepEqual(updateProjectSchema.safeParse({ featured: true }).success, true)
  assert.equal(updateProjectSchema.safeParse({ unexpected: true }).success, false)
})

test('createTestimonialSchema validates a complete testimonial record', () => {
  const result = createTestimonialSchema.safeParse({
    name: 'A. Example',
    role: 'Engineer',
    company: 'Example Company',
    quote: 'A verified quote.',
    initials: 'AE',
  })

  assert.equal(result.success, true)
  if (result.success) assert.equal(result.data.rating, 5)
  assert.equal(createTestimonialSchema.safeParse({ name: 'Incomplete' }).success, false)
})
