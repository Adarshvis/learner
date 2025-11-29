// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { PageContent } from './collections/PageContent'
import { HomePage } from './collections/HomePage'
import { AboutPage } from './collections/AboutPage'
import { CoursesPage } from './collections/CoursesPage'
import { InstructorsPage } from './collections/InstructorsPage'
import { PricingPage } from './collections/PricingPage'
import { BlogPage } from './collections/BlogPage'
import { BlogDetailsPage } from './collections/BlogDetailsPage'
import { ContactPage } from './collections/ContactPage'
import { EnrollPage } from './collections/EnrollPage'
import { Settings } from './globals/Settings'

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users, 
    Media, 
    PageContent, 
    HomePage,
    AboutPage,
    CoursesPage,
    InstructorsPage,
    PricingPage,
    BlogPage,
    BlogDetailsPage,
    ContactPage,
    EnrollPage
  ],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: './payload-types.ts',
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
