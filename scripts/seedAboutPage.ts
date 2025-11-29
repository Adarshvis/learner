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
    console.error(`❌ Error uploading ${imagePath}:`, error)
    return null
  }
}

async function seedAboutPage() {
  const payload = await getPayload({ config })

  console.log('📖 Seeding AboutPage content...')

  try {
    console.log('\n📸 Uploading images...')
    
    // Upload About page images
    const aboutMainImage = await uploadImage(payload, 'assets/img/education/education-square-2.webp', 'About Us')
    const galleryImage1 = await uploadImage(payload, 'assets/img/education/education-1.webp', 'Campus Life')
    const galleryImage2 = await uploadImage(payload, 'assets/img/education/students-3.webp', 'Student Achievement')
    const galleryImage3 = await uploadImage(payload, 'assets/img/education/campus-8.webp', 'Our Campus')

    console.log('\n📄 Creating AboutPage sections...\n')

    // 1. PAGE TITLE SECTION
    await payload.create({
      collection: 'about-page',
      data: {
        sectionName: 'About Page Title',
        sectionType: 'page-title',
        status: 'active',
        pageTitle: {
          title: 'About',
          breadcrumbs: [
            { label: 'Home', link: '/index.html', isActive: false },
            { label: 'About', link: '', isActive: true },
          ],
        },
      },
    })
    console.log('✅ Page Title Section created')

    // 2. ABOUT MAIN SECTION
    await payload.create({
      collection: 'about-page',
      data: {
        sectionName: 'About Main Section',
        sectionType: 'about-main',
        status: 'active',
        aboutMain: {
          image: aboutMainImage,
          subtitle: 'About Us',
          title: 'Empowering Future Leaders Through Quality Education',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          stats: [
            { count: '15', label: 'Years of Experience' },
            { count: '200+', label: 'Expert Instructors' },
            { count: '50k+', label: 'Students Worldwide' },
          ],
        },
      },
    })
    console.log('✅ About Main Section created')

    // 3. MISSION VISION VALUES SECTION
    await payload.create({
      collection: 'about-page',
      data: {
        sectionName: 'Mission Vision Values',
        sectionType: 'mission-vision-values',
        status: 'active',
        missionVisionValues: {
          cards: [
            {
              icon: 'bi-bullseye',
              title: 'Our Mission',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Excepteur sint occaecat cupidatat non proident.',
            },
            {
              icon: 'bi-eye',
              title: 'Our Vision',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Excepteur sint occaecat cupidatat non proident.',
            },
            {
              icon: 'bi-award',
              title: 'Our Values',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Excepteur sint occaecat cupidatat non proident.',
            },
          ],
        },
      },
    })
    console.log('✅ Mission Vision Values Section created')

    // 4. WHY CHOOSE US SECTION
    await payload.create({
      collection: 'about-page',
      data: {
        sectionName: 'Why Choose Us',
        sectionType: 'why-choose-us',
        status: 'active',
        whyChooseUs: {
          subtitle: 'Why Choose Us',
          title: 'Transforming Education for a Better Tomorrow',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
          features: [
            { text: 'Flexible learning options and schedules' },
            { text: 'Industry-experienced instructors' },
            { text: 'Interactive and engaging course content' },
            { text: 'Career guidance and placement support' },
            { text: 'State-of-the-art online learning platform' },
          ],
          buttonText: 'Discover More',
          buttonLink: '#',
          galleryImages: [
            { image: galleryImage1, alt: 'Campus Life' },
            { image: galleryImage2, alt: 'Student Achievement' },
            { image: galleryImage3, alt: 'Our Campus' },
          ],
        },
      },
    })
    console.log('✅ Why Choose Us Section created')

    console.log('\n🎉 AboutPage seeding completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('1. Go to http://localhost:3000/admin')
    console.log('2. Navigate to "About Page" collection')
    console.log('3. You will see 4 sections ready to edit')
    console.log('4. Edit any section to change text, images, or data')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding AboutPage:', error)
    process.exit(1)
  }
}

seedAboutPage()
