import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'businessName',
    defaultColumns: ['businessName', 'rating', 'reviewDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'googleReviewId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'The raw reviewId from Google',
      },
    },
    {
      name: 'businessName',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Auto-generated from businessName',
      },
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'reviewDate',
      type: 'text',
      admin: {
        description: 'Relative date string from Google (e.g. "4 months ago")',
      },
    },
    {
      name: 'reviewText',
      type: 'textarea',
    },
    {
      name: 'photos',
      type: 'array',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'totalPhotoCount',
      type: 'number',
    },
  ],
}
