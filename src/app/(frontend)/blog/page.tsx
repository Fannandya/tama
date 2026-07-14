import React from 'react'
import { GlassSurface } from '@/components/GlassSurface'
import { getCachedPosts } from '@/lib/data'
import Link from 'next/link'

export const metadata = { title: 'Blog' }

export default async function BlogPage() {
  const posts = await getCachedPosts()

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="flex flex-col gap-6">
        {posts.map((post: any) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <GlassSurface className="p-6 hover:bg-white/20 transition-colors cursor-pointer">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              {post.publishedAt && (
                <p className="text-sm text-white/50 mb-4">{new Date(post.publishedAt).toLocaleDateString()}</p>
              )}
            </GlassSurface>
          </Link>
        ))}
      </div>
    </div>
  )
}
