import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createSqliteClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

async function createD1Client(): Promise<PrismaClient> {
  const { getCloudflareContext } = await import('@opennextjs/cloudflare')
  const { PrismaD1 } = await import('@prisma/adapter-d1')
  const { env } = await getCloudflareContext({ async: true })
  const binding = (env as { DB?: D1Database }).DB
  if (!binding) {
    throw new Error('D1 binding "DB" is not configured on this environment')
  }
  return new PrismaClient({ adapter: new PrismaD1(binding) })
}

/** Resolves Prisma: Cloudflare D1 in Workers, file SQLite in local `next dev`. */
export async function getDb(): Promise<PrismaClient> {
  if (process.env.USE_SQLITE === '1') {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createSqliteClient()
    }
    return globalForPrisma.prisma
  }

  try {
    return await createD1Client()
  } catch {
    if (process.env.NODE_ENV === 'development') {
      if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = createSqliteClient()
      }
      return globalForPrisma.prisma
    }
    throw new Error('Database unavailable: configure D1 binding "DB" for production')
  }
}
