import { z } from 'zod'

const nullableText = z.string().trim().nullable().optional()
const optionalUrl = z
  .string()
  .url()
  .refine((value) => value.startsWith('https://') || value.startsWith('http://'))
  .nullable()
  .optional()

const projectFields = {
  title: z.string().trim().min(1).max(160),
  slug: z.string().trim().min(1).max(180),
  description: z.string().trim().max(5000),
  descriptionFr: nullableText,
  longDescription: nullableText,
  longDescriptionFr: nullableText,
  metrics: z.string().max(5000).nullable().optional(),
  image: z.string().trim().min(1).max(500),
  tags: z.string().trim().max(1000),
  category: z.string().trim().min(1).max(120),
  categoryFr: nullableText,
  demoUrl: optionalUrl,
  githubUrl: optionalUrl,
  featured: z.boolean(),
  sortOrder: z.number().int().min(0),
}

export const createProjectSchema = z.object({
  ...projectFields,
  slug: projectFields.slug.optional(),
  description: projectFields.description.default(''),
  descriptionFr: nullableText.default(null),
  longDescription: nullableText.default(null),
  longDescriptionFr: nullableText.default(null),
  metrics: projectFields.metrics.default(null),
  image: projectFields.image.default('/og-image.png'),
  tags: projectFields.tags.default(''),
  category: projectFields.category.default('Full-stack Application'),
  categoryFr: nullableText.default(null),
  demoUrl: optionalUrl.default(null),
  githubUrl: optionalUrl.default(null),
  featured: projectFields.featured.default(false),
  sortOrder: projectFields.sortOrder.default(0),
})

export const updateProjectSchema = z.object(projectFields).partial().strict()

const testimonialFields = {
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(120),
  roleFr: nullableText,
  company: z.string().trim().min(1).max(160),
  quote: z.string().trim().min(1).max(3000),
  quoteFr: nullableText,
  rating: z.number().int().min(1).max(5),
  initials: z.string().trim().min(1).max(5),
  gradient: z.string().trim().min(1).max(160),
  sortOrder: z.number().int().min(0),
}

export const createTestimonialSchema = z.object({
  ...testimonialFields,
  roleFr: nullableText.default(null),
  quoteFr: nullableText.default(null),
  rating: testimonialFields.rating.default(5),
  gradient: testimonialFields.gradient.default('from-orange-500 to-amber-600'),
  sortOrder: testimonialFields.sortOrder.default(0),
})

export const updateTestimonialSchema = z.object(testimonialFields).partial().strict()
