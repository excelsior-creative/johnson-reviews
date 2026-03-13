import { Block } from 'payload';

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to Action', plural: 'Call to Actions' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'primaryButtonLabel', type: 'text' },
    { name: 'primaryButtonUrl', type: 'text' },
    { name: 'secondaryButtonLabel', type: 'text' },
    { name: 'secondaryButtonUrl', type: 'text' },
    {
      name: 'theme',
      type: 'select',
      options: [
        { label: 'Brand', value: 'brand' },
        { label: 'Dark', value: 'dark' },
        { label: 'White', value: 'white' },
      ],
      defaultValue: 'brand',
    },
  ],
};
