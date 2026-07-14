import React from 'react'
import { getCachedProjectBySlug, getCachedProjects } from '@/lib/data'
import { notFound } from 'next/navigation'
import { GlassSurface } from '@/components/GlassSurface'
import type { Project } from '@/payload-types'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getCachedProjectBySlug(slug)
  if (!project) return { title: 'Not Found' }
  return { title: project.name }
}

export async function generateStaticParams() {
  const projects = await getCachedProjects()
  return projects.map((project: Project) => ({ slug: project.slug }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getCachedProjectBySlug(slug)
  if (!project) notFound()

  return (
    <article>
      <GlassSurface className="p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.name}</h1>
        <div className="flex gap-4 mb-8">
          {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">GitHub</a>}
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Live Demo</a>}
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-white/80">{project.description}</p>
        </div>
      </GlassSurface>
    </article>
  )
}
