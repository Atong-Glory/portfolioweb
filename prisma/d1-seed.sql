-- RHIZORA TECH Portfolio — Cloudflare D1 Seed Data
-- Apply only after the D1 schema matches prisma/schema.prisma.
-- Run against a local D1:  npm run db:seed:d1
-- Run against remote D1:   wrangler d1 execute rhizora-tech-portfolio --remote --file=./prisma/d1-seed.sql
--
-- Removes only the known example rows from the original template and seeds the
-- repository-backed portfolio project. No remote database is changed by builds.

DELETE FROM "Project"
WHERE "id" IN ('seed-project-1', 'seed-project-2', 'seed-project-3')
   OR "title" IN ('Analytics Dashboard', 'E-Commerce Platform', 'Task Management App');

DELETE FROM "Testimonial"
WHERE "id" IN ('seed-tst-1', 'seed-tst-2', 'seed-tst-3')
   OR "name" IN ('Sarah Johnson', 'Michael Chen', 'Emily Rodriguez');

INSERT OR REPLACE INTO "Project"
  ("id","title","slug","description","descriptionFr","longDescription","longDescriptionFr","metrics","image","tags","category","categoryFr","demoUrl","githubUrl","featured","sortOrder","createdAt")
VALUES
  (
    'portfolio-project-1',
    'Bilingual Full-Stack Portfolio',
    'bilingual-full-stack-portfolio',
    'A bilingual Next.js application with typed UI, server routes, database-backed project content, an admin area, a contact form, and a Cloudflare deployment path.',
    'Une application Next.js bilingue avec interface typée, routes serveur, contenu de projets en base de données, espace d''administration, formulaire de contact et déploiement prévu pour Cloudflare.',
    'This self-directed project combines a responsive React interface, English and French content, Prisma-backed project and contact data, protected admin routes, and an OpenNext/Cloudflare deployment configuration. It is presented as a codebase to inspect and discuss; no client outcomes or performance metrics are claimed.',
    'Ce projet personnel associe une interface React adaptative, du contenu en anglais et en français, des données de projets et de contact gérées avec Prisma, des routes d''administration protégées et une configuration de déploiement OpenNext/Cloudflare. Le code est présenté pour être examiné et discuté, sans résultats clients ni mesures de performance revendiqués.',
    NULL,
    '/og-image.png',
    'Next.js,React,TypeScript,Prisma,Cloudflare D1',
    'Full-stack Application',
    'Application full-stack',
    NULL,
    NULL,
    1,
    1,
    CURRENT_TIMESTAMP
  );

INSERT OR IGNORE INTO "VisitorStat" ("id","path","views","updatedAt")
VALUES ('home', '/', 0, CURRENT_TIMESTAMP);
