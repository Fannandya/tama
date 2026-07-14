import React from 'react'
import { getCachedPostBySlug, getCachedPosts } from '@/lib/data'
import { notFound } from 'next/navigation'
import { GlassSurface } from '@/components/GlassSurface'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getCachedPostBySlug(slug)
  if (!post) return { title: 'Not Found' }
  return { title: post.title }
}

export async function generateStaticParams() {
  const posts = await getCachedPosts()
  return posts.map((post: any) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getCachedPostBySlug(slug)
  if (!post) notFound()

  return (
    <article>
      <GlassSurface className="p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        {post.publishedAt && (
          <p className="text-white/50 mb-8">{new Date(post.publishedAt).toLocaleDateString()}</p>
        )}
        <div className="prose prose-invert max-w-none">
          <p>Post content goes here (Requires Lexical HTML renderer).</p>
        </div>
      </GlassSurface>
    </article>
  )
}
