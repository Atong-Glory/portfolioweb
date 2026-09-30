-- DevFusion Portfolio — Cloudflare D1 Seed Data
-- Run against a local D1:  npm run db:seed:d1
-- Run against remote D1:   wrangler d1 execute devfusion-portfolio --remote --file=./prisma/d1-seed.sql
--
-- Uses INSERT OR REPLACE so it is safe to re-run (idempotent).
-- Matches the data in scripts/seed.ts exactly.

-- ─── Projects ────────────────────────────────────────────────────────────────
INSERT OR REPLACE INTO "Project"
  ("id","title","slug","description","descriptionFr","longDescription","longDescriptionFr","metrics","image","tags","category","categoryFr","demoUrl","githubUrl","featured","sortOrder","createdAt")
VALUES
  (
    'seed-project-1',
    'Analytics Dashboard',
    'analytics-dashboard',
    'Real-time SaaS analytics platform with interactive charts, custom report builders and role-based access. Streams 50k+ daily events into live KPI visualizations.',
    'Plateforme d''analytique SaaS en temps réel avec graphiques interactifs, générateur de rapports personnalisés et accès par rôles. Traite plus de 50 000 événements quotidiens en visualisations KPI en direct.',
    'Built a multi-tenant analytics hub where product teams compose dashboards from reusable chart blocks. Event ingestion uses batched writes to keep p95 query times under 120ms even at peak traffic.',
    'Hub analytique multi-locataire où les équipes produit composent des tableaux de bord à partir de blocs réutilisables. L''ingestion par lots maintient le p95 sous 120 ms aux heures de pointe.',
    '[{"label":"Daily events","value":"50k+"},{"label":"Dashboard load","value":"< 1.2s"},{"label":"Active tenants","value":"120+"}]',
    '/images/project-analytics.png',
    'React,TypeScript,Recharts,Tailwind CSS',
    'Data Visualization',
    'Visualisation de données',
    '#',
    'https://github.com/atongglory',
    1,
    1,
    CURRENT_TIMESTAMP
  ),
  (
    'seed-project-2',
    'E-Commerce Platform',
    'e-commerce-platform',
    'Full-featured storefront with cart, Stripe checkout, inventory admin and order tracking. Handles 10k+ SKUs with optimized image pipelines and SSR product pages.',
    'Boutique complète avec panier, paiement Stripe, gestion des stocks et suivi des commandes. Gère plus de 10 000 références avec pipelines d''images optimisés et pages produits SSR.',
    'End-to-end commerce stack with SSR product detail pages, edge-friendly image variants, and an admin console for inventory and fulfillment workflows.',
    'Stack commerce de bout en bout avec pages produit SSR, variantes d''images optimisées et console admin pour stocks et expéditions.',
    '[{"label":"SKUs","value":"10k+"},{"label":"Checkout conversion","value":"+18%"},{"label":"Lighthouse perf","value":"92"}]',
    '/images/project-ecommerce.png',
    'Next.js,Node.js,MongoDB,Stripe',
    'E-Commerce',
    'E-Commerce',
    '#',
    'https://github.com/atongglory',
    1,
    2,
    CURRENT_TIMESTAMP
  ),
  (
    'seed-project-3',
    'Task Management App',
    'task-management-app',
    'Collaborative kanban workspace with drag-and-drop boards, real-time presence, comments and sprint analytics. Synced across devices via WebSockets.',
    'Espace de travail kanban collaboratif avec tableaux glisser-déposer, présence en temps réel, commentaires et analyses de sprints. Synchronisé entre appareils via WebSockets.',
    'Realtime kanban with optimistic UI moves, presence indicators, and sprint burndown widgets. WebSocket fan-out keeps boards in sync across desktop and mobile.',
    'Kanban temps réel avec déplacements optimistes, présence en direct et widgets burndown. La diffusion WebSocket synchronise les tableaux sur tous les appareils.',
    '[{"label":"Concurrent users","value":"2k"},{"label":"Sync latency","value":"< 80ms"},{"label":"Mobile sessions","value":"45%"}]',
    '/images/project-taskapp.png',
    'React,Firebase,Tailwind CSS,dnd-kit',
    'Productivity',
    'Productivité',
    '#',
    'https://github.com/atongglory',
    1,
    3,
    CURRENT_TIMESTAMP
  );

-- ─── Testimonials ─────────────────────────────────────────────────────────────
INSERT OR REPLACE INTO "Testimonial"
  ("id","name","role","roleFr","company","quote","quoteFr","rating","initials","gradient","sortOrder","createdAt")
VALUES
  (
    'seed-tst-1',
    'Sarah Johnson',
    'CEO',
    'PDG',
    'TechStart Inc.',
    'Atong delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise are outstanding.',
    'Atong a livré une application web exceptionnelle qui a dépassé nos attentes. Son souci du détail et son expertise technique sont remarquables.',
    5,
    'SJ',
    'from-orange-500 to-amber-600',
    1,
    CURRENT_TIMESTAMP
  ),
  (
    'seed-tst-2',
    'Michael Chen',
    'CTO',
    'Directeur technique',
    'InnovateLab',
    'He''s professional, communicative, and delivers high-quality work on time. A rare engineer who cares about both code and business outcomes.',
    'Il est professionnel, communicatif et livre un travail de haute qualité dans les délais. Un ingénieur rare qui se soucie à la fois du code et des résultats commerciaux.',
    5,
    'MC',
    'from-amber-500 to-orange-600',
    2,
    CURRENT_TIMESTAMP
  ),
  (
    'seed-tst-3',
    'Emily Rodriguez',
    'Product Manager',
    'Cheffe de produit',
    'GrowthCo',
    'Atong transformed our idea into a powerful application. His problem-solving skills and clean code approach are impressive.',
    'Atong a transformé notre idée en une application puissante. Ses compétences en résolution de problèmes et son approche du code propre sont impressionnantes.',
    5,
    'ER',
    'from-yellow-500 to-orange-600',
    3,
    CURRENT_TIMESTAMP
  );

-- ─── Initial visitor stat row ─────────────────────────────────────────────────
INSERT OR IGNORE INTO "VisitorStat" ("id","path","views","updatedAt")
VALUES ('home', '/', 0, CURRENT_TIMESTAMP);
