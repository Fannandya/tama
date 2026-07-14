import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidateCollection = (
  collectionName: string
): CollectionAfterChangeHook | CollectionAfterDeleteHook => {
  return ({ doc, req: { payload } }) => {
    payload.logger.info(`Revalidating tag: ${collectionName}`)
    revalidateTag(collectionName)
    
    if (doc?.slug) {
      payload.logger.info(`Revalidating tag: ${collectionName}_${doc.slug}`)
      revalidateTag(`${collectionName}_${doc.slug}`)
    }
    
    return doc
  }
}
