import { MetadataRoute } from 'next'
import { getCachedPosts, getCachedProjects } from '@/lib/data'
import type { Post, Project } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  let posts: Post[] = []
  let projects: Project[] = []
  try {
    posts = await getCachedPosts()
    projects = await getCachedProjects()
  } catch {
    // Tables might not exist yet during first deploy
  }

  const postUrls: MetadataRoute.Sitemap = posts.map((post: Post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const projectUrls: MetadataRoute.Sitemap = projects.map((project: Project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(project.updatedAt || project.publishedAt || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...postUrls,
    ...projectUrls,
  ]
}
