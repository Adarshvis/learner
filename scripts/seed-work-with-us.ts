import 'dotenv/config'
// @ts-nocheck
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedWorkWithUs() {
  const payload = await getPayload({ config })

  console.log('Seeding Work With Us programs...')

  // Delete existing programs first
  const existing = await payload.find({
    collection: 'work-with-us',
    limit: 100,
  })

  for (const program of existing.docs) {
    await payload.delete({
      collection: 'work-with-us',
      id: program.id,
    })
  }

  console.log('Deleted existing Work With Us programs')

  // Create 2 programs: PhD Programme and Incubation
  const programs = [
    {
      title: 'PHD Programme',
      slug: 'phd-programme',
      excerpt: 'Our PhD programme equips scholars to conduct pioneering research across domains like smart healthcare, cybersecurity, wearables, IoT, and human-centered systems contributing to the future of Cyber-Physical Systems.',
      effectiveDate: 'Last Updated: December 2025',
      status: 'active',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '1. Program Overview' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Our PhD Programme is designed for aspiring researchers who want to push the boundaries of knowledge in Cyber-Physical Systems. We offer a rigorous, interdisciplinary curriculum that combines theoretical foundations with hands-on research experience.'
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '2. Research Areas' }]
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: '2.1 Smart Healthcare' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Develop innovative healthcare solutions using IoT devices, wearable sensors, and AI-driven diagnostics to improve patient outcomes and healthcare delivery.'
                }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                {
                  type: 'listitem',
                  indent: 0,
                  value: 1,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Remote patient monitoring systems' }]
                    }
                  ]
                },
                {
                  type: 'listitem',
                  indent: 0,
                  value: 2,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'AI-powered diagnostic tools' }]
                    }
                  ]
                },
                {
                  type: 'listitem',
                  indent: 0,
                  value: 3,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Wearable health tracking devices' }]
                    }
                  ]
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: '2.2 Cybersecurity' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Focus on securing cyber-physical systems against emerging threats, developing robust encryption methods, and implementing secure authentication protocols.'
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: '2.3 Human-Centered Systems' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Design systems that prioritize user experience, accessibility, and human-computer interaction to create technology that seamlessly integrates with daily life.'
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '3. Program Benefits' }]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                {
                  type: 'listitem',
                  indent: 0,
                  value: 1,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Full funding including stipend and research grants' }]
                    }
                  ]
                },
                {
                  type: 'listitem',
                  indent: 0,
                  value: 2,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Access to state-of-the-art laboratories and equipment' }]
                    }
                  ]
                },
                {
                  type: 'listitem',
                  indent: 0,
                  value: 3,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Collaboration with industry partners and international researchers' }]
                    }
                  ]
                },
                {
                  type: 'listitem',
                  indent: 0,
                  value: 4,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Opportunities to publish in top-tier conferences and journals' }]
                    }
                  ]
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '4. Admission Requirements' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Prospective students should have a strong academic background in computer science, engineering, or related fields. A Master\'s degree is preferred but not required for exceptional candidates.'
                }
              ]
            }
          ]
        }
      }
    },
    {
      title: 'Incubation',
      slug: 'incubation',
      excerpt: 'From idea validation to prototype development, our Incubation programme converts innovative concepts into real-world solutions through expert mentoring',
      effectiveDate: 'Last Updated: December 2025',
      status: 'active',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '1. About the Incubation Program' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Our Incubation Program provides a nurturing environment for entrepreneurs, students, and researchers to transform their innovative ideas into viable products and startups. We offer comprehensive support including mentorship, funding, workspace, and access to our extensive network.'
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '2. Program Stages' }]
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: '2.1 Idea Validation' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Work with our experienced mentors to validate your concept, conduct market research, and refine your business model.'
                }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                {
                  type: 'listitem',
                  indent: 0,
                  value: 1,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Market analysis and competitive landscape assessment' }]
                    }
                  ]
                },
                {
                  type: 'listitem',
                  indent: 0,
                  value: 2,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Customer discovery and validation interviews' }]
                    }
                  ]
                },
                {
                  type: 'listitem',
                  indent: 0,
                  value: 3,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Business model canvas development' }]
                    }
                  ]
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: '2.2 Prototype Development' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Access our technical resources and expert guidance to build functional prototypes and minimum viable products (MVPs).'
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: '2.3 Go-to-Market Strategy' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Develop comprehensive launch strategies, establish partnerships, and connect with potential investors to scale your venture.'
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '3. Support Services' }]
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                {
                  type: 'listitem',
                  indent: 0,
                  value: 1,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'One-on-one mentorship from industry experts and successful entrepreneurs' }]
                    }
                  ]
                },
                {
                  type: 'listitem',
                  indent: 0,
                  value: 2,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Dedicated workspace with high-speed internet and collaboration areas' }]
                    }
                  ]
                },
                {
                  type: 'listitem',
                  indent: 0,
                  value: 3,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Seed funding opportunities and investor connections' }]
                    }
                  ]
                },
                {
                  type: 'listitem',
                  indent: 0,
                  value: 4,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Legal, accounting, and marketing support' }]
                    }
                  ]
                },
                {
                  type: 'listitem',
                  indent: 0,
                  value: 5,
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Access to laboratory facilities and prototyping equipment' }]
                    }
                  ]
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '4. Eligibility' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We welcome applications from students, researchers, faculty members, and external entrepreneurs with innovative ideas in cyber-physical systems, IoT, healthcare technology, and related domains.'
                }
              ]
            }
          ]
        }
      }
    }
  ]

  // Create the programs
  for (const programData of programs) {
    try {
      const program = await payload.create({
        collection: 'work-with-us',
        data: programData,
      })
      console.log(`✓ Created: ${program.title}`)
    } catch (error) {
      console.error(`✗ Failed to create ${programData.title}:`, error)
    }
  }

  console.log('\n✅ Successfully seeded Work With Us programs!')
  process.exit(0)
}

seedWorkWithUs()
