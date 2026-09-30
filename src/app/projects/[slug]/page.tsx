import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LanguageProvider } from '@/components/portfolio/language-provider'
import { CaseStudyView } from '@/components/portfolio/case-study-view'
import { getDb } from '@/lib/db'
import { SITE_URL } from '@/lib/site'

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const db = await getDb()
    const projects = await db.project.findMany({ select: { slug: true } })
    return projects.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  try {
    const db = await getDb()
    const project = await db.project.findUnique({ where: { slug } })
    if (!project) return {}
    const url = `${SITE_URL}/projects/${slug}`
    return {
      title: `${project.title} | DevFusion Portfolio`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        url,
        images: [{ url: project.image }],
      },
    }
  } catch {
    return {}
  }
}

export default async function ProjectCaseStudyPage({ params }: Params) {
  const { slug } = await params
  const db = await getDb()
  const project = await db.project.findUnique({ where: { slug } })
  if (!project) notFound()

  return (
    <LanguageProvider>
      <CaseStudyView project={project} />
    </LanguageProvider>
  )
}
