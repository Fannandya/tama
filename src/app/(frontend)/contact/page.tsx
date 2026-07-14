'use client'

import React, { useState } from 'react'
import { GlassSurface } from '@/components/GlassSurface'
import { submitContactForm } from './actions'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    const formData = new FormData(e.currentTarget)
    
    const res = await submitContactForm(formData)
    if (res.success) {
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } else {
      setStatus('error')
      setErrorMessage(res.error || 'Unknown error occurred')
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      <GlassSurface className="p-8 max-w-xl">
        {status === 'success' ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h2>
            <p className="text-white/80">Thank you for reaching out. I will get back to you soon.</p>
            <button onClick={() => setStatus('idle')} className="mt-6 text-blue-400 hover:underline">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Name</label>
              <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
              <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
              <textarea name="message" required rows={5} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"></textarea>
            </div>
            {status === 'error' && <p className="text-red-400 text-sm">{errorMessage}</p>}
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </GlassSurface>
    </div>
  )
}
