import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

type Params = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, { params }: Params) {
  try {
    const { slug } = await params
    const db = await getDb()
    const project = await db.project.findUnique({ where: { slug } })
    if (!project) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    return NextResponse.json({
      success: true,
      project: {
        ...project,
        tagList: project.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      },
    })
  } catch (err) {
    console.error('[api/projects/slug] failed:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
