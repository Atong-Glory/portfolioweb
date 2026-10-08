-- RHIZORA TECH Portfolio — Cloudflare D1 Schema
-- Run against a local D1:  npm run db:push:d1
-- Run against remote D1:   wrangler d1 execute RHIZORA TECH-portfolio --remote --file=./prisma/d1-schema.sql
--
-- This file mirrors prisma/schema.prisma exactly.
-- Re-generate after any schema change by running:
--   npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma \
--     --script --output prisma/d1-schema.sql

-- ─── Contact form inbox ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "ContactMessage" (
  "id"          TEXT      NOT NULL PRIMARY KEY,
  "name"        TEXT      NOT NULL,
  "email"       TEXT      NOT NULL,
  "projectType" TEXT      NOT NULL DEFAULT 'Not specified',
  "budgetRange" TEXT      NOT NULL DEFAULT 'Not specified',
  "message"     TEXT      NOT NULL,
  "isRead"      INTEGER   NOT NULL DEFAULT 0,
  "createdAt"   DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─── Portfolio projects ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Project" (
  "id"                TEXT      NOT NULL PRIMARY KEY,
  "title"             TEXT      NOT NULL UNIQUE,
  "slug"              TEXT      NOT NULL UNIQUE,
  "description"       TEXT      NOT NULL,
  "descriptionFr"     TEXT,
  "longDescription"   TEXT,
  "longDescriptionFr" TEXT,
  "metrics"           TEXT,
  "image"             TEXT      NOT NULL,
  "tags"              TEXT      NOT NULL,
  "category"          TEXT      NOT NULL DEFAULT 'Web App',
  "categoryFr"        TEXT,
  "demoUrl"           TEXT,
  "githubUrl"         TEXT,
  "featured"          INTEGER   NOT NULL DEFAULT 0,
  "sortOrder"         INTEGER   NOT NULL DEFAULT 0,
  "createdAt"         DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─── Client testimonials ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Testimonial" (
  "id"        TEXT      NOT NULL PRIMARY KEY,
  "name"      TEXT      NOT NULL UNIQUE,
  "role"      TEXT      NOT NULL,
  "roleFr"    TEXT,
  "company"   TEXT      NOT NULL,
  "quote"     TEXT      NOT NULL,
  "quoteFr"   TEXT,
  "rating"    INTEGER   NOT NULL DEFAULT 5,
  "initials"  TEXT      NOT NULL,
  "gradient"  TEXT      NOT NULL DEFAULT 'from-orange-500 to-amber-600',
  "sortOrder" INTEGER   NOT NULL DEFAULT 0,
  "createdAt" DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─── Visitor page-view counter ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "VisitorStat" (
  "id"        TEXT      NOT NULL PRIMARY KEY,
  "path"      TEXT      NOT NULL UNIQUE DEFAULT '/',
  "views"     INTEGER   NOT NULL DEFAULT 0,
  "updatedAt" DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─── IP rate-limit buckets for the contact form ───────────────────────────────
CREATE TABLE IF NOT EXISTS "RateLimitBucket" (
  "id"        TEXT      NOT NULL PRIMARY KEY,
  "count"     INTEGER   NOT NULL DEFAULT 1,
  "expiresAt" DATETIME  NOT NULL
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────
CREATE UNIQUE INDEX IF NOT EXISTS "Project_title_key"  ON "Project"("title");
CREATE UNIQUE INDEX IF NOT EXISTS "Project_slug_key"   ON "Project"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Testimonial_name_key" ON "Testimonial"("name");
CREATE UNIQUE INDEX IF NOT EXISTS "VisitorStat_path_key" ON "VisitorStat"("path");
