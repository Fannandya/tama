'use server'

import { getPayloadClient } from '@/lib/payload'

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'messages',
      data: {
        name,
        email,
        message,
      },
    })
    return { success: true }
  } catch (err) {
    console.error(err)
    return { success: false, error: 'Failed to submit message. Please try again later.' }
  }
}
