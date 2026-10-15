'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Reveal, SectionHeader } from './shared'
import { useI18n } from './language-provider'

type Project = {
  id: string
  title: string
  slug: string
  description: string
  descriptionFr: string | null
  image: string
  category: string
  categoryFr: string | null
  tagList: string[]
  demoUrl: string | null
  githubUrl: string | null
}

function isProject(value: unknown): value is Project {
  if (typeof value !== 'object' || value === null) return false
  const project = value as Record<string, unknown>
  return (
    typeof project.id === 'string' &&
    typeof project.title === 'string' &&
    typeof project.slug === 'string' &&
    typeof project.description === 'string' &&
    (typeof project.descriptionFr === 'string' || project.descriptionFr === null) &&
    typeof project.image === 'string' &&
    typeof project.category === 'string' &&
    (typeof project.categoryFr === 'string' || project.categoryFr === null) &&
    Array.isArray(project.tagList) &&
    project.tagList.every((tag) => typeof tag === 'string') &&
    (typeof project.demoUrl === 'string' || project.demoUrl === null) &&
    (typeof project.githubUrl === 'string' || project.githubUrl === null)
  )
}

function isProjectResponse(value: unknown): value is { success: true; projects: Project[] } {
  if (typeof value !== 'object' || value === null) return false
  const response = value as Record<string, unknown>
  return response.success === true && Array.isArray(response.projects) && response.projects.every(isProject)
}

export function Projects() {
  const { t, lang } = useI18n()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetch('/api/projects')
      .then(async (res) => {
        const data: unknown = await res.json()
        if (!res.ok || !isProjectResponse(data)) {
          throw new Error('Project response was not valid')
        }
        return data
      })
      .then(({ projects: data }) => {
        if (cancelled) return
        setProjects(data)
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [retry])

  return (
    <section id="projects" className="relative bg-base">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            label={t.projects.label}
            align="left"
            title={t.projects.title}
          />
          <Reveal delay={0.15} className="shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 px-5 py-2.5 text-[12px] font-bold uppercase tracking-wider text-orange-400 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10"
            >
              {t.projects.viewAll}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label={t.projects.loadingAria}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-edge bg-panel">
                <div className="aspect-video animate-pulse bg-wash" />
                <div className="p-6">
                  <div className="h-4 w-1/3 animate-pulse rounded bg-wash" />
                  <div className="mt-4 h-3 w-3/4 animate-pulse rounded bg-wash" />
                  <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-wash" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-edge bg-panel p-10 text-center text-soft" role="alert">
            <p>{t.projects.error}</p>
            <button
              type="button"
              onClick={() => {
                setError(false)
                setLoading(true)
                setRetry((current) => current + 1)
              }}
              className="rounded-full border border-orange-500/40 px-5 py-2 text-sm font-semibold text-orange-400 hover:bg-orange-500/10"
            >
              {t.projects.retry}
            </button>
          </div>
        )}

        {/* Project cards (fetched from the database) */}
        {!loading && !error && (
          projects.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, i) => {
                const title = project.title
                const description =
                  lang === 'fr' ? project.descriptionFr ?? project.description : project.description
                const category =
                  lang === 'fr'
                    ? project.categoryFr ?? t.projects.categories[project.category] ?? project.category
                    : project.category

                return (
                  <Reveal key={project.id} delay={i * 0.1} className="h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-panel transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-[0_16px_48px_rgba(249,115,22,0.12)]">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={t.projects.previewAlt(title)}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent opacity-80"
                          aria-hidden="true"
                        />
                        <span className="absolute left-4 top-4 rounded-full border border-orange-500/30 bg-base/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 backdrop-blur-sm">
                          {category}
                        </span>
                        {project.demoUrl && project.demoUrl !== '#' && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t.projects.demoAria(title)}
                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white opacity-0 shadow-lg transition-all duration-300 hover:bg-orange-600 group-hover:opacity-100"
                          >
                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          </a>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-soft">{description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tagList.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-edge-strong bg-wash px-2.5 py-1 text-[11px] font-medium text-body"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/projects/${project.slug}`}
                          className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-orange-400 transition-colors duration-200 hover:text-orange-300"
                        >
                          {t.projects.caseStudy}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          ) : (
            <p className="mt-12 rounded-2xl border border-edge bg-panel p-8 text-center text-soft">
              {t.projects.empty}
            </p>
          )
        )}
      </div>
    </section>
  )
}
