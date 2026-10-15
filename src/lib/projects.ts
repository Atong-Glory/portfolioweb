export const SAMPLE_PROJECT_SLUGS = [
  'analytics-dashboard',
  'e-commerce-platform',
  'task-management-app',
] as const

export const SAMPLE_TESTIMONIAL_NAMES = [
  'Sarah Johnson',
  'Michael Chen',
  'Emily Rodriguez',
] as const

export function isSampleProjectSlug(slug: string): boolean {
  return (SAMPLE_PROJECT_SLUGS as readonly string[]).includes(slug)
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export type ProjectMetric = { label: string; value: string }

export function parseProjectMetrics(raw: string | null | undefined): ProjectMetric[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item): item is ProjectMetric =>
        typeof item === 'object' &&
        item !== null &&
        'label' in item &&
        'value' in item &&
        typeof (item as ProjectMetric).label === 'string' &&
        typeof (item as ProjectMetric).value === 'string'
    )
  } catch {
    return []
  }
}
