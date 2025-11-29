import type { CollectionConfig } from 'payload'

export const EnrollPage: CollectionConfig = {
  slug: 'enroll-page',
  admin: {
    useAsTitle: 'sectionName',
    defaultColumns: ['sectionName', 'sectionType', 'status'],
    group: 'Content Management',
  },
  fields: [
    {
      name: 'sectionName',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal name for this section (e.g., "Enroll Page Title", "Enrollment Form")',
      },
    },
    {
      name: 'sectionType',
      type: 'select',
      required: true,
      options: [
        { label: 'Page Title', value: 'page-title' },
        { label: 'Enrollment Form', value: 'enrollment-form' },
        { label: 'Benefits Sidebar', value: 'benefits-sidebar' },
      ],
      admin: {
        description: 'Select the type of section',
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

    // ENROLLMENT FORM SECTION
    {
      name: 'enrollmentForm',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'enrollment-form',
      },
      fields: [
        {
          name: 'header',
          type: 'group',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              defaultValue: 'Enroll in Your Dream Course',
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          name: 'courseOptions',
          type: 'array',
          admin: {
            description: 'Available courses in the dropdown',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'educationLevels',
          type: 'array',
          admin: {
            description: 'Education level options',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'experienceLevels',
          type: 'array',
          admin: {
            description: 'Experience level options',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'scheduleOptions',
          type: 'array',
          admin: {
            description: 'Learning schedule options',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'isDefault',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'submitButton',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              defaultValue: 'Enroll Now',
            },
            {
              name: 'icon',
              type: 'select',
              options: [
                { label: 'Check Circle (bi-check-circle)', value: 'bi-check-circle' },
                { label: 'Arrow Right (bi-arrow-right)', value: 'bi-arrow-right' },
                { label: 'Send (bi-send)', value: 'bi-send' },
              ],
              defaultValue: 'bi-check-circle',
            },
          ],
        },
        {
          name: 'securityNote',
          type: 'text',
          required: true,
          defaultValue: 'Your information is secure and will never be shared with third parties',
        },
      ],
    },

    // BENEFITS SIDEBAR SECTION
    {
      name: 'benefitsSidebar',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'benefits-sidebar',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'Why Choose Our Courses?',
        },
        {
          name: 'benefits',
          type: 'array',
          minRows: 1,
          admin: {
            description: 'Benefits list',
          },
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Trophy (bi-trophy)', value: 'bi-trophy' },
                { label: 'Clock (bi-clock)', value: 'bi-clock' },
                { label: 'Award (bi-award)', value: 'bi-award' },
                { label: 'People (bi-people)', value: 'bi-people' },
                { label: 'Star (bi-star)', value: 'bi-star' },
                { label: 'Book (bi-book)', value: 'bi-book' },
                { label: 'Lightbulb (bi-lightbulb)', value: 'bi-lightbulb' },
                { label: 'Shield Check (bi-shield-check)', value: 'bi-shield-check' },
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
        {
          name: 'stats',
          type: 'array',
          admin: {
            description: 'Statistics to display',
          },
          fields: [
            {
              name: 'number',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., "15,000+", "98%", "4.9/5"',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., "Students Enrolled", "Completion Rate"',
              },
            },
          ],
        },
      ],
    },
  ],
}
