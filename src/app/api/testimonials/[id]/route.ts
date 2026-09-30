import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'

type Params = { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  try {
    const { id } = await params
    const body = await req.json()
    const db = await getDb()
    const updated = await db.testimonial.update({ where: { id }, data: body })
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
