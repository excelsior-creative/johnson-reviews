import { CollectionConfig } from 'payload';
import { HeroBlock } from '../blocks/HeroBlock';
import { ContentBlock } from '../blocks/ContentBlock';
import { MediaBlock } from '../blocks/MediaBlock';
import { CTABlock } from '../blocks/CTABlock';
import { ReviewsBlock } from '../blocks/ReviewsBlock';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }: { data: any }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/pages/${data.slug}/preview`,
    },
  },
  versions: { drafts: true },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { _status: { equals: 'published' } };
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL path segment (e.g. "about" → /pages/about)',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, ContentBlock, MediaBlock, CTABlock, ReviewsBlock],
      required: true,
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};
