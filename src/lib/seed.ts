import { getPayload } from 'payload'
import config from '../payload.config'

export async function seedDatabase() {
  const payload = await getPayload({ config })

  try {
    // Seed basic page content
    await Promise.all([
      payload.create({
        collection: 'page-content',
        data: {
          pageType: 'home-page',
          pageTitle: 'Homepage',
          pageSlug: 'home',
          status: 'published',
          customPageData: {
            title: 'Learn Without Limits',
            subtitle: 'Unlock Your Potential with Expert-Led Courses',
            description: 'Join thousands of students learning from industry experts. Master in-demand skills with our comprehensive online courses.',
            buttonText: 'Start Learning Today',
            buttonLink: '/courses'
          }
        }
      }),
      payload.create({
        collection: 'page-content',
        data: {
          pageType: 'about-page',
          pageTitle: 'About Us',
          pageSlug: 'about',
          status: 'published',
          customPageData: {
            title: 'About Learner',
            description: 'We are dedicated to providing world-class education to learners worldwide. Our mission is to make quality education accessible to everyone.'
          }
        }
      }),
      payload.create({
        collection: 'page-content',
        data: {
          pageType: 'courses-page',
          pageTitle: 'Courses',
          pageSlug: 'courses',
          status: 'published',
          customPageData: {
            title: 'Explore Our Courses',
            description: 'Browse through our comprehensive catalog of courses designed by industry experts'
          }
        }
      }),
      payload.create({
        collection: 'page-content',
        data: {
          pageType: 'instructors-page',
          pageTitle: 'Instructors',
          pageSlug: 'instructors',
          status: 'published',
          customPageData: {
            title: 'Meet Our Expert Instructors',
            description: 'Learn from industry professionals with years of real-world experience'
          }
        }
      }),
      payload.create({
        collection: 'page-content',
        data: {
          pageType: 'pricing-page',
          pageTitle: 'Pricing',
          pageSlug: 'pricing',
          status: 'published',
          customPageData: {
            title: 'Choose Your Plan',
            description: 'Select the perfect plan for your learning journey'
          }
        }
      }),
      payload.create({
        collection: 'page-content',
        data: {
          pageType: 'blog-page',
          pageTitle: 'Blog',
          pageSlug: 'blog',
          status: 'published',
          customPageData: {
            title: 'Our Blog',
            description: 'Insights, tips, and trends in online learning'
          }
        }
      }),
      payload.create({
        collection: 'page-content',
        data: {
          pageType: 'contact-page',
          pageTitle: 'Contact Us',
          pageSlug: 'contact',
          status: 'published',
          customPageData: {
            title: 'Get in Touch',
            description: 'Have questions? We\'re here to help!'
          }
        }
      }),
      payload.create({
        collection: 'page-content',
        data: {
          pageType: 'enroll-page',
          pageTitle: 'Enroll',
          pageSlug: 'enroll',
          status: 'published',
          customPageData: {
            title: 'Ready to Start Your Learning Journey?',
            subtitle: 'Join Our Community of Learners',
            description: 'Take the first step towards mastering new skills. Enroll in our courses and transform your career.',
            buttonText: 'Enroll Now',
            buttonLink: '/courses'
          }
        }
      })
    ])

    console.log('✅ Database seeded successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
  }
}
