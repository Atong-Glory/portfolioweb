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
