import { unstable_cache } from 'next/cache'
import { getPayloadClient } from './payload'

export const getCachedPosts = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const data = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
    })
    return data.docs
  },
  ['posts_list'],
  { tags: ['posts'] }
)

export const getCachedPostBySlug = (slug: string) => unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' }
      }
    })
    return result.docs[0] || null
  },
  [`post_${slug}`],
  { tags: [`posts_${slug}`] }
)()

export const getCachedProjects = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const data = await payload.find({
      collection: 'projects',
      where: {
        status: {
          equals: 'published',
        },
      },
    })
    return data.docs
  },
  ['projects_list'],
  { tags: ['projects'] }
)

export const getCachedProjectBySlug = (slug: string) => unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' }
      }
    })
    return result.docs[0] || null
  },
  [`project_${slug}`],
  { tags: [`projects_${slug}`] }
)()
