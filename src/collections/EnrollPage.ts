import type { GlobalConfig } from 'payload'

export const EnrollPage: GlobalConfig = {
  slug: 'apply-now',
  label: 'Apply Now',
  admin: {
    group: 'Content Management',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Apply Now',
      admin: {
        description: 'Title for admin reference (e.g., "Application Form Settings")',
      },
    },
    {
      name: 'redirectUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'External URL to redirect to (e.g., Google Forms, Typeform, custom enrollment system)',
        placeholder: 'https://forms.google.com/...',
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Open enrollment link in a new tab',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description for admin reference',
        placeholder: 'e.g., "Main enrollment form for all courses"',
      },
    },
  ],
}
