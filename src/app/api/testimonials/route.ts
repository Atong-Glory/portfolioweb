import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'

export async function GET() {
  try {
    const db = await getDb()
    const testimonials = await db.testimonial.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
    return NextResponse.json({ success: true, testimonials })
  } catch (err) {
    console.error('[api/testimonials] failed:', err)
    return NextResponse.json({ success: false, testimonials: [] }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  try {
    const body = await req.json()
    const db = await getDb()
    const created = await db.testimonial.create({ data: body })
    return NextResponse.json({ success: true, testimonial: created }, { status: 201 })
  } catch (err) {
    console.error('[api/testimonials] create failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
