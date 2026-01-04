import type { Block } from 'payload'

export const richTextBlock: Block = {
  slug: 'richText',
  labels: {
    singular: 'Rich Text',
    plural: 'Rich Text Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'contained',
      options: [
        { label: 'Full Width', value: 'full' },
        { label: 'Contained', value: 'contained' },
        { label: 'Narrow', value: 'narrow' },
      ],
    },
  ],
}
