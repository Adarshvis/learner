import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: 'Site Configuration',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Fix footerText if it's still in old richText array format
        if (data.footerText && Array.isArray(data.footerText)) {
          // Extract text from richText format
          const text = data.footerText
            .map((block: any) => 
              block.children?.map((child: any) => child.text).join('') || ''
            )
            .join('\n')
          data.footerText = text || 'Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.'
        }
        return data
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'useLogo',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Enable to use a logo image instead of site name text',
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media' as const,
              admin: {
                condition: (data) => data.useLogo === true,
                description: 'Upload your site logo (recommended size: 200x60px)',
              },
              label: 'Site Logo',
            },
            {
              name: 'siteName',
              type: 'text',
              required: false,
              admin: {
                condition: (data) => data.useLogo !== true,
                description: 'Text to display as site name (leave empty to hide)',
              },
              defaultValue: 'Learner',
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              defaultValue: 'Professional online learning platform',
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
          label: 'Page Visibility',
          description: 'Control which pages are visible on the website',
          fields: [
            {
              name: 'aboutPageActive',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show/hide About page from website and navigation',
              },
            },
            {
              name: 'coursesPageActive',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show/hide Courses page from website and navigation',
              },
            },
            {
              name: 'instructorsPageActive',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show/hide Instructors page from website and navigation',
              },
            },
            {
              name: 'newsPageActive',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show/hide News page from website and navigation',
              },
            },
            {
              name: 'blogPageActive',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show/hide Blog page from website and navigation',
              },
            },
            {
              name: 'contactPageActive',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show/hide Contact page from website and navigation',
              },
            },
            {
              name: 'enrollPageActive',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show/hide Enroll page from website and navigation',
              },
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
