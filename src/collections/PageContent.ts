import type { CollectionConfig } from 'payload'

export const PageContent: CollectionConfig = {
  slug: 'page-content',
  admin: {
    useAsTitle: 'pageTitle',
    defaultColumns: ['pageType', 'pageTitle', 'updatedAt'],
    group: 'Content Management',
    description: 'Manage all website pages - create new pages by selecting a page type',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pageType',
      type: 'select',
      required: true,
      admin: {
        description: 'Select the type of page you want to create',
      },
      options: [
        { label: 'Home Page', value: 'home-page' },
        { label: 'About Page', value: 'about-page' },
        { label: 'Courses Page', value: 'courses-page' },
        { label: 'Instructors Page', value: 'instructors-page' },
        { label: 'Pricing Page', value: 'pricing-page' },
        { label: 'Blog Page', value: 'blog-page' },
        { label: 'Blog Details Page', value: 'blog-details-page' },
        { label: 'Contact Page', value: 'contact-page' },
        { label: 'Enroll Page', value: 'enroll-page' },
        { label: 'Custom Page', value: 'custom-page' },
      ],
    },
    {
      name: 'pageTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'Enter the title/name for this page',
      },
    },
    {
      name: 'pageSlug',
      type: 'text',
      required: true,
      admin: {
        description: 'URL slug for this page (e.g., "about-us", "pricing")',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'redirectTo',
      type: 'group',
      admin: {
        description: 'Redirect users to the appropriate page collection based on page type',
      },
      fields: [
        {
          name: 'instructions',
          type: 'textarea',
          admin: {
            readOnly: true,
            description: 'Instructions for page creation workflow',
          },
          defaultValue: 'After creating this page entry, add sections by going to:\n\n• Home Page → Content Management > Home Pages\n• About Page → Content Management > About Pages\n• Other Pages → Their respective collections in Content Management',
        },
      ],
    },
    // CUSTOM PAGE FIELDS (for non-standard pages)
    {
      name: 'customPageData',
      type: 'group',
      admin: {
        condition: (data) => data.pageType === 'custom-page',
        description: 'Fields for custom pages that don\'t fit standard page types',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'buttonText',
          type: 'text',
        },
        {
          name: 'buttonLink',
          type: 'text',
        },
        {
          name: 'secondaryButtonText',
          type: 'text',
        },
        {
          name: 'secondaryButtonLink',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as const,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media' as const,
        },
      ],
    },
    {
      name: 'customStats',
      type: 'array',
      admin: {
        condition: (data) => data.pageType === 'custom-page',
        description: 'Statistics/numbers for custom pages',
      },
      fields: [
        {
          name: 'number',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Bootstrap icon class (e.g., "bi-people")',
          },
        },
      ],
    },
    {
      name: 'customFeatures',
      type: 'array',
      admin: {
        condition: (data) => data.pageType === 'custom-page',
        description: 'Feature items for custom pages',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Bootstrap icon class',
          },
        },
      ],
    },
    {
      name: 'customData',
      type: 'array',
      admin: {
        condition: (data) => data.pageType === 'custom-page',
        description: 'Additional custom fields for unique requirements',
      },
      fields: [
        {
          name: 'fieldName',
          type: 'text',
        },
        {
          name: 'fieldValue',
          type: 'textarea',
        },
        {
          name: 'fieldType',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Number', value: 'number' },
            { label: 'URL', value: 'url' },
            { label: 'Email', value: 'email' },
            { label: 'JSON', value: 'json' },
          ],
        },
      ],
    },
  ],
}
