import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET() {
  try {
    const db = await getDb()
    const projects = await db.project.findMany({
      where: { featured: true },
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json({
      success: true,
      projects: projects.map((p) => ({
        ...p,
        tagList: p.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      })),
    })
  } catch (err) {
    console.error('[api/projects] failed:', err)
    return NextResponse.json({ success: false, projects: [] }, { status: 500 })
  }
}
