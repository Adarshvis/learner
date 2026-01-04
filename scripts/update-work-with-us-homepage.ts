import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function updateHomepageWorkWithUs() {
  const payload = await getPayload({ config })

  console.log('Updating homepage Work With Us section...')

  // Get the homepage
  const homepages = await payload.find({
    collection: 'home-page',
    limit: 1,
  })

  if (homepages.docs.length === 0) {
    console.error('No homepage found!')
    process.exit(1)
  }

  const homepage: any = homepages.docs[0]

  console.log('Found featuredCourses section')
  
  // Update the courses with links
  if (homepage.featuredCourses && homepage.featuredCourses.courses && homepage.featuredCourses.courses.length > 0) {
    // PhD Programme
    if (homepage.featuredCourses.courses[0]) {
      homepage.featuredCourses.courses[0].enrollButtonText = 'Read More'
      homepage.featuredCourses.courses[0].enrollLink = '/work-with-us/phd-programme'
    }

    // Incubation
    if (homepage.featuredCourses.courses[1]) {
      homepage.featuredCourses.courses[1].enrollButtonText = 'Read More'
      homepage.featuredCourses.courses[1].enrollLink = '/work-with-us/incubation'
    }

    // Research Internship
    if (homepage.featuredCourses.courses[2]) {
      homepage.featuredCourses.courses[2].enrollButtonText = 'Read More'
      homepage.featuredCourses.courses[2].enrollLink = '/work-with-us/research-internship'
    }
    
    // Update the homepage
    await payload.update({
      collection: 'home-page',
      id: homepage.id,
      data: homepage,
    })

    console.log('✅ Successfully updated homepage Work With Us section!')
    console.log('   - PhD Programme: /work-with-us/phd-programme')
    console.log('   - Incubation: /work-with-us/incubation')
    console.log('   - Research Internship: /work-with-us/research-internship (placeholder)')
    
    process.exit(0)
  } else {
    console.error('No courses found in featuredCourses section!')
    process.exit(1)
  }
}

updateHomepageWorkWithUs()
