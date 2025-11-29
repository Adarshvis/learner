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

async function seedBlogDetailsPage() {
  const payload = await getPayload({ config })

  console.log('📰 Seeding BlogDetailsPage content...')

  try {
    console.log('\n📤 Uploading images...\n')

    // Upload images
    const authorImage = await uploadImage(payload, 'assets/img/person/person-m-6.webp', 'Author David Wilson')
    const featuredImage = await uploadImage(payload, 'assets/img/blog/blog-hero-1.webp', 'UI Design Evolution')
    const contentImage = await uploadImage(payload, 'assets/img/blog/blog-hero-2.webp', 'Skeuomorphic Design Example')
    
    // Comment avatars
    const avatar1 = await uploadImage(payload, 'assets/img/person/person-f-9.webp', 'Thomas Anderson Avatar')
    const avatar2 = await uploadImage(payload, 'assets/img/person/person-m-9.webp', 'Maria Rodriguez Avatar')
    const avatar3 = await uploadImage(payload, 'assets/img/person/person-f-7.webp', 'Emily Watson Avatar')

    console.log('\n📄 Creating BlogDetailsPage sections...\n')

    // PAGE TITLE
    await payload.create({
      collection: 'blog-details-page',
      data: {
        sectionName: 'Blog Details Page Title',
        sectionType: 'page-title',
        status: 'active',
        pageTitle: {
          title: 'Blog Details',
          breadcrumbs: [
            { label: 'Home', link: '/index.html', isActive: false },
            { label: 'Blog Details', link: '', isActive: true },
          ],
        },
      },
    })
    console.log('✅ Page Title created')

    // ARTICLE HEADER
    await payload.create({
      collection: 'blog-details-page',
      data: {
        sectionName: 'Article Header',
        sectionType: 'article-header',
        status: 'active',
        articleHeader: {
          categories: [
            { name: 'Technology', link: '#' },
            { name: 'Innovation', link: '#' },
          ],
          title: 'The Evolution of User Interface Design: From Skeuomorphism to Neumorphism',
          author: {
            image: authorImage,
            name: 'David Wilson',
            role: 'UI/UX Design Lead',
          },
          postInfo: {
            date: 'April 15, 2025',
            readTime: '10 min read',
            commentsCount: 32,
          },
          featuredImage: featuredImage,
          tableOfContents: [
            { label: 'Introduction', anchor: 'introduction' },
            { label: 'The Skeuomorphic Era', anchor: 'skeuomorphism' },
            { label: 'Flat Design Revolution', anchor: 'flat-design' },
            { label: 'Material Design', anchor: 'material-design' },
            { label: 'Rise of Neumorphism', anchor: 'neumorphism' },
            { label: 'Future Trends', anchor: 'future' },
          ],
          tags: [
            { name: 'UI Design', link: '#' },
            { name: 'User Experience', link: '#' },
            { name: 'Design Trends', link: '#' },
            { name: 'Innovation', link: '#' },
            { name: 'Technology', link: '#' },
          ],
        },
      },
    })
    console.log('✅ Article Header created')

    // ARTICLE CONTENT
    await payload.create({
      collection: 'blog-details-page',
      data: {
        sectionName: 'Article Content',
        sectionType: 'article-content',
        status: 'active',
        articleContent: {
          sections: [
            {
              sectionId: 'introduction',
              content: 'The journey of user interface design has been marked by significant shifts in aesthetic approaches, each era bringing its own unique perspective on how digital interfaces should look and feel.\n\nFrom the early days of graphical user interfaces to today\'s sophisticated design systems, the evolution of UI design reflects not just technological advancement, but also changing user expectations and cultural shifts in how we interact with digital products.',
              hasQuote: true,
              quote: {
                text: 'Design is not just what it looks like and feels like. Design is how it works.',
                author: 'Steve Jobs',
              },
              hasImage: false,
            },
            {
              sectionId: 'skeuomorphism',
              heading: 'The Skeuomorphic Era',
              content: 'Skeuomorphic design dominated the early years of digital interfaces, attempting to mirror real-world objects in digital form. This approach helped users transition from physical to digital interactions through familiar visual metaphors.',
              hasQuote: false,
              hasImage: true,
              image: {
                file: contentImage,
                caption: 'Early iOS design showcasing skeuomorphic elements',
                position: 'right',
              },
            },
            {
              sectionId: 'flat-design',
              heading: 'The Flat Design Revolution',
              content: 'As users became more comfortable with digital interfaces, design began moving towards simplification. Flat design emerged as a reaction to the ornate details of skeuomorphism, emphasizing clarity and efficiency.',
              hasQuote: false,
              hasImage: false,
            },
            {
              sectionId: 'material-design',
              heading: 'Material Design: Finding Balance',
              content: 'Google\'s Material Design emerged as a comprehensive design system that combined the simplicity of flat design with subtle depth cues, creating a more intuitive user experience while maintaining modern aesthetics.',
              hasQuote: false,
              hasImage: false,
            },
            {
              sectionId: 'neumorphism',
              heading: 'The Rise of Neumorphism',
              content: 'Neumorphism represents the latest evolution in UI design, combining aspects of skeuomorphism with modern minimal aesthetics. This style creates soft, extruded surfaces that appear to emerge from the background.',
              hasQuote: false,
              hasImage: false,
            },
            {
              sectionId: 'future',
              heading: 'Looking to the Future',
              content: 'As we look ahead, UI design continues to evolve with new technologies and user expectations. The future may bring more personalized, adaptive interfaces that respond to individual user preferences and contexts.',
              hasQuote: false,
              hasImage: false,
            },
          ],
        },
      },
    })
    console.log('✅ Article Content created (6 sections)')

    // COMMENTS SECTION
    await payload.create({
      collection: 'blog-details-page',
      data: {
        sectionName: 'Comments Section',
        sectionType: 'comments',
        status: 'active',
        comments: {
          heading: 'Community Feedback',
          totalComments: 12,
          commentThreads: [
            {
              avatar: avatar1,
              authorName: 'Thomas Anderson',
              timeAgo: '2 hours ago',
              likes: 24,
              commentText: 'Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc.',
              replies: [
                {
                  avatar: avatar2,
                  authorName: 'Maria Rodriguez',
                  timeAgo: '1 hour ago',
                  likes: 8,
                  commentText: 'Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae.',
                },
                {
                  avatar: avatar1,
                  authorName: 'Alex Chen',
                  timeAgo: '30 minutes ago',
                  likes: 5,
                  commentText: 'Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.',
                },
              ],
            },
            {
              avatar: avatar3,
              authorName: 'Emily Watson',
              timeAgo: '3 hours ago',
              likes: 15,
              commentText: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.',
              replies: [],
            },
          ],
        },
      },
    })
    console.log('✅ Comments Section created (2 threads with 3 replies)')

    console.log('\n🎉 BlogDetailsPage seeding completed!')
    console.log('\n📊 Summary:')
    console.log('- 6 images uploaded (author, featured, content, 3 comment avatars)')
    console.log('- 4 sections created (Page Title, Article Header, Article Content with 6 sections, Comments)')
    console.log('\n📋 Next steps:')
    console.log('1. Go to http://localhost:3000/admin')
    console.log('2. Navigate to "Blog Details Page" collection')
    console.log('3. Edit article content, comments, and metadata')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding BlogDetailsPage:', error)
    process.exit(1)
  }
}

seedBlogDetailsPage()
