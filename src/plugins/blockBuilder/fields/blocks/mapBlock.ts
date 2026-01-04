import type { Block } from 'payload'

export const mapBlock: Block = {
  slug: 'map',
  labels: {
    singular: 'Map Block',
    plural: 'Map Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'address',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Full address to display on map',
      },
    },
    {
      name: 'embedUrl',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Google Maps embed URL or iframe code',
        placeholder: 'Paste Google Maps embed code here',
      },
    },
    {
      name: 'height',
      type: 'text',
      defaultValue: '400px',
      admin: {
        description: 'Map height (e.g., "400px", "500px")',
      },
    },
    {
      name: 'showDirections',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show "Get Directions" link',
      },
    },
  ],
}
