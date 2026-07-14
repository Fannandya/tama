import { MetadataRoute } from 'next'
import { getCachedPosts, getCachedProjects } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  const posts = await getCachedPosts()
  const projects = await getCachedProjects()

  const postUrls: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const projectUrls: MetadataRoute.Sitemap = projects.map((project: any) => ({
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
