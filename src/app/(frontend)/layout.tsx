import React from 'react'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './styles.css'
import { GlassSurface } from '@/components/GlassSurface'

export const metadata = {
  title: 'Portfolio & Website',
  description: 'Single repository monolithic Next.js and PayloadCMS v3 setup.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="relative min-h-screen bg-neutral-950 text-white overflow-x-hidden">
        {/* Gradient Mesh Background */}
        <div className="fixed inset-0 z-[-1] bg-neutral-950">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/30 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/30 blur-[120px]"></div>
        </div>

        <nav className="fixed top-0 left-0 right-0 z-50 p-4">
          <GlassSurface className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight">Portfolio</Link>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
              <Link href="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
              <Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
            </div>
          </GlassSurface>
        </nav>

        <main className="pt-32 pb-16 px-4 max-w-5xl mx-auto">
          {children}
        </main>
        
        {/* Vercel Monitoring */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
