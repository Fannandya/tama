import React from 'react'
import { GlassSurface } from '@/components/GlassSurface'

export const metadata = { title: 'About Me' }

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      <GlassSurface className="p-8">
        <p className="text-lg text-white/80 leading-relaxed">
          I am a Full-Stack Engineer and Architect specializing in Next.js and PayloadCMS.
          Welcome to my monolithic portfolio. I enjoy building scalable and beautiful web applications
          using modern technologies like React, Tailwind CSS, and Serverless databases.
        </p>
      </GlassSurface>
    </div>
  )
}
