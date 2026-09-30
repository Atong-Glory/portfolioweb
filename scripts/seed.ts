// Seed script — populates projects & testimonials shown on the portfolio
// Run: npm run db:seed (local SQLite) — set USE_SQLITE=1 for explicit SQLite
import { PrismaClient } from '@prisma/client'
import { slugifyTitle } from '../src/lib/projects'

const db = new PrismaClient()

const projects = [
  {
    title: 'Analytics Dashboard',
    slug: 'analytics-dashboard',
    description:
      'Real-time SaaS analytics platform with interactive charts, custom report builders and role-based access. Streams 50k+ daily events into live KPI visualizations.',
    descriptionFr:
      'Plateforme d’analytique SaaS en temps réel avec graphiques interactifs, générateur de rapports personnalisés et accès par rôles. Traite plus de 50 000 événements quotidiens en visualisations KPI en direct.',
    longDescription:
      'Built a multi-tenant analytics hub where product teams compose dashboards from reusable chart blocks. Event ingestion uses batched writes to keep p95 query times under 120ms even at peak traffic.',
    longDescriptionFr:
      'Hub analytique multi-locataire où les équipes produit composent des tableaux de bord à partir de blocs réutilisables. L’ingestion par lots maintient le p95 sous 120 ms aux heures de pointe.',
    metrics: JSON.stringify([
      { label: 'Daily events', value: '50k+' },
      { label: 'Dashboard load', value: '< 1.2s' },
      { label: 'Active tenants', value: '120+' },
    ]),
    image: '/images/project-analytics.png',
    tags: 'React,TypeScript,Recharts,Tailwind CSS',
    category: 'Data Visualization',
    categoryFr: 'Visualisation de données',
    demoUrl: '#',
    githubUrl: 'https://github.com/atongglory',
    featured: true,
    sortOrder: 1,
  },
  {
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    description:
      'Full-featured storefront with cart, Stripe checkout, inventory admin and order tracking. Handles 10k+ SKUs with optimized image pipelines and SSR product pages.',
    descriptionFr:
      'Boutique complète avec panier, paiement Stripe, gestion des stocks et suivi des commandes. Gère plus de 10 000 références avec pipelines d’images optimisés et pages produits SSR.',
    longDescription:
      'End-to-end commerce stack with SSR product detail pages, edge-friendly image variants, and an admin console for inventory and fulfillment workflows.',
    longDescriptionFr:
      'Stack commerce de bout en bout avec pages produit SSR, variantes d’images optimisées et console admin pour stocks et expéditions.',
    metrics: JSON.stringify([
      { label: 'SKUs', value: '10k+' },
      { label: 'Checkout conversion', value: '+18%' },
      { label: 'Lighthouse perf', value: '92' },
    ]),
    image: '/images/project-ecommerce.png',
    tags: 'Next.js,Node.js,MongoDB,Stripe',
    category: 'E-Commerce',
    categoryFr: 'E-Commerce',
    demoUrl: '#',
    githubUrl: 'https://github.com/atongglory',
    featured: true,
    sortOrder: 2,
  },
  {
    title: 'Task Management App',
    slug: 'task-management-app',
    description:
      'Collaborative kanban workspace with drag-and-drop boards, real-time presence, comments and sprint analytics. Synced across devices via WebSockets.',
    descriptionFr:
      'Espace de travail kanban collaboratif avec tableaux glisser-déposer, présence en temps réel, commentaires et analyses de sprints. Synchronisé entre appareils via WebSockets.',
    longDescription:
      'Realtime kanban with optimistic UI moves, presence indicators, and sprint burndown widgets. WebSocket fan-out keeps boards in sync across desktop and mobile.',
    longDescriptionFr:
      'Kanban temps réel avec déplacements optimistes, présence en direct et widgets burndown. La diffusion WebSocket synchronise les tableaux sur tous les appareils.',
    metrics: JSON.stringify([
      { label: 'Concurrent users', value: '2k' },
      { label: 'Sync latency', value: '< 80ms' },
      { label: 'Mobile sessions', value: '45%' },
    ]),
    image: '/images/project-taskapp.png',
    tags: 'React,Firebase,Tailwind CSS,dnd-kit',
    category: 'Productivity',
    categoryFr: 'Productivité',
    demoUrl: '#',
    githubUrl: 'https://github.com/atongglory',
    featured: true,
    sortOrder: 3,
  },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO',
    roleFr: 'PDG',
    company: 'TechStart Inc.',
    quote:
      'Atong delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise are outstanding.',
    quoteFr:
      'Atong a livré une application web exceptionnelle qui a dépassé nos attentes. Son souci du détail et son expertise technique sont remarquables.',
    rating: 5,
    initials: 'SJ',
    gradient: 'from-orange-500 to-amber-600',
    sortOrder: 1,
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    roleFr: 'Directeur technique',
    company: 'InnovateLab',
    quote:
      "He's professional, communicative, and delivers high-quality work on time. A rare engineer who cares about both code and business outcomes.",
    quoteFr:
      'Il est professionnel, communicatif et livre un travail de haute qualité dans les délais. Un ingénieur rare qui se soucie à la fois du code et des résultats commerciaux.',
    rating: 5,
    initials: 'MC',
    gradient: 'from-amber-500 to-orange-600',
    sortOrder: 2,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    roleFr: 'Cheffe de produit',
    company: 'GrowthCo',
    quote:
      'Atong transformed our idea into a powerful application. His problem-solving skills and clean code approach are impressive.',
    quoteFr:
      'Atong a transformé notre idée en une application puissante. Ses compétences en résolution de problèmes et son approche du code propre sont impressionnantes.',
    rating: 5,
    initials: 'ER',
    gradient: 'from-yellow-500 to-orange-600',
    sortOrder: 3,
  },
]

async function main() {
  for (const p of projects) {
    const slug = p.slug ?? slugifyTitle(p.title)
    await db.project.upsert({
      where: { title: p.title },
      update: { ...p, slug },
      create: { ...p, slug },
    })
  }
  console.log(`Seeded/refreshed ${projects.length} projects`)

  for (const tst of testimonials) {
    await db.testimonial.upsert({
      where: { name: tst.name },
      update: { ...tst },
      create: { ...tst },
    })
  }
  console.log(`Seeded/refreshed ${testimonials.length} testimonials`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
