import type { Block, Field } from 'payload'
import { colorPickerField } from '@innovixx/payload-color-picker-field'

const fontFamilyOptions = [
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Poppins', value: 'Poppins, sans-serif' },
  { label: 'Montserrat', value: 'Montserrat, sans-serif' },
  { label: 'Raleway', value: 'Raleway, sans-serif' },
  { label: 'Open Sans', value: 'Open Sans, sans-serif' },
  { label: 'Lora', value: 'Lora, serif' },
]

const richTextSubBlock: Block = {
  slug: 'flexRichText',
  labels: {
    singular: 'Rich Text',
    plural: 'Rich Text',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'fontFamily',
      type: 'select',
      defaultValue: 'Inter, sans-serif',
      options: fontFamilyOptions,
    },
    {
      name: 'fontSize',
      type: 'select',
      defaultValue: 'base',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Base', value: 'base' },
        { label: 'Large', value: 'lg' },
        { label: 'XL', value: 'xl' },
        { label: '2XL', value: '2xl' },
      ],
    },
    colorPickerField({
      name: 'textColor',
      defaultValue: '#111111',
    }) as Field,
  ],
}

const imageSubBlock: Block = {
  slug: 'flexImage',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    colorPickerField({
      name: 'captionColor',
      defaultValue: '#ffffff',
    }) as Field,
    {
      name: 'objectFit',
      type: 'select',
      defaultValue: 'cover',
      options: [
        { label: 'Cover', value: 'cover' },
        { label: 'Contain', value: 'contain' },
        { label: 'None', value: 'none' },
      ],
    },
    {
      name: 'borderRadius',
      type: 'select',
      defaultValue: 'md',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Full Circle', value: 'full-circle' },
      ],
    },
  ],
}

const videoSubBlock: Block = {
  slug: 'flexVideo',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  fields: [
    {
      name: 'sourceType',
      type: 'select',
      defaultValue: 'youtube',
      required: true,
      options: [
        { label: 'Upload', value: 'upload' },
        { label: 'YouTube URL', value: 'youtube' },
        { label: 'Vimeo URL', value: 'vimeo' },
        { label: 'External URL (mp4/webm)', value: 'external' },
      ],
    },
    {
      name: 'videoUpload',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_data, siblingData) => siblingData?.sourceType === 'upload',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        condition: (_data, siblingData) =>
          siblingData?.sourceType === 'youtube' ||
          siblingData?.sourceType === 'vimeo' ||
          siblingData?.sourceType === 'external',
      },
    },
    {
      name: 'posterImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Autoplay videos in muted mode',
      },
    },
    {
      name: 'loop',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'showControls',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

const carouselSubBlock: Block = {
  slug: 'flexCarousel',
  labels: {
    singular: 'Carousel / Slider',
    plural: 'Carousel / Slider',
  },
  fields: [
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'intervalMs',
      type: 'number',
      defaultValue: 3500,
      min: 800,
    },
    {
      name: 'showDots',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showArrows',
      type: 'checkbox',
      defaultValue: true,
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
            { label: 'Image', value: 'image' },
            { label: 'Video Upload', value: 'videoUpload' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_data, siblingData) => siblingData?.mediaType === 'image',
          },
        },
        {
          name: 'videoUpload',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_data, siblingData) => siblingData?.mediaType === 'videoUpload',
          },
        },
        {
          name: 'youtubeUrl',
          type: 'text',
          admin: {
            condition: (_data, siblingData) => siblingData?.mediaType === 'youtube',
          },
        },
      ],
    },
  ],
}

const embedSubBlock: Block = {
  slug: 'flexEmbed',
  labels: {
    singular: 'Map / Embed',
    plural: 'Map / Embed',
  },
  fields: [
    {
      name: 'embedType',
      type: 'select',
      required: true,
      defaultValue: 'iframe',
      options: [
        { label: 'iFrame URL', value: 'iframe' },
        { label: 'Raw HTML Embed Code', value: 'html' },
      ],
    },
    {
      name: 'iframeUrl',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => siblingData?.embedType === 'iframe',
      },
    },
    {
      name: 'htmlCode',
      type: 'code',
      admin: {
        language: 'html',
        condition: (_data, siblingData) => siblingData?.embedType === 'html',
      },
    },
    {
      name: 'heightPx',
      type: 'number',
      defaultValue: 320,
      min: 180,
    },
  ],
}

const animationSubBlock: Block = {
  slug: 'flexAnimation',
  labels: {
    singular: 'Animation',
    plural: 'Animation',
  },
  fields: [
    {
      name: 'animationType',
      type: 'select',
      required: true,
      defaultValue: 'lottie',
      options: [
        { label: 'Lottie JSON URL', value: 'lottie' },
        { label: 'GIF Upload', value: 'gif' },
      ],
    },
    {
      name: 'lottieUrl',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => siblingData?.animationType === 'lottie',
      },
    },
    {
      name: 'gifFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_data, siblingData) => siblingData?.animationType === 'gif',
      },
    },
    {
      name: 'loop',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

const columnBlocks: Block[] = [
  richTextSubBlock,
  imageSubBlock,
  videoSubBlock,
  carouselSubBlock,
  embedSubBlock,
  animationSubBlock,
]

export const createFlexibleRowFields = (): Field[] => [
  {
    name: 'heading',
    type: 'text',
  },
  {
    name: 'description',
    type: 'textarea',
  },
  {
    name: 'alignment',
    type: 'select',
    defaultValue: 'left',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  },
  colorPickerField({
    name: 'sectionBackgroundColor',
    defaultValue: '#ffffff',
  }) as Field,
  {
    name: 'columnGap',
    type: 'select',
    defaultValue: 'medium',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
      { label: 'XL', value: 'xl' },
    ],
  },
  {
    name: 'verticalAlign',
    type: 'select',
    defaultValue: 'stretch',
    options: [
      { label: 'Top', value: 'top' },
      { label: 'Center', value: 'center' },
      { label: 'Bottom', value: 'bottom' },
      { label: 'Stretch', value: 'stretch' },
    ],
  },
  {
    name: 'columns',
    type: 'array',
    minRows: 1,
    maxRows: 12,
    fields: [
      {
        name: 'width',
        type: 'select',
        defaultValue: 'auto',
        options: [
          { label: 'Auto (Equal)', value: 'auto' },
          { label: '25%', value: '25' },
          { label: '33%', value: '33' },
          { label: '50%', value: '50' },
          { label: '66%', value: '66' },
          { label: '75%', value: '75' },
          { label: '100%', value: '100' },
        ],
      },
      colorPickerField({
        name: 'backgroundColor',
        defaultValue: '#f7f9fb',
      }) as Field,
      {
        name: 'padding',
        type: 'select',
        defaultValue: 'medium',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ],
      },
      {
        name: 'blocks',
        type: 'blocks',
        blocks: columnBlocks,
      },
    ],
  },
]

export const FlexibleRowBlock: Block = {
  slug: 'flexibleRow',
  labels: {
    singular: 'Flexible Row',
    plural: 'Flexible Rows',
  },
  fields: createFlexibleRowFields(),
}
