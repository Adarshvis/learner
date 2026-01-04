import type { Block } from 'payload'

export const statsBlock: Block = {
  slug: 'stats',
  labels: {
    singular: 'Statistics Block',
    plural: 'Statistics Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          admin: {
            description: 'Statistic number (e.g., "10K+", "95%")',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Stat description (e.g., "Students Enrolled")',
          },
        },
        {
          name: 'icon',
          type: 'select',
          required: false,
          options: [
            { label: 'People', value: 'bi-people' },
            { label: 'Book', value: 'bi-book' },
            { label: 'Award', value: 'bi-award' },
            { label: 'Star', value: 'bi-star' },
            { label: 'Trophy', value: 'bi-trophy' },
            { label: 'Graph Up', value: 'bi-graph-up' },
            { label: 'Mortarboard', value: 'bi-mortarboard' },
            { label: 'Play Circle', value: 'bi-play-circle' },
          ],
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Horizontal', value: 'horizontal' },
      ],
    },
    {
      name: 'animateNumbers',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Animate numbers on scroll',
      },
    },
  ],
}
