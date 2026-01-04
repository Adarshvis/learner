import type { Block } from 'payload'

export const socialFeedBlock: Block = {
  slug: 'socialFeed',
  labels: {
    singular: 'Social Feed',
    plural: 'Social Feeds',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        { label: 'Instagram', value: 'instagram' },
        { label: 'Twitter/X', value: 'twitter' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'LinkedIn', value: 'linkedin' },
      ],
    },
    {
      name: 'username',
      type: 'text',
      required: false,
      admin: {
        description: 'Social media username or handle',
      },
    },
    {
      name: 'embedCode',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Embed code from the social platform',
      },
    },
    {
      name: 'postLimit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 12,
      admin: {
        description: 'Number of posts to display',
      },
    },
  ],
}
