import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'
import { SAMPLE_TESTIMONIAL_NAMES } from '@/lib/projects'
import { createTestimonialSchema } from '@/lib/admin-content-schemas'

export async function GET() {
  try {
    const db = await getDb()
    const testimonials = await db.testimonial.findMany({
      where: { name: { notIn: [...SAMPLE_TESTIMONIAL_NAMES] } },
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
    const body = await req.json().catch(() => null)
    const parsed = createTestimonialSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid testimonial data',
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }
    const db = await getDb()
    const created = await db.testimonial.create({ data: parsed.data })
    return NextResponse.json({ success: true, testimonial: created }, { status: 201 })
  } catch (err) {
    console.error('[api/testimonials] create failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
