import assert from 'node:assert/strict'
import test from 'node:test'
import { validateContactForm, type ContactFormValues } from './contact-form-validation'

const validForm: ContactFormValues = {
  name: 'Atong Glory',
  email: 'atong@example.com',
  projectType: '',
  message: 'I would like to discuss an engineering role.',
}

test('accepts valid contact details after trimming whitespace', () => {
  assert.deepEqual(
    validateContactForm({
      ...validForm,
      name: '  Atong Glory  ',
      email: '  atong@example.com ',
      message: '  I would like to discuss an engineering role.  ',
    }),
    {}
  )
})

test('reports required fields and invalid email independently', () => {
  assert.deepEqual(
    validateContactForm({ name: ' ', email: 'invalid', projectType: '', message: '' }),
    {
      name: 'nameRequired',
      email: 'email',
      message: 'messageRequired',
    }
  )
})

test('enforces the server schema length limits', () => {
  assert.deepEqual(
    validateContactForm({
      name: 'A',
      email: `${'a'.repeat(250)}@example.com`,
      projectType: 'x'.repeat(121),
      message: 'short',
    }),
    {
      name: 'nameLength',
      email: 'email',
      projectType: 'projectTypeLength',
      message: 'messageLength',
    }
  )
})
