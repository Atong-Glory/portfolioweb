// Seed script — populates projects & testimonials shown on the portfolio
// Run: npm run db:seed (local SQLite) — set USE_SQLITE=1 for explicit SQLite
import { PrismaClient } from '@prisma/client'
import {
  SAMPLE_PROJECT_SLUGS,
  SAMPLE_TESTIMONIAL_NAMES,
  slugifyTitle,
} from '../src/lib/projects'

const db = new PrismaClient()

const projects = [
  {
    title: 'Bilingual Full-Stack Portfolio',
    slug: 'bilingual-full-stack-portfolio',
    description:
      'A bilingual Next.js application with typed UI, server routes, database-backed project content, an admin area, a contact form, and a Cloudflare deployment path.',
    descriptionFr:
      'Une application Next.js bilingue avec interface typée, routes serveur, contenu de projets en base de données, espace d’administration, formulaire de contact et déploiement prévu pour Cloudflare.',
    longDescription:
      'This self-directed project combines a responsive React interface, English and French content, Prisma-backed project and contact data, protected admin routes, and an OpenNext/Cloudflare deployment configuration. It is presented as a codebase to inspect and discuss; no client outcomes or performance metrics are claimed.',
    longDescriptionFr:
      'Ce projet personnel associe une interface React adaptative, du contenu en anglais et en français, des données de projets et de contact gérées avec Prisma, des routes d’administration protégées et une configuration de déploiement OpenNext/Cloudflare. Le code est présenté pour être examiné et discuté, sans résultats clients ni mesures de performance revendiqués.',
    metrics: null,
    image: '/og-image.png',
    tags: 'Next.js,React,TypeScript,Prisma,Cloudflare D1',
    category: 'Full-stack Application',
    categoryFr: 'Application full-stack',
    demoUrl: null,
    githubUrl: null,
    featured: true,
    sortOrder: 1,
  },
]

async function main() {
  await db.project.deleteMany({
    where: { slug: { in: [...SAMPLE_PROJECT_SLUGS] } },
  })
  await db.testimonial.deleteMany({
    where: { name: { in: [...SAMPLE_TESTIMONIAL_NAMES] } },
  })

  for (const p of projects) {
    const slug = p.slug ?? slugifyTitle(p.title)
    await db.project.upsert({
      where: { title: p.title },
      update: { ...p, slug },
      create: { ...p, slug },
    })
  }
  console.log(`Seeded/refreshed ${projects.length} repository-backed project`)
  console.log('Removed unverified sample testimonials')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
