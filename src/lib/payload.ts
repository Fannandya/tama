import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const getPayloadClient = async () => {
  return await getPayload({ config: configPromise })
}

export const getPublishedPosts = async () => {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
  })
}

export const getPublishedProjects = async () => {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'projects',
    overrideAccess: false,
  })
}
