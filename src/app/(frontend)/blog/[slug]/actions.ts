'use server'

import { getPayloadClient } from '@/lib/payload'

export async function submitComment(formData: FormData) {
  const name = formData.get('name') as string
  const content = formData.get('content') as string
  const postId = formData.get('postId') as string

  if (!name || !content || !postId) {
    return { success: false, error: 'All fields are required.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'comments',
      data: {
        name,
        content,
        post: postId,
        status: 'pending',
      },
    })
    return { success: true }
  } catch (err) {
    console.error(err)
    return { success: false, error: 'Failed to submit comment. Please try again later.' }
  }
}
