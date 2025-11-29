import { getPayload } from 'payload'
import config from '../payload.config'

// Initialize payload instance
let payloadInstance: any = null

async function getPayloadInstance() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config })
  }
  return payloadInstance
}

// Utility functions for fetching data
export async function getFeaturedCourses() {
  try {
    const payload = await getPayloadInstance()
    const courses = await payload.find({
      collection: 'page-content',
      where: {
        and: [
          { contentType: { equals: 'course' } },
          { featured: { equals: true } },
          { status: { equals: 'published' } }
        ]
      },
      limit: 6
    })
    return courses.docs
  } catch (error) {
    console.error('Error fetching featured courses:', error)
    return []
  }
}

export async function getFeaturedInstructors() {
  try {
    const payload = await getPayloadInstance()
    const instructors = await payload.find({
      collection: 'page-content',
      where: {
        and: [
          { contentType: { equals: 'instructor' } },
          { featured: { equals: true } },
          { status: { equals: 'active' } }
        ]
      },
      limit: 4
    })
    return instructors.docs
  } catch (error) {
    console.error('Error fetching featured instructors:', error)
    return []
  }
}

export async function getFeaturedBlogPosts() {
  try {
    const payload = await getPayloadInstance()
    const posts = await payload.find({
      collection: 'page-content',
      where: {
        and: [
          { contentType: { equals: 'blog-post' } },
          { featured: { equals: true } },
          { status: { equals: 'published' } }
        ]
      },
      limit: 3
    })
    return posts.docs
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    return []
  }
}

export async function getFeaturedTestimonials() {
  try {
    const payload = await getPayloadInstance()
    const testimonials = await payload.find({
      collection: 'page-content',
      where: {
        and: [
          { contentType: { equals: 'testimonial' } },
          { featured: { equals: true } },
          { status: { equals: 'approved' } }
        ]
      },
      limit: 5
    })
    return testimonials.docs
  } catch (error) {
    console.error('Error fetching featured testimonials:', error)
    return []
  }
}

export async function getPageContent(pageName: string, section?: string) {
  try {
    const payload = await getPayloadInstance()
    
    // Map page names to their actual collection slugs from payload.config.ts
    const collectionMap: { [key: string]: string } = {
      'homepage': 'home-page',
      'home': 'home-page',
      'about': 'about-page', 
      'courses': 'courses-page',
      'instructors': 'instructors-page',
      'pricing': 'pricing-page',
      'blog': 'blog-page',
      'blog-details': 'blog-details-page',
      'contact': 'contact-page',
      'enroll': 'enroll-page'
    }
    
    const collectionSlug = collectionMap[pageName] || pageName
    
    const whereClause: any = { 
      status: { equals: 'active' }
    }
    
    if (section) {
      whereClause.sectionType = { equals: section }
    }

    const content = await payload.find({
      collection: collectionSlug,
      where: whereClause
    })
    
    console.log(`Found ${content.docs.length} items in collection: ${collectionSlug}`)
    
    if (section && content.docs.length > 0) {
      return content.docs[0]
    }
    
    return content.docs
  } catch (error) {
    console.error('Error fetching page content:', error)
    return section ? null : []
  }
}

export async function getMediaUrl(mediaId: any) {
  if (!mediaId) return null
  
  try {
    if (typeof mediaId === 'object' && mediaId.url) {
      return mediaId.url
    }
    
    const payload = await getPayloadInstance()
    const media = await payload.findByID({
      collection: 'media',
      id: typeof mediaId === 'string' ? mediaId : mediaId.id,
    })
    
    return media?.url || null
  } catch (error) {
    console.error('Error fetching media URL:', error)
    return null
  }
}

export async function getSettings() {
  try {
    const payload = await getPayloadInstance()
    const settings = await payload.findGlobal({
      slug: 'settings'
    })
    return settings
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}

export async function getPricingPlans() {
  try {
    const payload = await getPayloadInstance()
    const plans = await payload.find({
      collection: 'pricing-plans',
      where: {
        status: { equals: 'active' }
      },
      sort: 'order'
    })
    return plans.docs
  } catch (error) {
    console.error('Error fetching pricing plans:', error)
    return []
  }
}

export async function getUpcomingEvents() {
  try {
    const payload = await getPayloadInstance()
    const events = await payload.find({
      collection: 'events',
      where: {
        and: [
          { status: { equals: 'upcoming' } },
          { eventDate: { greater_than: new Date().toISOString() } }
        ]
      },
      limit: 6,
      sort: 'eventDate'
    })
    return events.docs
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    return []
  }
}

export async function getContactInfo() {
  try {
    const payload = await getPayloadInstance()
    const contactInfo = await payload.find({
      collection: 'contact-info',
      where: {
        status: { equals: 'active' }
      },
      sort: 'order'
    })
    return contactInfo.docs
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return []
  }
}

export async function getCollection(collectionSlug: string, options?: any) {
  try {
    const payload = await getPayloadInstance()
    
    // Handle specific collection logic
    let whereClause: any = {}
    
    // Map collection slugs to actual collection names
    const collectionMapping: { [key: string]: string } = {
      'home-page': 'home-page',
      'about-page': 'about-page', 
      'blog-page': 'blog-page',
      'blog-details-page': 'blog-details-page',
      'courses-page': 'courses-page',
      'instructors-page': 'instructors-page',
      'pricing-page': 'pricing-page',
      'contact-page': 'contact-page',
      'enroll-page': 'enroll-page'
    }

    const actualCollection = collectionMapping[collectionSlug] || collectionSlug
    whereClause = options?.where || {}

    const result = await payload.find({
      collection: actualCollection,
      where: whereClause,
      sort: options?.sort || '-updatedAt',
      limit: options?.limit || 100,
      ...options
    })
    
    return result.docs
  } catch (error) {
    console.error(`Error fetching ${collectionSlug}:`, error)
    return []
  }
}
