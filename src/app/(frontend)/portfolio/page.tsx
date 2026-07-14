import React from 'react'
import { GlassSurface } from '@/components/GlassSurface'
import { getCachedProjects } from '@/lib/data'
import Link from 'next/link'

export const metadata = { title: 'Portfolio' }

export default async function PortfolioPage() {
  const projects = await getCachedProjects()

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project: any) => (
          <Link key={project.id} href={`/portfolio/${project.slug}`}>
            <GlassSurface className="p-6 hover:scale-[1.02] transition-transform cursor-pointer h-full">
              <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>
              <p className="text-white/70 line-clamp-3">{project.description}</p>
            </GlassSurface>
          </Link>
        ))}
      </div>
    </div>
  )
}
