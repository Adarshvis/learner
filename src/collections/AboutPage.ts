import type { CollectionConfig } from 'payload'

export const AboutPage: CollectionConfig = {
  slug: 'about-page',
  admin: {
    useAsTitle: 'sectionName',
    defaultColumns: ['sectionName', 'sectionType', 'updatedAt'],
    group: 'Content Management',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sectionName',
      type: 'text',
      required: true,
      admin: {
        description: 'Name to identify this section (e.g., "Page Title", "About Main")',
      },
    },
    {
      name: 'sectionType',
      type: 'select',
      required: true,
      options: [
        { label: 'Page Title', value: 'page-title' },
        { label: 'About Main Section', value: 'about-main' },
        { label: 'Mission Vision Values', value: 'mission-vision-values' },
        { label: 'Why Choose Us', value: 'why-choose-us' },
      ],
      admin: {
        description: 'Select the section type',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },

    // PAGE TITLE SECTION
    {
      name: 'pageTitle',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'page-title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'breadcrumbs',
          type: 'array',
          label: 'Breadcrumb Items',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
            },
            {
              name: 'isActive',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },

    // ABOUT MAIN SECTION
    {
      name: 'aboutMain',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'about-main',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Statistics',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'count',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // MISSION VISION VALUES SECTION
    {
      name: 'missionVisionValues',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'mission-vision-values',
      },
      fields: [
        {
          name: 'cards',
          type: 'array',
          label: 'Mission/Vision/Values Cards',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Bullseye (Mission)', value: 'bi-bullseye' },
                { label: 'Eye (Vision)', value: 'bi-eye' },
                { label: 'Award (Values)', value: 'bi-award' },
                { label: 'Target', value: 'bi-target' },
                { label: 'Lightbulb', value: 'bi-lightbulb' },
                { label: 'Heart', value: 'bi-heart' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },

    // WHY CHOOSE US SECTION
    {
      name: 'whyChooseUs',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'why-choose-us',
      },
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          label: 'Feature List',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: true,
        },
        {
          name: 'galleryImages',
          type: 'array',
          label: 'Gallery Images',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'alt',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
