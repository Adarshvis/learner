import type { Block } from 'payload'

export const testimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials Block',
    plural: 'Testimonials Blocks',
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
      name: 'layout',
      type: 'select',
      defaultValue: 'slider',
      options: [
        { label: 'Slider/Carousel', value: 'slider' },
        { label: 'Grid', value: 'grid' },
        { label: 'Single Featured', value: 'single' },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: false,
          admin: {
            description: 'Job title or role (e.g., "Student", "CEO")',
          },
        },
        {
          name: 'company',
          type: 'text',
          required: false,
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'rating',
          type: 'number',
          required: false,
          min: 0,
          max: 5,
          admin: {
            step: 0.5,
            description: 'Star rating (0-5)',
          },
        },
        {
          name: 'testimonial',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        condition: (data, siblingData) => siblingData.layout === 'slider',
      },
    },
    {
      name: 'showRating',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
