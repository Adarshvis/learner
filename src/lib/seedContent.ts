import { getPayload } from 'payload'
import config from '../payload.config'
import * as fs from 'fs'
import * as path from 'path'

// Helper function to upload images
const uploadImage = async (payload: any, imagePath: string, alt: string) => {
  const fullPath = path.join(process.cwd(), 'public', imagePath)
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Image not found: ${imagePath}`)
    return null
  }

  try {
    const imageBuffer = fs.readFileSync(fullPath)
    const filename = path.basename(imagePath)
    
    const result = await payload.create({
      collection: 'media',
      data: {
        alt: alt,
      },
      file: {
        data: imageBuffer,
        mimetype: `image/${path.extname(filename).slice(1)}`,
        name: filename,
        size: imageBuffer.length,
      },
    })
    
    console.log(`✅ Uploaded: ${filename}`)
    return result.id
  } catch (error) {
    console.log(`❌ Failed to upload ${imagePath}:`, error)
    return null
  }
}

export async function seedAllContent() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting comprehensive content seeding...')

  try {

    // Upload all images used in the frontend
    console.log('\n📸 Uploading images...')
    
    const images = {
      // Hero images
      heroMain: await uploadImage(payload, 'assets/img/education/courses-13.webp', 'Online Learning Platform'),
      
      // Course images
      course1: await uploadImage(payload, 'assets/img/education/students-9.webp', 'Digital Marketing Course'),
      course2: await uploadImage(payload, 'assets/img/education/campus-4.webp', 'Web Development Course'),
      course3: await uploadImage(payload, 'assets/img/education/courses-12.webp', 'Data Science Course'),
      course4: await uploadImage(payload, 'assets/img/education/education-5.webp', 'Introduction to Data Science'),
      course5: await uploadImage(payload, 'assets/img/education/activities-3.webp', 'Business Strategy Course'),
      course6: await uploadImage(payload, 'assets/img/education/teacher-6.webp', 'Graphic Design Course'),
      
      // Instructor images
      instructor1: await uploadImage(payload, 'assets/img/education/teacher-2.webp', 'Sarah Johnson Profile'),
      instructor2: await uploadImage(payload, 'assets/img/education/teacher-7.webp', 'Michael Chen Profile'),
      instructor3: await uploadImage(payload, 'assets/img/education/teacher-4.webp', 'Amanda Rodriguez Profile'),
      instructor4: await uploadImage(payload, 'assets/img/education/teacher-9.webp', 'David Thompson Profile'),
      
      // Person avatars
      person1: await uploadImage(payload, 'assets/img/person/person-f-3.webp', 'Instructor Avatar'),
      person2: await uploadImage(payload, 'assets/img/person/person-m-5.webp', 'Instructor Avatar'),
      person3: await uploadImage(payload, 'assets/img/person/person-f-7.webp', 'Instructor Avatar'),
      person4: await uploadImage(payload, 'assets/img/person/person-m-8.webp', 'Instructor Avatar'),
      person5: await uploadImage(payload, 'assets/img/person/person-f-12.webp', 'Instructor Avatar'),
      
      // Blog images
      blog1: await uploadImage(payload, 'assets/img/blog/blog-post-1.webp', 'Blog Post Featured Image'),
      blog2: await uploadImage(payload, 'assets/img/blog/blog-post-2.webp', 'Blog Post Featured Image'),
      blog3: await uploadImage(payload, 'assets/img/blog/blog-post-3.webp', 'Blog Post Featured Image'),
      
      // Blog authors
      author1: await uploadImage(payload, 'assets/img/person/person-f-12.webp', 'Sarah Johnson Avatar'),
      author2: await uploadImage(payload, 'assets/img/person/person-f-13.webp', 'Michael Chen Avatar'),
      author3: await uploadImage(payload, 'assets/img/person/person-m-10.webp', 'Emily Davis Avatar'),
      
      // Testimonial avatars
      testimonial1: await uploadImage(payload, 'assets/img/person/person-f-1.webp', 'Student Avatar'),
      testimonial2: await uploadImage(payload, 'assets/img/person/person-m-2.webp', 'Student Avatar'),
      testimonial3: await uploadImage(payload, 'assets/img/person/person-f-3.webp', 'Student Avatar'),
      
      // CTA image
      ctaImage: await uploadImage(payload, 'assets/img/education/courses-4.webp', 'Online Learning CTA'),
    }

    console.log('\n📄 Creating page content sections...')

    // HOMEPAGE CONTENT
    
    // Hero Section
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'home-page',
        pageTitle: 'Homepage - Hero Section',
        pageSlug: 'homepage-hero',
        status: 'published',
        customPageData: {
          title: 'Transform Your Future with Expert-Led Online Courses',
          description: 'Discover thousands of high-quality courses designed by industry professionals. Learn at your own pace, gain in-demand skills, and advance your career from anywhere in the world.',
          buttonText: 'Browse Courses',
          buttonLink: '#courses',
          secondaryButtonText: 'Learn More',
          secondaryButtonLink: '#about',
          image: images.heroMain,
        },
        customStats: [
          { number: '50000', label: 'Students Enrolled', icon: 'bi-people' },
          { number: '1200', label: 'Expert Courses', icon: 'bi-book' },
          { number: '98', label: 'Success Rate %', icon: 'bi-graph-up' },
        ],
        customFeatures: [
          { title: 'Certified Programs', icon: 'bi-shield-check' },
          { title: 'Lifetime Access', icon: 'bi-clock' },
          { title: 'Expert Instructors', icon: 'bi-people' },
        ],
      },
    })

    // Featured Courses Section
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'home-page',
        pageTitle: 'Homepage - Featured Courses',
        pageSlug: 'homepage-featured-courses',
        status: 'published',
        customPageData: {
          title: 'Featured Courses',
          description: 'Explore our most popular courses taught by industry experts',
        },
      },
    })

    // Course Categories Section
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'home-page',
        pageTitle: 'Homepage - Course Categories',
        pageSlug: 'homepage-course-categories',
        status: 'published',
        customPageData: {
          title: 'Course Categories',
          description: 'Explore our diverse range of course categories designed to meet your learning goals',
        },
      },
    })

    // Featured Instructors Section
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'home-page',
        pageTitle: 'Homepage - Featured Instructors',
        pageSlug: 'homepage-featured-instructors',
        status: 'published',
        customPageData: {
          title: 'Featured Instructors',
          description: 'Learn from industry experts with years of real-world experience',
        },
      },
    })

    // Testimonials Section
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'home-page',
        pageTitle: 'Homepage - Testimonials',
        pageSlug: 'homepage-testimonials',
        status: 'published',
        customPageData: {
          title: 'Testimonials',
          description: 'What our students say about their learning experience with us',
        },
        customStats: [
          { number: '4.8', label: 'Overall Rating' },
          { number: '230+', label: 'Reviews' },
        ],
      },
    })

    // Blog Posts Section
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'home-page',
        pageTitle: 'Homepage - Recent Blog Posts',
        pageSlug: 'homepage-blog-posts',
        status: 'published',
        customPageData: {
          title: 'Recent Blog Posts',
          description: 'Stay updated with the latest insights, tips, and trends in online learning',
        },
      },
    })

    // CTA Section
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'home-page',
        pageTitle: 'Homepage - Call to Action',
        pageSlug: 'homepage-cta',
        status: 'published',
        customPageData: {
          title: 'Transform Your Future with Expert-Led Online Courses',
          description: 'Join thousands of successful learners who have advanced their careers through our comprehensive online education platform.',
          buttonText: 'Browse Courses',
          buttonLink: '/courses',
          secondaryButtonText: 'Enroll Now',
          secondaryButtonLink: '/enroll',
          image: images.ctaImage,
        },
        customFeatures: [
          { title: '20+ Expert instructors with industry experience', icon: 'bi-check-circle-fill' },
          { title: 'Certificate of completion for every course', icon: 'bi-check-circle-fill' },
          { title: '24/7 access to course materials and resources', icon: 'bi-check-circle-fill' },
          { title: 'Interactive assignments and real-world projects', icon: 'bi-check-circle-fill' },
        ],
        customStats: [
          { number: '15000+', label: 'Students Enrolled' },
          { number: '150+', label: 'Courses Available' },
          { number: '98%', label: 'Success Rate' },
        ],
      },
    })

    // Floating Cards Data
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'home-page',
        pageTitle: 'Homepage - Hero Floating Cards',
        pageSlug: 'homepage-floating-cards',
        status: 'published',
        customData: [
          { fieldName: 'card1_icon', fieldValue: 'bi-code-slash', fieldType: 'text' },
          { fieldName: 'card1_title', fieldValue: 'Web Development', fieldType: 'text' },
          { fieldName: 'card1_students', fieldValue: '2,450 Students', fieldType: 'text' },
          { fieldName: 'card2_icon', fieldValue: 'bi-palette', fieldType: 'text' },
          { fieldName: 'card2_title', fieldValue: 'UI/UX Design', fieldType: 'text' },
          { fieldName: 'card2_students', fieldValue: '1,890 Students', fieldType: 'text' },
          { fieldName: 'card3_icon', fieldValue: 'bi-graph-up', fieldType: 'text' },
          { fieldName: 'card3_title', fieldValue: 'Digital Marketing', fieldType: 'text' },
          { fieldName: 'card3_students', fieldValue: '3,200 Students', fieldType: 'text' },
        ],
      },
    })

    console.log('✅ Homepage content created!')

    // ABOUT PAGE CONTENT (placeholder - you can expand this)
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'about-page',
        pageTitle: 'About - Hero Section',
        pageSlug: 'about-hero',
        status: 'published',
        customPageData: {
          title: 'About Learner',
          description: 'We are dedicated to providing world-class education to learners worldwide. Our mission is to make quality education accessible to everyone.',
        },
      },
    })

    // COURSES PAGE CONTENT
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'courses-page',
        pageTitle: 'Courses - Hero Section',
        pageSlug: 'courses-hero',
        status: 'published',
        customPageData: {
          title: 'Explore Our Courses',
          description: 'Browse through our comprehensive catalog of courses designed by industry experts',
        },
      },
    })

    // INSTRUCTORS PAGE CONTENT
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'instructors-page',
        pageTitle: 'Instructors - Hero Section',
        pageSlug: 'instructors-hero',
        status: 'published',
        customPageData: {
          title: 'Meet Our Expert Instructors',
          description: 'Learn from industry professionals with years of real-world experience',
        },
      },
    })

    // PRICING PAGE CONTENT
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'pricing-page',
        pageTitle: 'Pricing - Hero Section',
        pageSlug: 'pricing-hero',
        status: 'published',
        customPageData: {
          title: 'Choose Your Plan',
          description: 'Select the perfect plan for your learning journey',
        },
      },
    })

    // BLOG PAGE CONTENT
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'blog-page',
        pageTitle: 'Blog - Hero Section',
        pageSlug: 'blog-hero',
        status: 'published',
        customPageData: {
          title: 'Our Blog',
          description: 'Insights, tips, and trends in online learning',
        },
      },
    })

    // CONTACT PAGE CONTENT
    await payload.create({
      collection: 'page-content',
      data: {
        pageType: 'contact-page',
        pageTitle: 'Contact - Hero Section',
        pageSlug: 'contact-hero',
        status: 'published',
        customPageData: {
          title: 'Get in Touch',
          description: 'Have questions? We\'re here to help!',
        },
      },
    })

    console.log('✅ All page content sections created!')
    console.log('\n🎉 Content seeding completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('1. Go to http://localhost:3000/admin')
    console.log('2. Navigate to "Page Content" collection')
    console.log('3. Edit any section to change text, images, or data')
    console.log('4. Changes will reflect immediately on the frontend!')

  } catch (error) {
    console.error('❌ Error seeding content:', error)
    throw error
  }
}
