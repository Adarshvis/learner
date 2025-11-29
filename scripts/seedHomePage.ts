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

async function seedHomePage() {
  const payload = await getPayload({ config })

  console.log('🏠 Seeding HomePage content...')

  try {

    console.log('\n📸 Uploading images...')
    
    // Upload all required images
    const heroImage = await uploadImage(payload, 'assets/img/education/courses-13.webp', 'Online Learning Platform')
    
    // Featured Courses images
    const course1Image = await uploadImage(payload, 'assets/img/education/students-9.webp', 'Digital Marketing Course')
    const course2Image = await uploadImage(payload, 'assets/img/education/campus-4.webp', 'Web Development Course')
    const course3Image = await uploadImage(payload, 'assets/img/education/students-7.webp', 'Data Science Course')
    const course4Image = await uploadImage(payload, 'assets/img/education/education-5.webp', 'Business Strategy Course')
    const course5Image = await uploadImage(payload, 'assets/img/education/activities-3.webp', 'Graphic Design Course')
    const course6Image = await uploadImage(payload, 'assets/img/education/teacher-6.webp', 'Photography Course')
    
    const instructor1Avatar = await uploadImage(payload, 'assets/img/person/person-f-3.webp', 'Sarah Johnson')
    const instructor2Avatar = await uploadImage(payload, 'assets/img/person/person-m-5.webp', 'Michael Chen')
    const instructor3Avatar = await uploadImage(payload, 'assets/img/person/person-f-7.webp', 'Dr. Emily Watson')
    const instructor4Avatar = await uploadImage(payload, 'assets/img/person/person-m-8.webp', 'Robert Anderson')
    const instructor5Avatar = await uploadImage(payload, 'assets/img/person/person-f-12.webp', 'Lisa Martinez')
    const instructor6Avatar = await uploadImage(payload, 'assets/img/person/person-m-11.webp', 'James Wilson')
    
    // Featured Instructors images
    const instProfile1 = await uploadImage(payload, 'assets/img/education/teacher-2.webp', 'Sarah Johnson Profile')
    const instProfile2 = await uploadImage(payload, 'assets/img/education/teacher-7.webp', 'Michael Chen Profile')
    const instProfile3 = await uploadImage(payload, 'assets/img/education/teacher-4.webp', 'Amanda Rodriguez Profile')
    const instProfile4 = await uploadImage(payload, 'assets/img/education/teacher-9.webp', 'David Thompson Profile')
    
    // Testimonial avatars
    const testimonial1 = await uploadImage(payload, 'assets/img/person/person-f-1.webp', 'Jane Smith')
    const testimonial2 = await uploadImage(payload, 'assets/img/person/person-m-2.webp', 'Michael Johnson')
    const testimonial3 = await uploadImage(payload, 'assets/img/person/person-f-3.webp', 'Emily Davis')
    const testimonial4 = await uploadImage(payload, 'assets/img/person/person-m-4.webp', 'Robert Wilson')
    
    // Blog post images
    const blogAuthor1 = await uploadImage(payload, 'assets/img/person/person-f-12.webp', 'Andy Glamer')
    const blogAuthor2 = await uploadImage(payload, 'assets/img/person/person-f-13.webp', 'Den Viliamson')
    const blogAuthor3 = await uploadImage(payload, 'assets/img/person/person-m-10.webp', 'Jones Robbert')
    const blogPost1 = await uploadImage(payload, 'assets/img/blog/blog-post-1.webp', 'Blog Post 1')
    const blogPost2 = await uploadImage(payload, 'assets/img/blog/blog-post-2.webp', 'Blog Post 2')
    const blogPost3 = await uploadImage(payload, 'assets/img/blog/blog-post-3.webp', 'Blog Post 3')
    
    // CTA image
    const ctaImage = await uploadImage(payload, 'assets/img/education/courses-4.webp', 'Online Learning CTA')

    console.log('\n📄 Creating HomePage sections...\n')

    // 1. HERO SECTION
    await payload.create({
      collection: 'home-page',
      data: {
        sectionName: 'Hero Section',
        sectionType: 'hero',
        status: 'active',
        hero: {
          title: 'Transform Your Future with Expert-Led Online Courses',
          description: 'Discover thousands of high-quality courses designed by industry professionals. Learn at your own pace, gain in-demand skills, and advance your career from anywhere in the world.',
          heroImage: heroImage,
          stats: [
            { number: 50000, label: 'Students Enrolled' },
            { number: 1200, label: 'Expert Courses' },
            { number: 98, label: 'Success Rate %' },
          ],
          primaryButton: {
            text: 'Browse Courses',
            link: '#courses',
          },
          secondaryButton: {
            text: 'Learn More',
            link: '#about',
          },
          features: [
            { icon: 'bi-shield-check', text: 'Certified Programs' },
            { icon: 'bi-clock', text: 'Lifetime Access' },
            { icon: 'bi-people', text: 'Expert Instructors' },
          ],
          floatingCards: [
            { icon: 'bi-code-slash', title: 'Web Development', students: '2,450 Students' },
            { icon: 'bi-palette', title: 'UI/UX Design', students: '1,890 Students' },
            { icon: 'bi-graph-up', title: 'Digital Marketing', students: '3,200 Students' },
          ],
        },
      },
    })
    console.log('✅ Hero Section created')

    // 2. FEATURED COURSES SECTION
    await payload.create({
      collection: 'home-page',
      data: {
        sectionName: 'Featured Courses Section',
        sectionType: 'featured-courses',
        status: 'active',
        featuredCourses: {
          title: 'Featured Courses',
          description: 'Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit',
          courses: [
            {
              image: course1Image,
              badge: 'featured',
              price: '$149',
              level: 'Beginner',
              duration: '8 Weeks',
              title: 'Digital Marketing Fundamentals',
              description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam.',
              instructorAvatar: instructor1Avatar,
              instructorName: 'Sarah Johnson',
              instructorSpecialty: 'Marketing Expert',
              rating: 4.5,
              studentCount: 342,
            },
            {
              image: course2Image,
              badge: 'new',
              price: '$89',
              level: 'Intermediate',
              duration: '6 Weeks',
              title: 'Web Development with JavaScript',
              description: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit.',
              instructorAvatar: instructor2Avatar,
              instructorName: 'Michael Chen',
              instructorSpecialty: 'Full Stack Developer',
              rating: 5.0,
              studentCount: 156,
            },
            {
              image: course3Image,
              badge: 'certificate',
              price: 'Free',
              level: 'Beginner',
              duration: '4 Weeks',
              title: 'Introduction to Data Science',
              description: 'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis.',
              instructorAvatar: instructor3Avatar,
              instructorName: 'Dr. Emily Watson',
              instructorSpecialty: 'Data Scientist',
              rating: 4.2,
              studentCount: 789,
            },
            {
              image: course4Image,
              badge: 'popular',
              price: '$199',
              level: 'Advanced',
              duration: '12 Weeks',
              title: 'Business Strategy & Leadership',
              description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo.',
              instructorAvatar: instructor4Avatar,
              instructorName: 'Robert Anderson',
              instructorSpecialty: 'Business Consultant',
              rating: 4.7,
              studentCount: 234,
            },
            {
              image: course5Image,
              badge: 'certificate',
              price: '$129',
              level: 'Intermediate',
              duration: '10 Weeks',
              title: 'Graphic Design Masterclass',
              description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem.',
              instructorAvatar: instructor5Avatar,
              instructorName: 'Lisa Martinez',
              instructorSpecialty: 'Creative Director',
              rating: 4.3,
              studentCount: 467,
            },
            {
              image: course6Image,
              badge: 'new',
              price: '$99',
              level: 'Beginner',
              duration: '5 Weeks',
              title: 'Photography for Beginners',
              description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.',
              instructorAvatar: instructor6Avatar,
              instructorName: 'James Wilson',
              instructorSpecialty: 'Professional Photographer',
              rating: 4.6,
              studentCount: 298,
            },
          ],
          viewAllButton: {
            text: 'View All Courses',
            link: '/courses',
          },
        },
      },
    })
    console.log('✅ Featured Courses Section created')

    // 3. COURSE CATEGORIES SECTION
    await payload.create({
      collection: 'home-page',
      data: {
        sectionName: 'Course Categories Section',
        sectionType: 'course-categories',
        status: 'active',
        courseCategories: {
          title: 'Course Categories',
          description: 'Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit',
          categories: [
            { icon: 'bi-laptop', name: 'Computer Science', courseCount: 24, link: '/courses' },
            { icon: 'bi-briefcase', name: 'Business', courseCount: 18, link: '/courses' },
            { icon: 'bi-palette', name: 'Design', courseCount: 15, link: '/courses' },
            { icon: 'bi-heart-pulse', name: 'Health & Medical', courseCount: 12, link: '/courses' },
            { icon: 'bi-globe', name: 'Languages', courseCount: 21, link: '/courses' },
            { icon: 'bi-diagram-3', name: 'Science', courseCount: 16, link: '/courses' },
            { icon: 'bi-megaphone', name: 'Marketing', courseCount: 19, link: '/courses' },
            { icon: 'bi-graph-up-arrow', name: 'Finance', courseCount: 14, link: '/courses' },
            { icon: 'bi-camera', name: 'Photography', courseCount: 11, link: '/courses' },
            { icon: 'bi-music-note-beamed', name: 'Music', courseCount: 13, link: '/courses' },
            { icon: 'bi-gear', name: 'Engineering', courseCount: 22, link: '/courses' },
            { icon: 'bi-journal-text', name: 'Law & Legal', courseCount: 9, link: '/courses' },
            { icon: 'bi-cup-hot', name: 'Culinary Arts', courseCount: 8, link: '/courses' },
            { icon: 'bi-trophy', name: 'Sports & Fitness', courseCount: 17, link: '/courses' },
            { icon: 'bi-pen', name: 'Writing', courseCount: 10, link: '/courses' },
            { icon: 'bi-body-text', name: 'Psychology', courseCount: 12, link: '/courses' },
            { icon: 'bi-tree', name: 'Environment', courseCount: 7, link: '/courses' },
            { icon: 'bi-chat-dots', name: 'Communication', courseCount: 15, link: '/courses' },
          ],
        },
      },
    })
    console.log('✅ Course Categories Section created')

    // 4. FEATURED INSTRUCTORS SECTION
    await payload.create({
      collection: 'home-page',
      data: {
        sectionName: 'Featured Instructors Section',
        sectionType: 'featured-instructors',
        status: 'active',
        featuredInstructors: {
          title: 'Featured Instructors',
          description: 'Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit',
          instructors: [
            {
              image: instProfile1,
              name: 'Sarah Johnson',
              specialty: 'Web Development',
              description: 'Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida.',
              rating: 4.8,
              courseCount: 18,
              studentCount: 2100,
              socialLinks: [
                { platform: 'linkedin', url: '#' },
                { platform: 'twitter', url: '#' },
              ],
            },
            {
              image: instProfile2,
              name: 'Michael Chen',
              specialty: 'Data Science',
              description: 'Suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi.',
              rating: 4.9,
              courseCount: 24,
              studentCount: 3500,
              socialLinks: [
                { platform: 'github', url: '#' },
                { platform: 'linkedin', url: '#' },
              ],
            },
            {
              image: instProfile3,
              name: 'Amanda Rodriguez',
              specialty: 'UX Design',
              description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis.',
              rating: 4.6,
              courseCount: 15,
              studentCount: 1800,
              socialLinks: [
                { platform: 'dribbble', url: '#' },
                { platform: 'behance', url: '#' },
              ],
            },
            {
              image: instProfile4,
              name: 'David Thompson',
              specialty: 'Digital Marketing',
              description: 'Vivamus magna justo lacinia eget consectetur sed convallis at tellus curabitur non nulla.',
              rating: 4.7,
              courseCount: 21,
              studentCount: 2900,
              socialLinks: [
                { platform: 'instagram', url: '#' },
                { platform: 'facebook', url: '#' },
              ],
            },
          ],
        },
      },
    })
    console.log('✅ Featured Instructors Section created')

    // 5. TESTIMONIALS SECTION
    await payload.create({
      collection: 'home-page',
      data: {
        sectionName: 'Testimonials Section',
        sectionType: 'testimonials',
        status: 'active',
        testimonials: {
          title: 'Testimonials',
          description: 'Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit',
          criticReviews: [
            {
              source: 'The New York Times',
              rating: 5.0,
              quote: 'Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',
            },
            {
              source: 'Washington Post',
              rating: 4.5,
              quote: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat.',
            },
            {
              source: 'The Guardian',
              rating: 5.0,
              quote: 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis porttitor volutpat.',
            },
          ],
          studentReviews: [
            {
              avatar: testimonial1,
              name: 'Jane Smith',
              role: 'Book Enthusiast',
              rating: 5.0,
              review: 'Proin eget tortor risus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla quis lorem ut libero malesuada feugiat.',
            },
            {
              avatar: testimonial2,
              name: 'Michael Johnson',
              role: 'Sci-Fi Blogger',
              rating: 5.0,
              review: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus.',
            },
            {
              avatar: testimonial3,
              name: 'Emily Davis',
              role: 'Book Club President',
              rating: 4.5,
              review: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Cras ultricies ligula sed magna dictum porta. Donec sollicitudin molestie malesuada.',
            },
            {
              avatar: testimonial4,
              name: 'Robert Wilson',
              role: 'Literary Reviewer',
              rating: 5.0,
              review: 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit. Lorem ipsum dolor sit amet, consectetur.',
            },
          ],
          overallRating: {
            rating: 4.8,
            reviewCount: '230+',
            platforms: [
              { name: 'Goodreads' },
              { name: 'Amazon' },
              { name: 'Barnes & Noble' },
            ],
          },
        },
      },
    })
    console.log('✅ Testimonials Section created')

    // 6. BLOG POSTS SECTION
    await payload.create({
      collection: 'home-page',
      data: {
        sectionName: 'Recent Blog Posts Section',
        sectionType: 'blog-posts',
        status: 'active',
        blogPosts: {
          title: 'Recent Blog Posts',
          description: 'Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit',
          posts: [
            {
              authorAvatar: blogAuthor1,
              authorName: 'Andy glamer',
              likes: 65,
              image: blogPost1,
              title: 'Sed ut perspiciatis unde omnis iste natus',
              excerpt: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione...',
              link: '/blog-details',
            },
            {
              authorAvatar: blogAuthor2,
              authorName: 'Den viliamson',
              likes: 35,
              image: blogPost2,
              title: 'Nemo enim ipsam voluptatem quia voluptas sit',
              excerpt: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos...',
              link: '/blog-details',
            },
            {
              authorAvatar: blogAuthor3,
              authorName: 'Jones robbert',
              likes: 58,
              image: blogPost3,
              title: 'Ut enim ad minima veniam, quis nostrum exercitationem',
              excerpt: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem...',
              link: '/blog-details',
            },
          ],
        },
      },
    })
    console.log('✅ Recent Blog Posts Section created')

    // 7. CTA SECTION
    await payload.create({
      collection: 'home-page',
      data: {
        sectionName: 'CTA Section',
        sectionType: 'cta',
        status: 'active',
        cta: {
          title: 'Transform Your Future with Expert-Led Online Courses',
          description: 'Join thousands of successful learners who have advanced their careers through our comprehensive online education platform.',
          image: ctaImage,
          features: [
            { text: '20+ Expert instructors with industry experience' },
            { text: 'Certificate of completion for every course' },
            { text: '24/7 access to course materials and resources' },
            { text: 'Interactive assignments and real-world projects' },
          ],
          primaryButton: {
            text: 'Browse Courses',
            link: '/courses',
          },
          secondaryButton: {
            text: 'Enroll Now',
            link: '/enroll',
          },
          stats: [
            { number: '15000+', label: 'Students Enrolled' },
            { number: '150+', label: 'Courses Available' },
            { number: '98%', label: 'Success Rate' },
          ],
          floatingCards: [
            { icon: 'bi-person-check-fill', number: '2,450', label: 'New Students This Month' },
            { icon: 'bi-play-circle-fill', number: '50+', label: 'Hours of Content' },
          ],
        },
      },
    })
    console.log('✅ CTA Section created')

    console.log('\n🎉 HomePage seeding completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('1. Go to http://localhost:3000/admin')
    console.log('2. Navigate to "Home Page" collection')
    console.log('3. You will see 7 sections ready to edit')
    console.log('4. Edit any section to change text, images, or data')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding HomePage:', error)
    process.exit(1)
  }
}

seedHomePage()
