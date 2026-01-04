import type { Block } from 'payload'

export const videoBlock: Block = {
  slug: 'video',
  labels: {
    singular: 'Video Block',
    plural: 'Video Blocks',
  },
  fields: [
    {
      name: 'videoType',
      type: 'select',
      required: true,
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'Self-Hosted', value: 'selfhosted' },
        { label: 'External URL', value: 'external' },
      ],
    },
    {
      name: 'videoUrl',
      type: 'text',
      required: false,
      admin: {
        description: 'Full YouTube URL (e.g., https://www.youtube.com/watch?v=xxxxx) or Vimeo URL',
        condition: (data, siblingData) =>
          siblingData.videoType === 'youtube' ||
          siblingData.videoType === 'vimeo' ||
          siblingData.videoType === 'external',
      },
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload video file',
        condition: (data, siblingData) => siblingData.videoType === 'selfhosted',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Video thumbnail/poster image',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional title above video',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Optional description below video',
      },
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Auto-play video when page loads (muted)',
      },
    },
    {
      name: 'loop',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Loop video continuously',
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '16:9',
      options: [
        { label: '16:9 (Widescreen)', value: '16:9' },
        { label: '4:3 (Standard)', value: '4:3' },
        { label: '1:1 (Square)', value: '1:1' },
        { label: '21:9 (Ultrawide)', value: '21:9' },
      ],
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'full',
      options: [
        { label: 'Full Width', value: 'full' },
        { label: 'Contained', value: 'contained' },
        { label: 'Wide', value: 'wide' },
      ],
      admin: {
        description: 'Video container width',
      },
    },
  ],
}
