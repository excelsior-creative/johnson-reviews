import { GlobalConfig } from 'payload';

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Navigation',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'ctaLabel', type: 'text', admin: { description: 'Header CTA button label' } },
    { name: 'ctaUrl', type: 'text', admin: { description: 'Header CTA button URL' } },
  ],
};
