import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const countVisit = req.nextUrl.searchParams.get('count') === '1'

    let views: number
    if (countVisit) {
      const row = await db.visitorStat.upsert({
        where: { path: '/' },
        create: { path: '/', views: 1 },
        update: { views: { increment: 1 } },
      })
      views = row.views
    } else {
      const row = await db.visitorStat.findUnique({ where: { path: '/' } })
      views = row?.views ?? 0
    }

    const [projects, messages] = await Promise.all([
      db.project.count(),
      db.contactMessage.count(),
    ])

    return NextResponse.json({ success: true, views, projects, messages })
  } catch (err) {
    console.error('[api/stats] failed:', err)
    return NextResponse.json({ success: false, views: 0 }, { status: 500 })
  }
}
