import { unstable_cache } from 'next/cache'
import { getPayloadClient } from './payload'
import type { Post, Project, Comment } from '@/payload-types'

export const getCachedPosts = unstable_cache(
  async (): Promise<Post[]> => {
    const payload = await getPayloadClient()
    const data = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
    })
    return data.docs as Post[]
  },
  ['posts_list'],
  { tags: ['posts'] }
)

export const getCachedPostBySlug = (slug: string) => unstable_cache(
  async (): Promise<Post | null> => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' }
      }
    })
    return (result.docs[0] as Post) || null
  },
  [`post_${slug}`],
  { tags: [`posts_${slug}`] }
)()

export const getCachedProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const payload = await getPayloadClient()
    const data = await payload.find({
      collection: 'projects',
      where: {
        status: {
          equals: 'published',
        },
      },
    })
    return data.docs as Project[]
  },
  ['projects_list'],
  { tags: ['projects'] }
)

export const getCachedProjectBySlug = (slug: string) => unstable_cache(
  async (): Promise<Project | null> => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' }
      }
    })
    return (result.docs[0] as Project) || null
  },
  [`project_${slug}`],
  { tags: [`projects_${slug}`] }
)()

export const getCachedComments = (postId: string) => unstable_cache(
  async (): Promise<Comment[]> => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'comments',
      where: {
        post: { equals: postId },
        status: { equals: 'approved' }
      },
      sort: '-createdAt'
    })
    return result.docs as Comment[]
  },
  [`comments_${postId}`],
  { tags: [`comments_${postId}`] }
)()
