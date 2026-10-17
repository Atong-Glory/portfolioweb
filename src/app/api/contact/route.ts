import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'
import { allowContactSubmission, getClientIp } from '@/lib/rate-limit'
import { notifyContactLead } from '@/lib/email'
import { verifyTurnstileToken } from '@/lib/turnstile'
import { contactReadStatusSchema, contactSubmissionSchema } from '@/lib/request-schemas'
import { readLimitedJsonBody } from '@/lib/limited-json'

const MAX_CONTACT_BODY_BYTES = 12 * 1024
const MAX_STATUS_BODY_BYTES = 1024

export async function POST(req: NextRequest) {
  try {
    const body = await readLimitedJsonBody(req, MAX_CONTACT_BODY_BYTES)
    if (!body.success) {
      return NextResponse.json(
        { success: false, message: body.message },
        { status: body.status }
      )
    }

    const parsed = contactSubmissionSchema.safeParse(body.value)
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please check the submitted fields.',
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
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

    const turnstileOk = await verifyTurnstileToken(parsed.data.turnstileToken)
    if (!turnstileOk) {
      return NextResponse.json(
        { success: false, message: 'Security verification failed. Please try again.' },
        { status: 403 }
      )
    }

    const saved = await db.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        projectType: parsed.data.projectType || 'Not specified',
        budgetRange: parsed.data.budgetRange || 'Not specified',
        message: parsed.data.message,
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
        message: 'Message received.',
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
    return NextResponse.json(
      { success: true, stats: { total, unread }, latest },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (err) {
    console.error('[api/contact] read failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  try {
    const body = await readLimitedJsonBody(req, MAX_STATUS_BODY_BYTES)
    if (!body.success) {
      return NextResponse.json(
        { success: false, message: body.message },
        { status: body.status }
      )
    }

    const parsed = contactReadStatusSchema.safeParse(body.value)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid contact status update.' },
        { status: 400 }
      )
    }

    const db = await getDb()
    const updated = await db.contactMessage.update({
      where: { id: parsed.data.id },
      data: { isRead: parsed.data.isRead },
    })
    return NextResponse.json({ success: true, message: updated })
  } catch (err) {
    console.error('[api/contact] patch failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
