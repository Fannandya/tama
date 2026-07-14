'use client'

import React from 'react'
import { GlassSurface } from '@/components/GlassSurface'

export default function Error({
  _error,
  reset,
}: {
  _error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <GlassSurface className="p-12 text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-white/60 mb-8">
          An unexpected error occurred. Please try again later.
        </p>
        <button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </GlassSurface>
    </div>
  )
}
