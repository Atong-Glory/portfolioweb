import { z } from 'zod'

export const contactSubmissionSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254),
    projectType: z.string().trim().max(120).optional(),
    budgetRange: z.string().trim().max(120).optional(),
    message: z.string().trim().min(10).max(5000),
    turnstileToken: z.string().trim().max(4096).optional(),
  })
  .strict()

export const contactReadStatusSchema = z
  .object({
    id: z.string().trim().min(1).max(120),
    isRead: z.boolean(),
  })
  .strict()

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>
