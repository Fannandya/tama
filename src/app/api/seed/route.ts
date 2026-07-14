import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ success: false, error: 'Seed endpoint is only available in development mode' }, { status: 403 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    // Seed Posts
    await payload.create({
      collection: 'posts',
      data: {
        title: 'Welcome to PayloadCMS v3',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [{ type: 'text', text: 'This is a published post seeded automatically.', format: 0, style: '', detail: 0, mode: 'normal', version: 1 }],
              }
            ],
            direction: 'ltr',
          },
        },
        status: 'published',
      },
    })

    await payload.create({
      collection: 'posts',
      data: {
        title: 'Draft Post Example',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [{ type: 'text', text: 'This is a draft post. Should not be visible to public.', format: 0, style: '', detail: 0, mode: 'normal', version: 1 }],
              }
            ],
            direction: 'ltr',
          },
        },
        status: 'draft',
      },
    })

    // Seed Projects
    await payload.create({
      collection: 'projects',
      data: {
        name: 'Portfolio Monolith',
        description: 'Single repository monolithic Next.js and PayloadCMS v3 setup.',
        status: 'published',
      },
    })

    await payload.create({
      collection: 'projects',
      data: {
        name: 'Secret Project X',
        description: 'This project is still a draft and shouldn\'t be visible yet.',
        status: 'draft',
      },
    })

    return NextResponse.json({ success: true, message: 'Seeding completed' })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
  }
}
