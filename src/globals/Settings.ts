import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: 'Site Configuration',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: false,
              defaultValue: 'Learner',
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              defaultValue: 'Professional online learning platform',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media' as const,
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media' as const,
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactEmail',
              type: 'email',
              defaultValue: 'info@learnerplatform.com',
            },
            {
              name: 'contactPhone',
              type: 'text',
              defaultValue: '+1 (212) 555-7890',
            },
            {
              name: 'address',
              type: 'group',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                  defaultValue: '8721 Broadway Avenue',
                },
                {
                  name: 'city',
                  type: 'text',
                  defaultValue: 'New York',
                },
                {
                  name: 'state',
                  type: 'text',
                  defaultValue: 'NY',
                },
                {
                  name: 'zipCode',
                  type: 'text',
                  defaultValue: '10023',
                },
                {
                  name: 'country',
                  type: 'text',
                  defaultValue: 'United States',
                },
              ],
            },
            {
              name: 'businessHours',
              type: 'text',
              defaultValue: 'Monday-Friday: 9AM - 6PM',
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialLinks',
              type: 'group',
              fields: [
                {
                  name: 'facebook',
                  type: 'text',
                },
                {
                  name: 'twitter',
                  type: 'text',
                },
                {
                  name: 'instagram',
                  type: 'text',
                },
                {
                  name: 'linkedin',
                  type: 'text',
                },
                {
                  name: 'youtube',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'defaultMetaTitle',
              type: 'text',
              defaultValue: 'Learner - Professional Online Learning Platform',
            },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              maxLength: 160,
              defaultValue: 'Learn from industry experts with our comprehensive online courses in web development, data science, design, and more.',
            },
            {
              name: 'defaultMetaImage',
              type: 'upload',
              relationTo: 'media' as const,
            },
            {
              name: 'googleAnalyticsId',
              type: 'text',
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerText',
              type: 'textarea',
              defaultValue: 'Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.',
            },
            {
              name: 'copyrightText',
              type: 'text',
              defaultValue: '© Copyright Learner All Rights Reserved',
            },
            {
              name: 'footerLinks',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'links',
                  type: 'array',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                    },
                    {
                      name: 'url',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
