import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access/isLoggedIn'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'post', 'createdAt'],
  },
  access: {
    // Anyone can create (submit comment)
    create: () => true,
    // Approved comments are readable by anyone
    read: () => true,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      index: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
