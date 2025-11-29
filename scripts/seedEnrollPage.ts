import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedEnrollPage() {
  const payload = await getPayload({ config })

  console.log('📝 Seeding EnrollPage content...')

  try {
    console.log('\n📄 Creating EnrollPage sections...\n')

    // PAGE TITLE
    await payload.create({
      collection: 'enroll-page',
      data: {
        sectionName: 'Enroll Page Title',
        sectionType: 'page-title',
        status: 'active',
        pageTitle: {
          title: 'Enrollment',
          breadcrumbs: [
            { label: 'Home', link: '/index.html', isActive: false },
            { label: 'Enroll', link: '', isActive: true },
          ],
        },
      },
    })
    console.log('✅ Page Title created')

    // ENROLLMENT FORM
    await payload.create({
      collection: 'enroll-page',
      data: {
        sectionName: 'Enrollment Form',
        sectionType: 'enrollment-form',
        status: 'active',
        enrollmentForm: {
          header: {
            heading: 'Enroll in Your Dream Course',
            description: 'Take the next step in your educational journey. Complete the form below to secure your spot in our comprehensive online learning program.',
          },
          courseOptions: [
            { label: 'Full Stack Web Development', value: 'web-development' },
            { label: 'Data Science & Analytics', value: 'data-science' },
            { label: 'Digital Marketing Mastery', value: 'digital-marketing' },
            { label: 'UI/UX Design Fundamentals', value: 'ui-ux-design' },
            { label: 'Cybersecurity Essentials', value: 'cybersecurity' },
            { label: 'Mobile App Development', value: 'mobile-development' },
          ],
          educationLevels: [
            { label: 'High School', value: 'high-school' },
            { label: 'Associate Degree', value: 'associate' },
            { label: "Bachelor's Degree", value: 'bachelor' },
            { label: "Master's Degree", value: 'master' },
            { label: 'Doctorate', value: 'doctorate' },
            { label: 'Other', value: 'other' },
          ],
          experienceLevels: [
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
            { label: 'Expert', value: 'expert' },
          ],
          scheduleOptions: [
            { label: 'Weekdays (Monday - Friday)', value: 'weekdays', isDefault: false },
            { label: 'Weekends (Saturday - Sunday)', value: 'weekends', isDefault: false },
            { label: 'Flexible (Self-paced)', value: 'flexible', isDefault: true },
          ],
          submitButton: {
            text: 'Enroll Now',
            icon: 'bi-check-circle',
          },
          securityNote: 'Your information is secure and will never be shared with third parties',
        },
      },
    })
    console.log('✅ Enrollment Form created (6 courses, 6 education levels, 4 experience levels, 3 schedules)')

    // BENEFITS SIDEBAR
    await payload.create({
      collection: 'enroll-page',
      data: {
        sectionName: 'Benefits Sidebar',
        sectionType: 'benefits-sidebar',
        status: 'active',
        benefitsSidebar: {
          heading: 'Why Choose Our Courses?',
          benefits: [
            {
              icon: 'bi-trophy',
              title: 'Expert Instructors',
              description: 'Learn from industry professionals with years of real-world experience',
            },
            {
              icon: 'bi-clock',
              title: 'Flexible Learning',
              description: 'Study at your own pace with 24/7 access to course materials',
            },
            {
              icon: 'bi-award',
              title: 'Certification',
              description: 'Earn industry-recognized certificates upon course completion',
            },
            {
              icon: 'bi-people',
              title: 'Community Support',
              description: 'Connect with fellow students and get help when you need it',
            },
          ],
          stats: [
            { number: '15,000+', label: 'Students Enrolled' },
            { number: '98%', label: 'Completion Rate' },
            { number: '4.9/5', label: 'Average Rating' },
          ],
        },
      },
    })
    console.log('✅ Benefits Sidebar created (4 benefits, 3 stats)')

    console.log('\n🎉 EnrollPage seeding completed!')
    console.log('\n📊 Summary:')
    console.log('- 3 sections created (Page Title, Enrollment Form, Benefits Sidebar)')
    console.log('- Form configured with 6 course options and multiple field types')
    console.log('- Benefits sidebar with 4 benefits and 3 statistics')
    console.log('\n📋 Next steps:')
    console.log('1. Go to http://localhost:3000/admin')
    console.log('2. Navigate to "Enroll Page" collection')
    console.log('3. Edit enrollment form, course options, and benefits')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding EnrollPage:', error)
    process.exit(1)
  }
}

seedEnrollPage()
