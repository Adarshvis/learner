import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
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
      data: { alt: alt },
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

async function seedCoursesPage() {
  const payload = await getPayload({ config })

  console.log('📚 Seeding CoursesPage content...')

  try {

    console.log('\n📸 Uploading images...')
    
    const course1 = await uploadImage(payload, 'assets/img/education/courses-3.webp', 'Advanced JavaScript Development')
    const course2 = await uploadImage(payload, 'assets/img/education/courses-7.webp', 'UI/UX Design Fundamentals')
    const course3 = await uploadImage(payload, 'assets/img/education/courses-12.webp', 'Digital Marketing Strategies')
    const course4 = await uploadImage(payload, 'assets/img/education/courses-5.webp', 'Machine Learning with Python')
    const course5 = await uploadImage(payload, 'assets/img/education/courses-9.webp', 'Social Media Marketing')
    const course6 = await uploadImage(payload, 'assets/img/education/courses-14.webp', 'Graphic Design Mastery')
    
    const inst1 = await uploadImage(payload, 'assets/img/person/person-m-3.webp', 'Dr. Marcus Thompson')
    const inst2 = await uploadImage(payload, 'assets/img/person/person-f-7.webp', 'Sarah Johnson')
    const inst3 = await uploadImage(payload, 'assets/img/person/person-m-8.webp', 'David Rodriguez')
    const inst4 = await uploadImage(payload, 'assets/img/person/person-f-12.webp', 'Prof. Anna Chen')
    const inst5 = await uploadImage(payload, 'assets/img/person/person-m-5.webp', 'Michael Davis')
    const inst6 = await uploadImage(payload, 'assets/img/person/person-f-9.webp', 'Lisa Martinez')

    console.log('\n📄 Creating CoursesPage sections...\n')

    // PAGE TITLE
    await payload.create({
      collection: 'courses-page',
      data: {
        sectionName: 'Courses Page Title',
        sectionType: 'page-title',
        status: 'active',
        pageTitle: {
          title: 'Courses',
          breadcrumbs: [
            { label: 'Home', link: '/index.html', isActive: false },
            { label: 'Courses', link: '', isActive: true },
          ],
        },
      },
    })
    console.log('✅ Page Title created')

    // FILTERS SIDEBAR
    await payload.create({
      collection: 'courses-page',
      data: {
        sectionName: 'Course Filters',
        sectionType: 'filters',
        status: 'active',
        filters: {
          title: 'Filter Courses',
          categoryFilters: [
            { label: 'All Categories', value: 'all' },
            { label: 'Programming', value: 'programming' },
            { label: 'Design', value: 'design' },
            { label: 'Business', value: 'business' },
            { label: 'Marketing', value: 'marketing' },
          ],
          levelFilters: [
            { label: 'All Levels', value: 'all' },
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
          ],
          durationFilters: [
            { label: 'Under 5 hours', value: 'under-5' },
            { label: '5-20 hours', value: '5-20' },
            { label: '20+ hours', value: '20-plus' },
          ],
          priceFilters: [
            { label: 'Free', value: 'free' },
            { label: 'Paid', value: 'paid' },
          ],
        },
      },
    })
    console.log('✅ Filters Sidebar created')

    // COURSES GRID
    await payload.create({
      collection: 'courses-page',
      data: {
        sectionName: 'Courses Grid',
        sectionType: 'courses-grid',
        status: 'active',
        coursesGrid: {
          searchPlaceholder: 'Search courses...',
          sortOptions: [
            { label: 'Sort by: Most Popular', value: 'popular' },
            { label: 'Newest First', value: 'newest' },
            { label: 'Price: Low to High', value: 'price-low' },
            { label: 'Price: High to Low', value: 'price-high' },
            { label: 'Duration: Short to Long', value: 'duration' },
          ],
          courses: [
            {
              image: course1,
              badge: 'best-seller',
              price: '$89',
              category: 'Programming',
              level: 'Intermediate',
              title: 'Advanced JavaScript Development',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              duration: '15 hours',
              studentCount: '1,245 students',
              rating: 4.8,
              reviewCount: 89,
              instructorAvatar: inst1,
              instructorName: 'Dr. Marcus Thompson',
              enrollLink: '/enroll',
            },
            {
              image: course2,
              badge: 'free',
              price: 'Free',
              category: 'Design',
              level: 'Beginner',
              title: 'UI/UX Design Fundamentals',
              description: 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet.',
              duration: '8 hours',
              studentCount: '2,891 students',
              rating: 4.6,
              reviewCount: 156,
              instructorAvatar: inst2,
              instructorName: 'Sarah Johnson',
              enrollLink: '/enroll',
            },
            {
              image: course3,
              badge: 'new',
              price: '$149',
              category: 'Business',
              level: 'Beginner',
              title: 'Digital Marketing Strategies',
              description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas vestibulum tortor.',
              duration: '22 hours',
              studentCount: '678 students',
              rating: 5.0,
              reviewCount: 42,
              instructorAvatar: inst3,
              instructorName: 'David Rodriguez',
              enrollLink: '/enroll',
            },
            {
              image: course4,
              badge: 'none',
              price: '$199',
              category: 'Programming',
              level: 'Advanced',
              title: 'Machine Learning with Python',
              description: 'Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta nulla facilisi morbi tempus.',
              duration: '35 hours',
              studentCount: '534 students',
              rating: 4.7,
              reviewCount: 73,
              instructorAvatar: inst4,
              instructorName: 'Prof. Anna Chen',
              enrollLink: '/enroll',
            },
            {
              image: course5,
              badge: 'popular',
              price: '$59',
              category: 'Marketing',
              level: 'Intermediate',
              title: 'Social Media Marketing',
              description: 'Sed porttitor lectus nibh vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
              duration: '12 hours',
              studentCount: '3,457 students',
              rating: 4.5,
              reviewCount: 234,
              instructorAvatar: inst5,
              instructorName: 'Michael Davis',
              enrollLink: '/enroll',
            },
            {
              image: course6,
              badge: 'certificate',
              price: '$99',
              category: 'Design',
              level: 'Intermediate',
              title: 'Graphic Design Mastery',
              description: 'Curabitur aliquet quam id dui posuere blandit mauris blandit aliquet elit eget tincidunt nibh pulvinar.',
              duration: '18 hours',
              studentCount: '1,892 students',
              rating: 4.9,
              reviewCount: 127,
              instructorAvatar: inst6,
              instructorName: 'Lisa Martinez',
              enrollLink: '/enroll',
            },
          ],
        },
      },
    })
    console.log('✅ Courses Grid created')

    console.log('\n🎉 CoursesPage seeding completed!')
    console.log('\n📋 Next steps:')
    console.log('1. Go to http://localhost:3000/admin')
    console.log('2. Navigate to "Courses Page" collection')
    console.log('3. Edit filters, sort options, and course cards')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding CoursesPage:', error)
    process.exit(1)
  }
}

seedCoursesPage()
