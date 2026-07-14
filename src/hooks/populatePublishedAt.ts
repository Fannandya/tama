import type { CollectionBeforeChangeHook } from 'payload'

export const populatePublishedAt: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (operation === 'create' || operation === 'update') {
    if (data.status === 'published' && !data.publishedAt) {
      return {
        ...data,
        publishedAt: new Date().toISOString(),
      }
    }
    if (data.status === 'draft') {
      return {
        ...data,
        publishedAt: null,
      }
    }
  }
  return data
}
