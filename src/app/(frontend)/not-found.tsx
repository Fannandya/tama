import React from 'react'
import Link from 'next/link'
import { GlassSurface } from '@/components/GlassSurface'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <GlassSurface className="p-12 text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-white/60 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Go Home
        </Link>
      </GlassSurface>
    </div>
  )
}
