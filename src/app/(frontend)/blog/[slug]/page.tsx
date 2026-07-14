import React from 'react'
import { getCachedPostBySlug, getCachedComments } from '@/lib/data'
import { notFound } from 'next/navigation'
import { GlassSurface } from '@/components/GlassSurface'
import { CommentForm } from './CommentForm'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { Comment } from '@/payload-types'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getCachedPostBySlug(slug)
  if (!post) return { title: 'Not Found' }
  return { title: post.title }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getCachedPostBySlug(slug)
  if (!post) notFound()
  
  const comments = await getCachedComments(post.id)
  const contentHtml = post.content ? convertLexicalToHTML({ data: post.content }) : ''

  return (
    <article className="max-w-3xl mx-auto">
      <GlassSurface className="p-8 md:p-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        {post.publishedAt && (
          <p className="text-black/50 dark:text-white/50 mb-8">{new Date(post.publishedAt).toLocaleDateString()}</p>
        )}
        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </GlassSurface>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Comments ({comments.length})</h2>
        {comments.length > 0 ? (
          <div className="flex flex-col gap-4">
            {comments.map((comment: Comment) => (
              <GlassSurface key={comment.id} className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold">{comment.name}</span>
                  <span className="text-xs text-black/50 dark:text-white/50">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-black/80 dark:text-white/80">{comment.content}</p>
              </GlassSurface>
            ))}
          </div>
        ) : (
          <p className="text-black/60 dark:text-white/60">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>

      <CommentForm postId={post.id} />
    </article>
  )
}
