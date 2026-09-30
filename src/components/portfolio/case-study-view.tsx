'use client'

import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { useI18n } from './language-provider'
import { parseProjectMetrics } from '@/lib/projects'

export type CaseStudyProject = {
  id: string
  title: string
  slug: string
  description: string
  descriptionFr: string | null
  longDescription: string | null
  longDescriptionFr: string | null
  metrics: string | null
  image: string
  category: string
  categoryFr: string | null
  tags: string
  demoUrl: string | null
  githubUrl: string | null
}

export function CaseStudyView({ project }: { project: CaseStudyProject }) {
  const { t, lang } = useI18n()
  const summary =
    lang === 'fr' ? project.descriptionFr ?? project.description : project.description
  const body =
    lang === 'fr'
      ? project.longDescriptionFr ?? project.longDescription ?? summary
      : project.longDescription ?? summary
  const category =
    lang === 'fr'
      ? project.categoryFr ?? t.projects.categories[project.category] ?? project.category
      : project.category
  const metrics = parseProjectMetrics(project.metrics)
  const tagList = project.tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  return (
    <article className="df-root min-h-screen bg-base text-body">
      <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 transition-colors hover:text-orange-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t.caseStudy.backHome}
        </Link>

        <p className="mt-8 text-xs font-bold uppercase tracking-widest text-orange-400">{category}</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">{project.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-soft">{summary}</p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-edge">
          <img
            src={project.image}
            alt={t.projects.previewAlt(project.title)}
            className="aspect-video w-full object-cover"
          />
        </div>

        <div className="prose prose-invert mt-10 max-w-none">
          <p className="whitespace-pre-line text-base leading-relaxed text-body">{body}</p>
        </div>

        {metrics.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-semibold text-ink">{t.caseStudy.metricsTitle}</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-3">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-edge bg-panel p-4 text-center"
                >
                  <dt className="text-xs uppercase tracking-wider text-faint">{m.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-orange-400">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-2">
          {tagList.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-edge-strong bg-wash px-2.5 py-1 text-[11px] font-medium text-body"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {project.demoUrl && project.demoUrl !== '#' && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white"
            >
              {t.caseStudy.liveDemo}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 px-6 py-3 text-sm font-bold uppercase tracking-wider text-orange-400"
            >
              {t.caseStudy.sourceCode}
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
