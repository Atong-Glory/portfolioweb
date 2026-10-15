import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'
import { slugifyTitle } from '@/lib/projects'
import { createProjectSchema } from '@/lib/admin-content-schemas'

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  try {
    const db = await getDb()
    const projects = await db.project.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json({ success: true, projects })
  } catch (err) {
    console.error('[api/admin/projects] list failed:', err)
    return NextResponse.json({ success: false, projects: [] }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  try {
    const body = await req.json().catch(() => null)
    const parsed = createProjectSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid project data', errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const title = parsed.data.title
    const slug = parsed.data.slug ?? slugifyTitle(title)
    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Title must include letters or numbers' },
        { status: 400 }
      )
    }

    const db = await getDb()
    const created = await db.project.create({
      data: { ...parsed.data, slug },
    })
    return NextResponse.json({ success: true, project: created }, { status: 201 })
  } catch (err) {
    console.error('[api/admin/projects] create failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
