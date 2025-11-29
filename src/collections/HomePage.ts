import type { CollectionConfig } from 'payload'

export const HomePage: CollectionConfig = {
  slug: 'home-page',
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
        description: 'Name to identify this section (e.g., "Hero Section", "Featured Courses")',
      },
    },
    {
      name: 'sectionType',
      type: 'select',
      required: true,
      options: [
        { label: 'Hero Section', value: 'hero' },
        { label: 'Featured Courses', value: 'featured-courses' },
        { label: 'Course Categories', value: 'course-categories' },
        { label: 'Featured Instructors', value: 'featured-instructors' },
        { label: 'Testimonials', value: 'testimonials' },
        { label: 'Recent Blog Posts', value: 'blog-posts' },
        { label: 'CTA Section', value: 'cta' },
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

    // HERO SECTION FIELDS
    {
      name: 'hero',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'hero',
      },
      fields: [
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
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
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
              name: 'number',
              type: 'number',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'primaryButton',
          type: 'group',
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
        {
          name: 'secondaryButton',
          type: 'group',
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
        {
          name: 'features',
          type: 'array',
          label: 'Hero Features',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Shield Check', value: 'bi-shield-check' },
                { label: 'Clock', value: 'bi-clock' },
                { label: 'People', value: 'bi-people' },
                { label: 'Award', value: 'bi-award' },
                { label: 'Book', value: 'bi-book' },
                { label: 'Star', value: 'bi-star' },
              ],
            },
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'floatingCards',
          type: 'array',
          label: 'Floating Course Cards',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Code Slash', value: 'bi-code-slash' },
                { label: 'Palette', value: 'bi-palette' },
                { label: 'Graph Up', value: 'bi-graph-up' },
                { label: 'Laptop', value: 'bi-laptop' },
                { label: 'Camera', value: 'bi-camera' },
                { label: 'Briefcase', value: 'bi-briefcase' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'students',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // FEATURED COURSES SECTION
    {
      name: 'featuredCourses',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'featured-courses',
      },
      fields: [
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
          name: 'courses',
          type: 'array',
          label: 'Course Items',
          minRows: 1,
          maxRows: 6,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'badge',
              type: 'select',
              options: [
                { label: 'Featured', value: 'featured' },
                { label: 'New', value: 'new' },
                { label: 'Certificate', value: 'certificate' },
                { label: 'Popular', value: 'popular' },
              ],
            },
            {
              name: 'price',
              type: 'text',
              required: true,
            },
            {
              name: 'level',
              type: 'select',
              required: true,
              options: [
                { label: 'Beginner', value: 'Beginner' },
                { label: 'Intermediate', value: 'Intermediate' },
                { label: 'Advanced', value: 'Advanced' },
              ],
            },
            {
              name: 'duration',
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
              name: 'instructorAvatar',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'instructorName',
              type: 'text',
              required: true,
            },
            {
              name: 'instructorSpecialty',
              type: 'text',
              required: true,
            },
            {
              name: 'rating',
              type: 'number',
              required: true,
              min: 0,
              max: 5,
              admin: {
                step: 0.1,
              },
            },
            {
              name: 'studentCount',
              type: 'number',
              required: true,
            },
          ],
        },
        {
          name: 'viewAllButton',
          type: 'group',
          fields: [
            { name: 'text', type: 'text', defaultValue: 'View All Courses' },
            { name: 'link', type: 'text', defaultValue: '/courses' },
          ],
        },
      ],
    },

    // COURSE CATEGORIES SECTION
    {
      name: 'courseCategories',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'course-categories',
      },
      fields: [
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
          name: 'categories',
          type: 'array',
          label: 'Category Items',
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: [
                { label: 'Laptop (Computer Science)', value: 'bi-laptop' },
                { label: 'Briefcase (Business)', value: 'bi-briefcase' },
                { label: 'Palette (Design)', value: 'bi-palette' },
                { label: 'Heart Pulse (Health)', value: 'bi-heart-pulse' },
                { label: 'Globe (Languages)', value: 'bi-globe' },
                { label: 'Diagram 3 (Science)', value: 'bi-diagram-3' },
                { label: 'Megaphone (Marketing)', value: 'bi-megaphone' },
                { label: 'Graph Up Arrow (Finance)', value: 'bi-graph-up-arrow' },
                { label: 'Camera (Photography)', value: 'bi-camera' },
                { label: 'Music Note (Music)', value: 'bi-music-note-beamed' },
                { label: 'Gear (Engineering)', value: 'bi-gear' },
                { label: 'Journal Text (Law)', value: 'bi-journal-text' },
                { label: 'Cup Hot (Culinary)', value: 'bi-cup-hot' },
                { label: 'Trophy (Sports)', value: 'bi-trophy' },
                { label: 'Pen (Writing)', value: 'bi-pen' },
                { label: 'Body Text (Psychology)', value: 'bi-body-text' },
                { label: 'Tree (Environment)', value: 'bi-tree' },
                { label: 'Chat Dots (Communication)', value: 'bi-chat-dots' },
              ],
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'courseCount',
              type: 'number',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              defaultValue: '/courses',
            },
          ],
        },
      ],
    },

    // FEATURED INSTRUCTORS SECTION
    {
      name: 'featuredInstructors',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'featured-instructors',
      },
      fields: [
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
          name: 'instructors',
          type: 'array',
          label: 'Instructor Items',
          minRows: 1,
          maxRows: 4,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'specialty',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'rating',
              type: 'number',
              required: true,
              min: 0,
              max: 5,
              admin: {
                step: 0.1,
              },
            },
            {
              name: 'courseCount',
              type: 'number',
              required: true,
            },
            {
              name: 'studentCount',
              type: 'number',
              required: true,
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Links',
              maxRows: 4,
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Twitter', value: 'twitter' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'Dribbble', value: 'dribbble' },
                    { label: 'Behance', value: 'behance' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Facebook', value: 'facebook' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },

    // TESTIMONIALS SECTION
    {
      name: 'testimonials',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'testimonials',
      },
      fields: [
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
          name: 'criticReviews',
          type: 'array',
          label: 'Critic Reviews',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'source',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'e.g., The New York Times',
              },
            },
            {
              name: 'rating',
              type: 'number',
              required: true,
              min: 0,
              max: 5,
              admin: {
                step: 0.5,
              },
            },
            {
              name: 'quote',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          name: 'studentReviews',
          type: 'array',
          label: 'Student Reviews',
          fields: [
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              required: true,
            },
            {
              name: 'rating',
              type: 'number',
              required: true,
              min: 0,
              max: 5,
              admin: {
                step: 0.5,
              },
            },
            {
              name: 'review',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          name: 'overallRating',
          type: 'group',
          fields: [
            {
              name: 'rating',
              type: 'number',
              required: true,
              defaultValue: 4.8,
              min: 0,
              max: 5,
              admin: {
                step: 0.1,
              },
            },
            {
              name: 'reviewCount',
              type: 'text',
              required: true,
              defaultValue: '230+',
            },
            {
              name: 'platforms',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },

    // BLOG POSTS SECTION
    {
      name: 'blogPosts',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'blog-posts',
      },
      fields: [
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
          name: 'posts',
          type: 'array',
          label: 'Blog Post Items',
          minRows: 1,
          maxRows: 3,
          fields: [
            {
              name: 'authorAvatar',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'authorName',
              type: 'text',
              required: true,
            },
            {
              name: 'likes',
              type: 'number',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
              defaultValue: '/blog-details',
            },
          ],
        },
      ],
    },

    // CTA SECTION
    {
      name: 'cta',
      type: 'group',
      admin: {
        condition: (data) => data.sectionType === 'cta',
      },
      fields: [
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
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
          name: 'primaryButton',
          type: 'group',
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
        {
          name: 'secondaryButton',
          type: 'group',
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Statistics',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'number',
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
        {
          name: 'floatingCards',
          type: 'array',
          label: 'Floating Info Cards',
          maxRows: 2,
          fields: [
            {
              name: 'icon',
              type: 'select',
              options: [
                { label: 'Person Check', value: 'bi-person-check-fill' },
                { label: 'Play Circle', value: 'bi-play-circle-fill' },
                { label: 'Award', value: 'bi-award-fill' },
                { label: 'Check Circle', value: 'bi-check-circle-fill' },
              ],
            },
            {
              name: 'number',
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
  ],
}
