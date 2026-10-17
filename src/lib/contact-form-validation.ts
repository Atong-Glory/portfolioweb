export type ContactFormValues = {
  name: string
  email: string
  projectType: string
  message: string
}

export type ContactValidationIssue =
  | 'nameRequired'
  | 'nameLength'
  | 'emailRequired'
  | 'email'
  | 'projectTypeLength'
  | 'messageRequired'
  | 'messageLength'

export type ContactValidationErrors = Partial<
  Record<keyof ContactFormValues, ContactValidationIssue>
>

export const CONTACT_FIELD_ORDER: (keyof ContactFormValues)[] = [
  'name',
  'email',
  'projectType',
  'message',
]

export function validateContactForm(values: ContactFormValues): ContactValidationErrors {
  const errors: ContactValidationErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const projectType = values.projectType.trim()
  const message = values.message.trim()

  if (!name) {
    errors.name = 'nameRequired'
  } else if (name.length < 2 || name.length > 120) {
    errors.name = 'nameLength'
  }

  if (!email) {
    errors.email = 'emailRequired'
  } else if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = 'email'
  }

  if (projectType.length > 120) errors.projectType = 'projectTypeLength'

  if (!message) {
    errors.message = 'messageRequired'
  } else if (message.length < 10 || message.length > 5000) {
    errors.message = 'messageLength'
  }

  return errors
}
