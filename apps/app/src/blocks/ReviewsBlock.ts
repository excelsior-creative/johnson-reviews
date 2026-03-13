import { Block } from 'payload';

export const ReviewsBlock: Block = {
  slug: 'reviews',
  labels: { singular: 'Reviews Section', plural: 'Reviews Sections' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'displayMode',
      type: 'select',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'List', value: 'list' },
      ],
      defaultValue: 'grid',
    },
    { name: 'limit', type: 'number', defaultValue: 6, admin: { description: 'Number of reviews to show' } },
    {
      name: 'filterByCategory',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: { description: 'Leave blank to show all categories' },
    },
  ],
};
