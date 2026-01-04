import type { Block } from 'payload'

export const faqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
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
      name: 'faqs',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'accordion',
      options: [
        { label: 'Accordion', value: 'accordion' },
        { label: 'Two Columns', value: 'twoColumn' },
      ],
    },
    {
      name: 'openFirst',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Open first item by default',
        condition: (data, siblingData) => siblingData.layout === 'accordion',
      },
    },
  ],
}
