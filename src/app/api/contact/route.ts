import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'
import { allowContactSubmission, getClientIp } from '@/lib/rate-limit'
import { notifyContactLead } from '@/lib/email'
import { verifyTurnstileToken } from '@/lib/turnstile'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as any
    const { name, email, projectType, budgetRange, message, turnstileToken } = body ?? {}

    const turnstileOk = await verifyTurnstileToken(
      typeof turnstileToken === 'string' ? turnstileToken : undefined
    )
    if (!turnstileOk) {
      return NextResponse.json(
        { success: false, message: 'Security verification failed. Please try again.' },
        { status: 403 }
      )
    }

    const errors: Record<string, string> = {}
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Please enter your name (min 2 characters).'
    }
    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
      errors.email = 'Please enter a valid email address.'
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = 'Tell me a bit more about your project (min 10 characters).'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    const db = await getDb()
    const ip = getClientIp(req)
    const allowed = await allowContactSubmission(db, `contact:${ip}`)
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many messages from this network. Please try again later.',
        },
        { status: 429 }
      )
    }

    const saved = await db.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        projectType:
          typeof projectType === 'string' && projectType ? projectType : 'Not specified',
        budgetRange:
          typeof budgetRange === 'string' && budgetRange ? budgetRange : 'Not specified',
        message: message.trim(),
      },
    })

    notifyContactLead({
      name: saved.name,
      email: saved.email,
      projectType: saved.projectType,
      budgetRange: saved.budgetRange,
      message: saved.message,
    }).catch((err) => console.error('[api/contact] email notify failed:', err))

    return NextResponse.json(
      {
        success: true,
        id: saved.id,
        receivedAt: saved.createdAt,
        message: "Message received! I'll get back to you within 24 hours.",
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[api/contact] failed:', err)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  try {
    const db = await getDb()
    const [total, unread, latest] = await Promise.all([
      db.contactMessage.count(),
      db.contactMessage.count({ where: { isRead: false } }),
      db.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
        select: {
          id: true,
          name: true,
          email: true,
          projectType: true,
          budgetRange: true,
          message: true,
          isRead: true,
          createdAt: true,
        },
      }),
    ])
    return NextResponse.json({ success: true, stats: { total, unread }, latest })
  } catch (err) {
    console.error('[api/contact] read failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  try {
    const body = (await req.json()) as any
    const { id, isRead } = body ?? {}
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ success: false, message: 'Missing id' }, { status: 400 })
    }

    const db = await getDb()
    const updated = await db.contactMessage.update({
      where: { id },
      data: { isRead: !!isRead },
    })
    return NextResponse.json({ success: true, message: updated })
  } catch (err) {
    console.error('[api/contact] patch failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
