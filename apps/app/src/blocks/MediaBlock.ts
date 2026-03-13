import { Block } from 'payload';

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: { singular: 'Media', plural: 'Media Blocks' },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'size',
      type: 'select',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Full Width', value: 'full' },
      ],
      defaultValue: 'medium',
    },
  ],
};
