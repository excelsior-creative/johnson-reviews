import { Block } from 'payload';

export const ContentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Content', plural: 'Content Blocks' },
  fields: [
    { name: 'richText', type: 'richText', required: true },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: 'Full Width', value: 'full' },
        { label: 'Centered (Narrow)', value: 'centered' },
      ],
      defaultValue: 'full',
    },
  ],
};
