import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'
import { slugifyTitle } from '@/lib/projects'

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
    const body = (await req.json()) as any
    const title = String(body.title ?? '').trim()
    if (!title) {
      return NextResponse.json({ success: false, message: 'Title required' }, { status: 400 })
    }

    const slug =
      typeof body.slug === 'string' && body.slug.trim()
        ? body.slug.trim()
        : slugifyTitle(title)

    const db = await getDb()
    const created = await db.project.create({
      data: {
        title,
        slug,
        description: String(body.description ?? ''),
        descriptionFr: body.descriptionFr ?? null,
        longDescription: body.longDescription ?? null,
        longDescriptionFr: body.longDescriptionFr ?? null,
        metrics: body.metrics ?? null,
        image: String(body.image ?? '/images/project-analytics.png'),
        tags: String(body.tags ?? ''),
        category: String(body.category ?? 'Web App'),
        categoryFr: body.categoryFr ?? null,
        demoUrl: body.demoUrl ?? null,
        githubUrl: body.githubUrl ?? null,
        featured: !!body.featured,
        sortOrder: Number(body.sortOrder ?? 0),
      },
    })
    return NextResponse.json({ success: true, project: created }, { status: 201 })
  } catch (err) {
    console.error('[api/admin/projects] create failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
