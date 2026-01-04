import 'dotenv/config'
// @ts-nocheck
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

async function updateResearchDomainsHomepage() {
  const payload = await getPayload({ config })

  console.log('🔬 Updating Research Domains section on homepage...')

  try {
    // Find existing Research Domains section
    const existingSections = await payload.find({
      collection: 'home-page',
      where: {
        sectionType: {
          equals: 'featured-instructors'
        }
      }
    })

    // Delete existing section if found
    if (existingSections.docs.length > 0) {
      for (const section of existingSections.docs) {
        await payload.delete({
          collection: 'home-page',
          id: section.id
        })
      }
      console.log('✅ Deleted existing Research Domains section')
    }

    console.log('\n📸 Uploading images...')
    
    // Upload research domain images from attachment
    const aiImage = await uploadImage(payload, 'assets/img/education/teacher-2.webp', 'Artificial Intelligence')
    const healthcareImage = await uploadImage(payload, 'assets/img/education/teacher-7.webp', 'Healthcare CPS')
    const cyberImage = await uploadImage(payload, 'assets/img/education/teacher-4.webp', 'Cybersecurity')
    const wearablesImage = await uploadImage(payload, 'assets/img/education/teacher-9.webp', 'Wearables')

    console.log('\n📄 Creating Research Domains section...\n')

    // Create Research Domains Section
    await payload.create({
      collection: 'home-page',
      data: {
        order: 3,
        sectionName: 'Research Domains',
        sectionType: 'featured-instructors',
        status: 'active',
        featuredInstructors: {
          title: 'Research Domains',
          description: 'Explore our cutting-edge research areas and innovative solutions',
          instructors: [
            {
              image: aiImage,
              name: 'Human-Centered Systems',
              description: 'Human-Centered Systems address the challenges of rapid cyberization as technology becomes deeply integrated into everyday life. Our research focuses on designing usable, sustainable, and socially responsible CPS that interact seamlessly with humans.',
              profileButtonText: 'Read More',
              profileLink: '/research-domains/artificial-intelligence',
            },
            {
              image: healthcareImage,
              name: 'Healthcare',
              description: 'Healthcare-CPS focuses on advancing remote and intelligent healthcare as technology transforms how medical challenges are addressed. With rapid evolution across telemedicine, connected-health, mobile-health and intelligent-health systems, CPS enables enhanced care delivery.',
              profileButtonText: 'Read More',
              profileLink: '/research-domains/data-science-analytics',
            },
            {
              image: cyberImage,
              name: 'Cybersecurity',
              description: 'Cyber-Physical Systems combine sensing, computing, networking, and feedback-driven automation through highly connected smart devices. This enhanced functionality and connectivity also introduce unprecedented cybersecurity risks. Ensuring safety, security, and privacy.',
              profileButtonText: 'Read More',
              profileLink: '/research-domains/cybersecurity-privacy',
            },
            {
              image: wearablesImage,
              name: 'Wearables',
              description: 'Advances in sensors, IoT, and microelectronics have accelerated the rise of smart wearables, creating major research opportunities. These devices operate as complex networks processing real-time data and functioning autonomously for long durations.',
              profileButtonText: 'Read More',
              profileLink: '/research-domains/cloud-computing-devops',
            },
          ],
        },
      },
    })
    console.log('✅ Research Domains section created with detail page links!')

    console.log('\n🎉 Homepage Research Domains section updated successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating homepage:', error)
    process.exit(1)
  }
}

updateResearchDomainsHomepage()
