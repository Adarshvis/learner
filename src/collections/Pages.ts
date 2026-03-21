import type { CollectionConfig } from 'payload'
import { createFlexibleRowFields } from '../blocks/FlexibleRow'

// Type for user with role field
type UserWithRole = {
  id: string
  role?: 'superadmin' | 'admin' | 'editor' | 'author'
  allowedCollections?: string[]
  [key: string]: unknown
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Create Page',
    plural: 'Create Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'template', 'status', 'updatedAt'],
    group: 'Content Management',
    description: 'Create and manage dynamic pages. These pages can be accessed via their custom URL slug.',
    hidden: ({ user }) => {
      const u = user as UserWithRole | null
      if (!u) return true
      if (u.role === 'author') return true  // Authors typically can't create new pages
      return false
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      const u = user as UserWithRole | null
      if (!u) return false
      if (!u.role || ['superadmin', 'admin', 'editor'].includes(u.role)) return true
      return false
    },
    update: ({ req: { user } }) => {
      const u = user as UserWithRole | null
      if (!u) return false
      if (!u.role || ['superadmin', 'admin', 'editor'].includes(u.role)) return true
      return false
    },
    delete: ({ req: { user } }) => {
      const u = user as UserWithRole | null
      if (!u) return false
      if (!u.role || ['superadmin', 'admin'].includes(u.role)) return true
      return false
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Add to navigation when page is published (on create or update)
        if (doc.status === 'published') {
          try {
            // Get current navigation
            const navigation = await req.payload.findGlobal({
              slug: 'navigation' as 'settings',
            })

            // Get existing menu items or empty array
            const menuItems = (navigation as any)?.menuItems || []

            // Check if page already exists in navigation
            const pageExists = menuItems.some(
              (item: any) =>
                item.dynamicPageLink === doc.id ||
                item.customLink === `/${doc.slug}`
            )

            if (!pageExists) {
              // Add new page to the end of navigation using customLink for dynamic pages
              const newMenuItem = {
                label: doc.title,
                linkType: 'custom',
                customLink: `/${doc.slug}`,
                dynamicPageLink: doc.id,
                isVisible: true,
              }

              await req.payload.updateGlobal({
                slug: 'navigation' as 'settings',
                data: {
                  menuItems: [...menuItems, newMenuItem],
                } as any,
              })

              console.log(`✅ Added "${doc.title}" to navigation`)
            }
          } catch (error) {
            console.error('Error adding page to navigation:', error)
          }
        }
        return doc
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Page title (displayed in browser tab and page header)',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description: 'URL-friendly identifier (e.g., "services" creates /services page). Auto-generated from title if left empty.',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.title) {
                      return data.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '')
                    }
                    return value
                  },
                ],
              },
            },
            {
              name: 'template',
              type: 'select',
              required: true,
              defaultValue: 'default',
              options: [
                { label: 'Default (Full Width)', value: 'default' },
                { label: 'With Sidebar', value: 'sidebar' },
                { label: 'Landing Page (No Header/Footer)', value: 'landing' },
                { label: 'Minimal (Clean)', value: 'minimal' },
              ],
              admin: {
                description: 'Choose a page layout template',
              },
            },
            {
              name: 'showPageTitle',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Display the page title section with breadcrumbs',
              },
            },
            {
              name: 'breadcrumbs',
              type: 'array',
              admin: {
                description: 'Custom breadcrumb trail (leave empty for auto-generated)',
                condition: (data) => data.showPageTitle === true,
              },
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
              ],
            },
            {
              name: 'content',
              type: 'richText',
              admin: {
                description: 'Main page content (rich text with formatting)',
              },
            },
            {
              name: 'sections',
              type: 'array',
              label: 'Page Sections',
              admin: {
                description: 'Add flexible content sections to your page. Drag to reorder.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'sectionType',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Rich Text Block', value: 'richText' },
                    { label: 'Hero Section', value: 'hero' },
                    { label: 'Flexible Row / Content Grid', value: 'flexibleRow' },
                    { label: 'Slider Mixed Media', value: 'sliderMixedMedia' },
                    { label: 'Cards Grid', value: 'cards' },
                    { label: 'Image Gallery', value: 'gallery' },
                    { label: 'Call to Action', value: 'cta' },
                    { label: 'FAQ Accordion', value: 'faq' },
                    { label: 'Testimonials', value: 'testimonials' },
                    { label: 'Stats/Counters', value: 'stats' },
                    { label: 'Team/People', value: 'team' },
                    { label: 'Contact Form', value: 'contactForm' },
                    { label: 'Video Embed', value: 'video' },
                    { label: 'Custom HTML', value: 'customHtml' },
                    { label: 'Spacer', value: 'spacer' },
                  ],
                },
                {
                  name: 'sectionTitle',
                  type: 'text',
                  admin: {
                    description: 'Optional section heading',
                  },
                },
                {
                  name: 'sectionSubtitle',
                  type: 'text',
                  admin: {
                    description: 'Optional section subtitle',
                  },
                },
                {
                  name: 'backgroundColor',
                  type: 'select',
                  defaultValue: 'white',
                  options: [
                    { label: 'White', value: 'white' },
                    { label: 'Light Gray', value: 'light' },
                    { label: 'Primary Color', value: 'primary' },
                    { label: 'Secondary Color', value: 'secondary' },
                    { label: 'Dark', value: 'dark' },
                  ],
                },
                // Rich Text Section
                {
                  name: 'richTextContent',
                  type: 'richText',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'richText',
                  },
                },
                // Hero Section
                {
                  name: 'heroContent',
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'hero',
                  },
                  fields: [
                    { name: 'headline', type: 'text' },
                    { name: 'subheadline', type: 'textarea' },
                    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
                    { name: 'buttonText', type: 'text' },
                    { name: 'buttonLink', type: 'text' },
                  ],
                },
                // Flexible Row / Content Grid
                {
                  name: 'flexibleRow',
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'flexibleRow',
                  },
                  fields: createFlexibleRowFields(),
                },
                // Slider Mixed Media Section
                {
                  name: 'sliderMixedMedia',
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'sliderMixedMedia',
                  },
                  fields: [
                    {
                      name: 'height',
                      type: 'select',
                      defaultValue: '70vh',
                      options: [
                        { label: 'Compact (50vh)', value: '50vh' },
                        { label: 'Medium (60vh)', value: '60vh' },
                        { label: 'Standard (70vh)', value: '70vh' },
                        { label: 'Large (80vh)', value: '80vh' },
                        { label: 'Extra Large (85vh)', value: '85vh' },
                        { label: 'Very Large (90vh)', value: '90vh' },
                        { label: 'Full Screen (100vh)', value: '100vh' },
                      ],
                      admin: {
                        description: 'Height of the slider section',
                      },
                    },
                    {
                      name: 'interval',
                      type: 'number',
                      defaultValue: 5,
                      admin: {
                        description: 'Time between automatic slide transitions (seconds)',
                      },
                    },
                    {
                      name: 'slides',
                      type: 'array',
                      minRows: 1,
                      fields: [
                        {
                          name: 'mediaType',
                          type: 'select',
                          required: true,
                          options: [
                            { label: 'Text Content', value: 'text' },
                            { label: 'Image Media', value: 'image' },
                            { label: 'Video Media', value: 'video' },
                            { label: 'Audio Media', value: 'audio' },
                            { label: 'Document Media', value: 'document' },
                            { label: 'Animation Media', value: 'animation' },
                            { label: '3D & Immersive', value: '3d' },
                            { label: 'YouTube/Vimeo', value: 'embed' },
                            { label: 'Data Visualization', value: 'data' },
                            { label: 'Maps & Location', value: 'maps' },
                          ],
                        },
                        {
                          name: 'textContent',
                          type: 'group',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'text',
                          },
                          fields: [
                            { name: 'title', type: 'text' },
                            { name: 'description', type: 'textarea' },
                          ],
                        },
                        {
                          name: 'imageFile',
                          type: 'upload',
                          relationTo: 'media',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'image',
                          },
                        },
                        {
                          name: 'imageAlt',
                          type: 'text',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'image',
                          },
                        },
                        {
                          name: 'videoFile',
                          type: 'upload',
                          relationTo: 'media',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'video',
                          },
                        },
                        {
                          name: 'videoPoster',
                          type: 'upload',
                          relationTo: 'media',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'video',
                          },
                        },
                        {
                          name: 'videoAutoplay',
                          type: 'checkbox',
                          defaultValue: false,
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'video',
                          },
                        },
                        {
                          name: 'videoControls',
                          type: 'checkbox',
                          defaultValue: true,
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'video',
                          },
                        },
                        {
                          name: 'audioFile',
                          type: 'upload',
                          relationTo: 'media',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'audio',
                          },
                        },
                        {
                          name: 'audioAutoplay',
                          type: 'checkbox',
                          defaultValue: false,
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'audio',
                          },
                        },
                        {
                          name: 'documentFile',
                          type: 'upload',
                          relationTo: 'media',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'document',
                          },
                        },
                        {
                          name: 'documentDisplayMode',
                          type: 'select',
                          options: [
                            { label: 'Download Button', value: 'download' },
                            { label: 'Embedded Viewer', value: 'embed' },
                          ],
                          defaultValue: 'download',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'document',
                          },
                        },
                        {
                          name: 'animationFile',
                          type: 'upload',
                          relationTo: 'media',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'animation',
                          },
                        },
                        {
                          name: 'model3DFile',
                          type: 'upload',
                          relationTo: 'media',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === '3d',
                          },
                        },
                        {
                          name: 'embedType',
                          type: 'select',
                          options: [
                            { label: 'YouTube', value: 'youtube' },
                            { label: 'Vimeo', value: 'vimeo' },
                            { label: 'Custom iFrame', value: 'iframe' },
                          ],
                          defaultValue: 'youtube',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'embed',
                          },
                        },
                        {
                          name: 'embedUrl',
                          type: 'text',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'embed',
                          },
                        },
                        {
                          name: 'embedAutoplay',
                          type: 'checkbox',
                          defaultValue: false,
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'embed',
                          },
                        },
                        {
                          name: 'dataEmbedUrl',
                          type: 'text',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'data',
                          },
                        },
                        {
                          name: 'mapEmbedUrl',
                          type: 'text',
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'maps',
                            description: 'Use Google Maps Embed URL (Share > Embed a map)',
                          },
                        },
                        {
                          name: 'mapInteractive',
                          type: 'checkbox',
                          defaultValue: true,
                          admin: {
                            condition: (data, siblingData) => siblingData?.mediaType === 'maps',
                          },
                        },
                        {
                          name: 'alt',
                          type: 'text',
                        },
                      ],
                    },
                  ],
                },
                // Cards Grid
                {
                  name: 'cards',
                  type: 'array',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'cards',
                  },
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea' },
                    { name: 'image', type: 'upload', relationTo: 'media' },
                    { name: 'icon', type: 'select', options: [
                      { label: 'None', value: '' },
                      { label: 'Star', value: 'bi-star' },
                      { label: 'Heart', value: 'bi-heart' },
                      { label: 'Check', value: 'bi-check-circle' },
                      { label: 'Award', value: 'bi-award' },
                      { label: 'Lightning', value: 'bi-lightning' },
                      { label: 'Gear', value: 'bi-gear' },
                      { label: 'Globe', value: 'bi-globe' },
                      { label: 'People', value: 'bi-people' },
                    ]},
                    { name: 'link', type: 'text' },
                  ],
                },
                // Image Gallery
                {
                  name: 'galleryImages',
                  type: 'array',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'gallery',
                  },
                  fields: [
                    { name: 'image', type: 'upload', relationTo: 'media', required: true },
                    { name: 'caption', type: 'text' },
                  ],
                },
                // CTA Section
                {
                  name: 'ctaContent',
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'cta',
                  },
                  fields: [
                    { name: 'headline', type: 'text' },
                    { name: 'description', type: 'textarea' },
                    { name: 'primaryButtonText', type: 'text' },
                    { name: 'primaryButtonLink', type: 'text' },
                    { name: 'secondaryButtonText', type: 'text' },
                    { name: 'secondaryButtonLink', type: 'text' },
                  ],
                },
                // FAQ Section
                {
                  name: 'faqItems',
                  type: 'array',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'faq',
                  },
                  fields: [
                    { name: 'question', type: 'text', required: true },
                    { name: 'answer', type: 'textarea', required: true },
                  ],
                },
                // Testimonials
                {
                  name: 'testimonialItems',
                  type: 'array',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'testimonials',
                  },
                  fields: [
                    { name: 'quote', type: 'textarea', required: true },
                    { name: 'authorName', type: 'text', required: true },
                    { name: 'authorRole', type: 'text' },
                    { name: 'authorImage', type: 'upload', relationTo: 'media' },
                    { name: 'rating', type: 'number', min: 1, max: 5 },
                  ],
                },
                // Stats Section
                {
                  name: 'statsItems',
                  type: 'array',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'stats',
                  },
                  fields: [
                    { name: 'number', type: 'text', required: true },
                    { name: 'label', type: 'text', required: true },
                    { name: 'icon', type: 'select', options: [
                      { label: 'None', value: '' },
                      { label: 'People', value: 'bi-people' },
                      { label: 'Trophy', value: 'bi-trophy' },
                      { label: 'Star', value: 'bi-star' },
                      { label: 'Book', value: 'bi-book' },
                      { label: 'Globe', value: 'bi-globe' },
                    ]},
                  ],
                },
                // Team Section
                {
                  name: 'teamMembers',
                  type: 'array',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'team',
                  },
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'role', type: 'text' },
                    { name: 'image', type: 'upload', relationTo: 'media' },
                    { name: 'bio', type: 'textarea' },
                    { name: 'socialLinks', type: 'array', fields: [
                      { name: 'platform', type: 'select', options: [
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'Twitter', value: 'twitter' },
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'Instagram', value: 'instagram' },
                      ]},
                      { name: 'url', type: 'text' },
                    ]},
                  ],
                },
                // Contact Form
                {
                  name: 'contactFormSettings',
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'contactForm',
                  },
                  fields: [
                    { name: 'formTitle', type: 'text', defaultValue: 'Get in Touch' },
                    { name: 'submitButtonText', type: 'text', defaultValue: 'Send Message' },
                    { name: 'successMessage', type: 'text', defaultValue: 'Thank you! Your message has been sent.' },
                  ],
                },
                // Video Embed
                {
                  name: 'videoContent',
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'video',
                  },
                  fields: [
                    { name: 'videoType', type: 'select', options: [
                      { label: 'YouTube', value: 'youtube' },
                      { label: 'Vimeo', value: 'vimeo' },
                      { label: 'Self-hosted', value: 'self' },
                    ]},
                    { name: 'videoUrl', type: 'text' },
                    { name: 'videoFile', type: 'upload', relationTo: 'media', admin: {
                      condition: (data, siblingData) => siblingData?.videoType === 'self',
                    }},
                    { name: 'posterImage', type: 'upload', relationTo: 'media' },
                  ],
                },
                // Custom HTML
                {
                  name: 'customHtmlContent',
                  type: 'code',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'customHtml',
                    language: 'html',
                    description: 'Add custom HTML code (use with caution)',
                  },
                },
                // Spacer
                {
                  name: 'spacerHeight',
                  type: 'select',
                  defaultValue: 'medium',
                  admin: {
                    condition: (data, siblingData) => siblingData?.sectionType === 'spacer',
                  },
                  options: [
                    { label: 'Small (20px)', value: 'small' },
                    { label: 'Medium (40px)', value: 'medium' },
                    { label: 'Large (80px)', value: 'large' },
                    { label: 'Extra Large (120px)', value: 'xlarge' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              admin: {
                description: 'Custom meta title (defaults to page title if empty)',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              maxLength: 160,
              admin: {
                description: 'Meta description for search engines (max 160 characters)',
              },
            },
            {
              name: 'metaImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Social sharing image (Open Graph)',
              },
            },
            {
              name: 'noIndex',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Prevent search engines from indexing this page',
              },
            },
            {
              name: 'canonicalUrl',
              type: 'text',
              admin: {
                description: 'Custom canonical URL (optional)',
              },
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'draft',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
              ],
              admin: {
                description: 'Only published pages are visible on the website',
              },
            },
            {
              name: 'publishedAt',
              type: 'date',
              admin: {
                description: 'Publication date (for scheduling)',
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'users',
              admin: {
                description: 'Page author',
              },
            },
            {
              name: 'parentPage',
              type: 'relationship',
              relationTo: 'pages' as 'media',
              admin: {
                description: 'Parent page (for hierarchical structure)',
              },
            },
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Display order (lower numbers first)',
              },
            },
          ],
        },
      ],
    },
  ],
}
