import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'
import { updateProjectSchema } from '@/lib/admin-content-schemas'

type Params = { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  try {
    const { id } = await params
    const body = await req.json().catch(() => null)
    const parsed = updateProjectSchema.safeParse(body)
    if (!parsed.success || Object.keys(parsed.data ?? {}).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid project update' },
        { status: 400 }
      )
    }
    const db = await getDb()
    const updated = await db.project.update({ where: { id }, data: parsed.data })
    return NextResponse.json({ success: true, project: updated })
  } catch (err) {
    console.error('[api/admin/projects] patch failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  try {
    const { id } = await params
    const db = await getDb()
    await db.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[api/admin/projects] delete failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
