import type { CollectionConfig } from 'payload'

export const PricingPage: CollectionConfig = {
  slug: 'pricing-page',
  admin: {
    useAsTitle: 'sectionName',
    defaultColumns: ['sectionName', 'sectionType', 'status'],
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
    },
    {
      name: 'sectionType',
      type: 'select',
      required: true,
      options: [
        { label: 'Page Title', value: 'page-title' },
        { label: 'Pricing Section', value: 'pricing-section' },
      ],
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

    // PAGE TITLE
    {
      name: 'pageTitle',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'page-title',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'breadcrumbs',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'link', type: 'text' },
            { name: 'isActive', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },

    // PRICING SECTION
    {
      name: 'pricingSection',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'pricing-section',
      },
      fields: [
        {
          name: 'toggleLabels',
          type: 'group',
          label: 'Pricing Toggle Labels',
          fields: [
            { name: 'monthlyLabel', type: 'text', defaultValue: 'Monthly' },
            { name: 'yearlyLabel', type: 'text', defaultValue: 'Yearly' },
            { name: 'yearlyBadge', type: 'text', defaultValue: '20% OFF' },
          ],
        },
        {
          name: 'pricingPlans',
          type: 'array',
          label: 'Pricing Plans',
          fields: [
            {
              name: 'planName',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              required: true,
            },
            {
              name: 'isPopular',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'popularBadge',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.isPopular,
              },
            },
            {
              name: 'priceType',
              type: 'select',
              required: true,
              options: [
                { label: 'Free', value: 'free' },
                { label: 'Monthly/Yearly', value: 'monthly-yearly' },
                { label: 'Custom', value: 'custom' },
              ],
            },
            {
              name: 'monthlyPrice',
              type: 'number',
              admin: {
                condition: (data, siblingData) => siblingData?.priceType === 'monthly-yearly',
              },
            },
            {
              name: 'yearlyPrice',
              type: 'number',
              admin: {
                condition: (data, siblingData) => siblingData?.priceType === 'monthly-yearly',
              },
            },
            {
              name: 'ctaText',
              type: 'text',
              required: true,
            },
            {
              name: 'ctaLink',
              type: 'text',
              required: true,
            },
            {
              name: 'featuresHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'features',
              type: 'array',
              label: 'Features List',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'isHighlight',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
