import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedContactPage() {
  const payload = await getPayload({ config })

  console.log('📞 Seeding ContactPage content...')

  try {
    console.log('\n📄 Creating ContactPage sections...\n')

    // PAGE TITLE
    await payload.create({
      collection: 'contact-page',
      data: {
        sectionName: 'Contact Page Title',
        sectionType: 'page-title',
        status: 'active',
        pageTitle: {
          title: 'Contact',
          breadcrumbs: [
            { label: 'Home', link: '/index.html', isActive: false },
            { label: 'Contact', link: '', isActive: true },
          ],
        },
      },
    })
    console.log('✅ Page Title created')

    // CONTACT MAP
    await payload.create({
      collection: 'contact-page',
      data: {
        sectionName: 'Contact Map',
        sectionType: 'contact-map',
        status: 'active',
        contactMap: {
          mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus',
        },
      },
    })
    console.log('✅ Contact Map created')

    // CONTACT INFO
    await payload.create({
      collection: 'contact-page',
      data: {
        sectionName: 'Contact Information',
        sectionType: 'contact-info',
        status: 'active',
        contactInfo: {
          contactCards: [
            {
              icon: 'bi-geo-alt',
              heading: 'Location',
              text: '8721 Broadway Avenue, New York, NY 10023',
            },
            {
              icon: 'bi-envelope',
              heading: 'Email',
              text: 'info@examplecompany.com',
            },
            {
              icon: 'bi-telephone',
              heading: 'Call',
              text: '+1 (212) 555-7890',
            },
            {
              icon: 'bi-clock',
              heading: 'Open Hours',
              text: 'Monday-Friday: 9AM - 6PM',
            },
          ],
          formSection: {
            heading: 'Get in Touch',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consectetur adipiscing.',
            formAction: 'forms/contact.php',
            submitButtonText: 'Send Message',
            socialLinks: [
              { platform: 'twitter', url: '#' },
              { platform: 'facebook', url: '#' },
              { platform: 'instagram', url: '#' },
              { platform: 'linkedin', url: '#' },
            ],
          },
        },
      },
    })
    console.log('✅ Contact Information created (4 cards + form section)')

    console.log('\n🎉 ContactPage seeding completed!')
    console.log('\n📊 Summary:')
    console.log('- 3 sections created (Page Title, Map, Contact Info with 4 cards)')
    console.log('- Contact form configured with 4 social links')
    console.log('\n📋 Next steps:')
    console.log('1. Go to http://localhost:3000/admin')
    console.log('2. Navigate to "Contact Page" collection')
    console.log('3. Edit contact information, map location, and social links')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding ContactPage:', error)
    process.exit(1)
  }
}

seedContactPage()
