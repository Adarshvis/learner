import 'dotenv/config'
// @ts-nocheck
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedResearchDomains() {
  const payload = await getPayload({ config })

  console.log('Seeding Research Domains...')

  // Delete existing research domains first
  const existing = await payload.find({
    collection: 'research-domains',
    limit: 100,
  })

  for (const domain of existing.docs) {
    await payload.delete({
      collection: 'research-domains',
      id: domain.id,
    })
  }

  console.log('Deleted existing research domains')

  // Create 4 research domains
  const domains = [
    {
      title: 'Artificial Intelligence',
      slug: 'artificial-intelligence',
      excerpt: 'Advancing the frontiers of machine learning, neural networks, and cognitive computing to create intelligent systems that can learn, reason, and solve complex problems.',
      effectiveDate: 'Last Updated: December 2025',
      status: 'active',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '1. Introduction' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Our Artificial Intelligence research domain focuses on developing intelligent systems that can perceive, learn, reason, and interact with humans naturally. We work on cutting-edge AI technologies that are shaping the future of computing.'
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
              children: [{ type: 'text', text: '2.1 Machine Learning' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We develop advanced machine learning algorithms and models that enable systems to learn from data and improve their performance over time. Our work includes:'
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
                      children: [{ type: 'text', text: 'Deep learning and neural networks' }]
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
                      children: [{ type: 'text', text: 'Reinforcement learning' }]
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
                      children: [{ type: 'text', text: 'Transfer learning and meta-learning' }]
                    }
                  ]
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: '2.2 Natural Language Processing' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Our NLP research enables computers to understand, interpret, and generate human language, including sentiment analysis, machine translation, and conversational AI.'
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '3. Applications' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Our AI research has practical applications in healthcare diagnostics, autonomous systems, financial forecasting, and personalized education platforms.'
                }
              ]
            }
          ]
        }
      }
    },
    {
      title: 'Data Science & Analytics',
      slug: 'data-science-analytics',
      excerpt: 'Extracting meaningful insights from complex datasets using statistical methods, predictive modeling, and visualization techniques to drive data-driven decision making.',
      effectiveDate: 'Last Updated: December 2025',
      status: 'active',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '1. Overview' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Data Science & Analytics research domain focuses on extracting actionable insights from large-scale data using advanced analytical techniques and tools.'
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '2. Core Areas' }]
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: '2.1 Big Data Technologies' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We work with distributed computing frameworks and storage systems to process and analyze massive datasets efficiently.'
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
                      children: [{ type: 'text', text: 'Hadoop and Spark ecosystems' }]
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
                      children: [{ type: 'text', text: 'Real-time streaming analytics' }]
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
                      children: [{ type: 'text', text: 'Cloud-based data warehousing' }]
                    }
                  ]
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: '2.2 Predictive Analytics' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Our research in predictive analytics helps organizations forecast trends, customer behavior, and business outcomes using statistical models and machine learning.'
                }
              ]
            }
          ]
        }
      }
    },
    {
      title: 'Cybersecurity & Privacy',
      slug: 'cybersecurity-privacy',
      excerpt: 'Developing robust security frameworks, cryptographic protocols, and privacy-preserving technologies to protect digital systems and sensitive information.',
      effectiveDate: 'Last Updated: December 2025',
      status: 'active',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '1. Introduction' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'In an increasingly connected world, cybersecurity and privacy are paramount. Our research focuses on developing innovative solutions to protect systems, networks, and data from cyber threats.'
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '2. Research Focus Areas' }]
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: '2.1 Network Security' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We develop advanced techniques for securing network infrastructure and detecting intrusions:'
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
                      children: [{ type: 'text', text: 'Intrusion detection and prevention systems' }]
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
                      children: [{ type: 'text', text: 'Firewall and VPN technologies' }]
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
                      children: [{ type: 'text', text: 'Zero-trust architecture' }]
                    }
                  ]
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: '2.2 Cryptography' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Our cryptography research includes developing secure encryption algorithms, blockchain technologies, and quantum-resistant cryptographic protocols.'
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '3. Privacy Technologies' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We develop privacy-preserving techniques such as differential privacy, homomorphic encryption, and secure multi-party computation to protect sensitive data while enabling analysis.'
                }
              ]
            }
          ]
        }
      }
    },
    {
      title: 'Cloud Computing & DevOps',
      slug: 'cloud-computing-devops',
      excerpt: 'Building scalable, reliable cloud infrastructure and automation pipelines that enable rapid software delivery and efficient resource management.',
      effectiveDate: 'Last Updated: December 2025',
      status: 'active',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '1. Overview' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Cloud Computing & DevOps research focuses on building and managing scalable, resilient infrastructure and streamlining software development and deployment processes.'
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
              children: [{ type: 'text', text: '2.1 Cloud Architecture' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We design and implement cloud-native architectures that leverage modern cloud platforms:'
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
                      children: [{ type: 'text', text: 'Microservices and containerization' }]
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
                      children: [{ type: 'text', text: 'Serverless computing' }]
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
                      children: [{ type: 'text', text: 'Multi-cloud and hybrid cloud strategies' }]
                    }
                  ]
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: '2.2 DevOps Practices' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Our DevOps research focuses on automation, continuous integration/continuous deployment (CI/CD), and infrastructure as code to enable rapid, reliable software delivery.'
                }
              ]
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: '3. Infrastructure Management' }]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We develop tools and methodologies for monitoring, scaling, and managing cloud infrastructure efficiently, including auto-scaling, load balancing, and disaster recovery.'
                }
              ]
            }
          ]
        }
      }
    }
  ]

  for (const domain of domains) {
    const created = await payload.create({
      collection: 'research-domains',
      data: domain,
    })
    console.log(`✓ Created: ${created.title}`)
  }

  console.log('\n✅ Successfully seeded 4 research domains!')
  process.exit(0)
}

seedResearchDomains().catch((error) => {
  console.error('Error seeding research domains:', error)
  process.exit(1)
})
