// @ts-ignore `.open-next/worker.js` is generated at build time
import { default as handler } from './.open-next/worker.js'
import { pruneExpiredContactData } from './src/lib/contact-retention'

interface RetentionEnvironment {
  DB: D1Database
}

export default {
  fetch: handler.fetch,

  async scheduled(event: ScheduledController, env: RetentionEnvironment) {
    const result = await pruneExpiredContactData(env.DB, new Date(event.scheduledTime))
    console.info(
      `[privacy-retention] Removed ${result.deletedMessages} expired contact messages and ${result.deletedRateLimitBuckets} expired rate-limit records`
    )
  },
} satisfies ExportedHandler<RetentionEnvironment>

// @ts-ignore `.open-next/worker.js` is generated at build time
export { BucketCachePurge, DOQueueHandler, DOShardedTagCache } from './.open-next/worker.js'
