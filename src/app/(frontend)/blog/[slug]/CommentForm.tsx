'use client'

import React, { useState } from 'react'
import { submitComment } from './actions'
import { GlassSurface } from '@/components/GlassSurface'

export const CommentForm = ({ postId }: { postId: string }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    const formData = new FormData(e.currentTarget)
    formData.append('postId', postId)
    
    const res = await submitComment(formData)
    if (res.success) {
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } else {
      setStatus('error')
      setErrorMessage(res.error || 'Unknown error occurred')
    }
  }

  if (status === 'success') {
    return (
      <GlassSurface className="p-6 mt-8">
        <p className="text-green-500 dark:text-green-400 font-medium">Thank you! Your comment has been submitted and is awaiting moderation.</p>
      </GlassSurface>
    )
  }

  return (
    <GlassSurface className="p-6 mt-8">
      <h3 className="text-2xl font-bold mb-4">Leave a Comment</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input name="name" required type="text" className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Comment</label>
          <textarea name="content" required rows={3} className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"></textarea>
        </div>
        {status === 'error' && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-2 px-6 rounded-lg transition-colors w-max"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </GlassSurface>
  )
}
