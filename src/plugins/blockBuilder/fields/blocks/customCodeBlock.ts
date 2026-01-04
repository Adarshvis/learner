import type { Block } from 'payload'

export const customCodeBlock: Block = {
  slug: 'customCode',
  labels: {
    singular: 'Custom Code/Embed',
    plural: 'Custom Code Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional title for the embed section',
      },
    },
    {
      name: 'codeType',
      type: 'select',
      defaultValue: 'html',
      options: [
        { label: 'HTML/Embed Code', value: 'html' },
        { label: 'iFrame', value: 'iframe' },
        { label: 'Script', value: 'script' },
      ],
    },
    {
      name: 'code',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Paste your HTML, embed code, or script here',
        rows: 10,
      },
    },
    {
      name: 'height',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional height (e.g., "500px", "auto")',
        condition: (data, siblingData) => siblingData.codeType === 'iframe',
      },
    },
  ],
}
