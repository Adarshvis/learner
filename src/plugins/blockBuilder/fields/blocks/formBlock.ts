import type { Block } from 'payload'

export const formBlock: Block = {
  slug: 'form',
  labels: {
    singular: 'Form Block',
    plural: 'Form Blocks',
  },
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      defaultValue: 'contact',
      options: [
        { label: 'Contact Form', value: 'contact' },
        { label: 'Newsletter Signup', value: 'newsletter' },
        { label: 'Enrollment Form', value: 'enrollment' },
        { label: 'Custom Form', value: 'custom' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'submitButtonText',
      type: 'text',
      defaultValue: 'Submit',
    },
    {
      name: 'successMessage',
      type: 'textarea',
      defaultValue: 'Thank you for your submission!',
    },
    {
      name: 'formFields',
      type: 'array',
      required: false,
      admin: {
        condition: (data, siblingData) => siblingData.formType === 'custom',
      },
      fields: [
        {
          name: 'fieldName',
          type: 'text',
          required: true,
        },
        {
          name: 'fieldLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'fieldType',
          type: 'select',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'tel' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Select', value: 'select' },
            { label: 'Checkbox', value: 'checkbox' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'placeholder',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
}
