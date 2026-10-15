import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'
import { updateTestimonialSchema } from '@/lib/admin-content-schemas'

type Params = { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  try {
    const { id } = await params
    const body = await req.json().catch(() => null)
    const parsed = updateTestimonialSchema.safeParse(body)
    if (!parsed.success || Object.keys(parsed.data ?? {}).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid testimonial update' },
        { status: 400 }
      )
    }
    const db = await getDb()
    const updated = await db.testimonial.update({ where: { id }, data: parsed.data })
    return NextResponse.json({ success: true, testimonial: updated })
  } catch (err) {
    console.error('[api/testimonials] patch failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  try {
    const { id } = await params
    const db = await getDb()
    await db.testimonial.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[api/testimonials] delete failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
