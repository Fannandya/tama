import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

type RevalidateHook = (args: { doc: Record<string, unknown>; req: { payload: { logger: { info: (msg: string) => void } } } }) => Record<string, unknown>

const createRevalidateHook = (collectionName: string): RevalidateHook => {
  return ({ doc, req: { payload } }) => {
    payload.logger.info(`Revalidating tag: ${collectionName}`)
    revalidateTag(collectionName)
    
    if (doc?.slug) {
      payload.logger.info(`Revalidating tag: ${collectionName}_${doc.slug as string}`)
      revalidateTag(`${collectionName}_${doc.slug as string}`)
    }
    
    return doc
  }
}

export const revalidateCollection = {
  afterChange: (collectionName: string): CollectionAfterChangeHook =>
    createRevalidateHook(collectionName) as unknown as CollectionAfterChangeHook,
  afterDelete: (collectionName: string): CollectionAfterDeleteHook =>
    createRevalidateHook(collectionName) as unknown as CollectionAfterDeleteHook,
}
