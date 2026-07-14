import type { Access } from 'payload'

export const isPublishedOrAdmin: Access = ({ req: { user } }) => {
  if (user) return true

  return {
    status: {
      equals: 'published',
    },
  }
}
