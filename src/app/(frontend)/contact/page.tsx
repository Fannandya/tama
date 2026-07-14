import React from 'react'
import { GlassSurface } from '@/components/GlassSurface'

export const metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      <GlassSurface className="p-8 max-w-xl">
        <form className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Name</label>
            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
            <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Send Message
          </button>
        </form>
      </GlassSurface>
    </div>
  )
}
