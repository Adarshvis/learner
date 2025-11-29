import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import * as fs from 'fs'
import * as path from 'path'

// Helper function to upload images
const uploadImage = async (payload: any, imagePath: string, alt: string) => {
  const fullPath = path.join(process.cwd(), '..', 'Learner', 'Learner', imagePath)
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Image not found: ${fullPath}`)
    return null
  }

  const imageBuffer = fs.readFileSync(fullPath)
  const fileName = path.basename(imagePath)

  const uploadedImage = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: imageBuffer,
      mimetype: 'image/webp',
      name: fileName,
      size: imageBuffer.length,
    },
  })

  console.log(`✅ Uploaded: ${fileName}`)
  return uploadedImage.id
}

async function seedBlogPage() {
  const payload = await getPayload({ config })

  console.log('📝 Seeding BlogPage content...')

  try {

    console.log('\n📤 Uploading blog images...\n')

    // Upload Blog Hero Grid images (5 posts)
    const heroPost1 = await uploadImage(payload, 'assets/img/blog/blog-post-3.webp', 'Featured Blog Post')
    const heroPost2 = await uploadImage(payload, 'assets/img/blog/blog-post-portrait-1.webp', 'Security Blog Post')
    const heroPost3 = await uploadImage(payload, 'assets/img/blog/blog-post-9.webp', 'Career Blog Post')
    const heroPost4 = await uploadImage(payload, 'assets/img/blog/blog-post-7.webp', 'Cloud Blog Post')
    const heroPost5 = await uploadImage(payload, 'assets/img/blog/blog-post-6.webp', 'Programming Blog Post')

    // Upload Blog Posts List images (6 posts)
    const blogPost1 = await uploadImage(payload, 'assets/img/blog/blog-post-1.webp', 'Politics Blog Post')
    const blogPost2 = await uploadImage(payload, 'assets/img/blog/blog-post-2.webp', 'Economics Blog Post')
    const blogPost3 = await uploadImage(payload, 'assets/img/blog/blog-post-3.webp', 'Sports Blog Post')
    const blogPost4 = await uploadImage(payload, 'assets/img/blog/blog-post-4.webp', 'Sports Blog Post 2')
    const blogPost5 = await uploadImage(payload, 'assets/img/blog/blog-post-5.webp', 'Politics Blog Post 2')
    const blogPost6 = await uploadImage(payload, 'assets/img/blog/blog-post-6.webp', 'Economics Blog Post 2')

    console.log('\n📄 Creating BlogPage sections...\n')

    // PAGE TITLE
    await payload.create({
      collection: 'blog-page',
      data: {
        sectionName: 'Blog Page Title',
        sectionType: 'page-title',
        status: 'active',
        pageTitle: {
          title: 'Blog',
          breadcrumbs: [
            { label: 'Home', link: '/index.html', isActive: false },
            { label: 'Blog', link: '', isActive: true },
          ],
        },
      },
    })
    console.log('✅ Page Title created')

    // BLOG HERO GRID
    await payload.create({
      collection: 'blog-page',
      data: {
        sectionName: 'Blog Hero Grid',
        sectionType: 'blog-hero',
        status: 'active',
        blogHero: {
          posts: [
            {
              image: heroPost1,
              date: 'Apr. 14th, 2025',
              category: 'Technology',
              title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              link: 'blog-details.html',
            },
            {
              image: heroPost2,
              date: 'Apr. 14th, 2025',
              category: 'Security',
              title: 'Sed do eiusmod tempor incididunt ut labore',
              link: 'blog-details.html',
            },
            {
              image: heroPost3,
              date: 'Apr. 14th, 2025',
              category: 'Career',
              title: 'Ut enim ad minim veniam, quis nostrud exercitation',
              link: 'blog-details.html',
            },
            {
              image: heroPost4,
              date: 'Apr. 14th, 2025',
              category: 'Cloud',
              title: 'Adipiscing elit, sed do eiusmod tempor incididunt',
              link: 'blog-details.html',
            },
            {
              image: heroPost5,
              date: 'Apr. 14th, 2025',
              category: 'Programming',
              title: 'Excepteur sint occaecat cupidatat non proident',
              link: 'blog-details.html',
            },
          ],
        },
      },
    })
    console.log('✅ Blog Hero Grid created (5 posts)')

    // BLOG POSTS LIST
    await payload.create({
      collection: 'blog-page',
      data: {
        sectionName: 'Blog Posts List',
        sectionType: 'blog-posts',
        status: 'active',
        blogPosts: {
          posts: [
            {
              image: blogPost1,
              date: { day: 12, month: 'December' },
              author: 'John Doe',
              category: 'Politics',
              title: 'Dolorum optio tempore voluptas dignissimos',
              link: 'blog-details.html',
            },
            {
              image: blogPost2,
              date: { day: 19, month: 'March' },
              author: 'Julia Parker',
              category: 'Economics',
              title: 'Nisi magni odit consequatur autem nulla dolorem',
              link: 'blog-details.html',
            },
            {
              image: blogPost3,
              date: { day: 24, month: 'June' },
              author: 'Maria Doe',
              category: 'Sports',
              title: 'Possimus soluta ut id suscipit ea ut. In quo quia et soluta libero sit sint.',
              link: 'blog-details.html',
            },
            {
              image: blogPost4,
              date: { day: 5, month: 'August' },
              author: 'Maria Doe',
              category: 'Sports',
              title: 'Non rem rerum nam cum quo minus explicabo eius exercitationem.',
              link: 'blog-details.html',
            },
            {
              image: blogPost5,
              date: { day: 17, month: 'September' },
              author: 'John Parker',
              category: 'Politics',
              title: 'Accusamus quaerat aliquam qui debitis facilis consequatur',
              link: 'blog-details.html',
            },
            {
              image: blogPost6,
              date: { day: 7, month: 'December' },
              author: 'Julia White',
              category: 'Economics',
              title: 'Distinctio provident quibusdam numquam aperiam aut',
              link: 'blog-details.html',
            },
          ],
        },
      },
    })
    console.log('✅ Blog Posts List created (6 posts)')

    console.log('\n🎉 BlogPage seeding completed!')
    console.log('\n📊 Summary:')
    console.log('- 11 blog images uploaded')
    console.log('- 3 sections created (Page Title, Hero Grid with 5 posts, Posts List with 6 posts)')
    console.log('\n📋 Next steps:')
    console.log('1. Go to http://localhost:3000/admin')
    console.log('2. Navigate to "Blog Page" collection')
    console.log('3. Edit blog posts, dates, categories, and authors')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding BlogPage:', error)
    process.exit(1)
  }
}

seedBlogPage()
