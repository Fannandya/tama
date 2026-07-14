import React from 'react'
import { GlassSurface } from '@/components/GlassSurface'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-br from-white to-white/50 text-transparent bg-clip-text">
          Welcome to the Future
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
          This is a demonstration of PayloadCMS v3 embedded within Next.js 15,
          styled with Tailwind CSS v4 and stunning Glassmorphism aesthetics.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/portfolio">
            <GlassSurface className="px-8 py-4 font-semibold hover:bg-white/20 transition-colors">
              View Portfolio
            </GlassSurface>
          </Link>
          <Link href="/blog">
            <GlassSurface className="px-8 py-4 font-semibold hover:bg-white/20 transition-colors">
              Read Blog
            </GlassSurface>
          </Link>
        </div>
      </section>
    </div>
  )
}
