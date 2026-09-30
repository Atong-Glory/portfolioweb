import { Resend } from 'resend'
import { SITE_EMAIL, SITE_NAME } from '@/lib/site'

type ContactPayload = {
  name: string
  email: string
  projectType: string
  budgetRange: string
  message: string
}

export async function notifyContactLead(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_NOTIFY_EMAIL ?? SITE_EMAIL
  if (!apiKey) return

  const resend = new Resend(apiKey)
  await resend.emails.send({
    from: process.env.RESEND_FROM ?? `${SITE_NAME} <onboarding@resend.dev>`,
    to: [to],
    replyTo: payload.email,
    subject: `[DevFusion] New lead from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Project type: ${payload.projectType}`,
      `Budget: ${payload.budgetRange}`,
      '',
      payload.message,
    ].join('\n'),
  })
}
