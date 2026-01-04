import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedBlogPosts() {
  const payload = await getPayload({ config })

  console.log('Starting blog posts seeding...')

  try {
    // Create sample blog posts
    const blogPosts = [
      {
        title: 'The Future of Online Learning: Trends to Watch in 2024',
        shortDescription: 'Explore the emerging trends shaping the future of online education and how they will transform the way we learn.',
        authorType: 'manual',
        authorName: 'Sarah Johnson',
        authorRole: 'Education Technology Specialist',
        authorBio: 'Sarah has over 10 years of experience in educational technology and has helped numerous institutions transition to digital learning platforms.',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'The landscape of online learning is constantly evolving, driven by technological advancements and changing learner needs. As we move through 2024, several key trends are emerging that will reshape how we approach education in the digital age.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'AI-Powered Personalization'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Artificial intelligence is revolutionizing how online courses adapt to individual learning styles. Platforms now use AI to analyze student performance and automatically adjust content difficulty, recommend supplementary materials, and provide personalized feedback.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'Microlearning and Bite-Sized Content'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Modern learners prefer short, focused learning sessions that fit into their busy schedules. Microlearning breaks down complex topics into digestible 5-10 minute modules, making it easier to retain information and maintain engagement.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'Immersive Learning with VR/AR'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Virtual and augmented reality technologies are creating immersive learning experiences that were previously impossible in online education. From virtual science labs to historical site tours, these technologies bridge the gap between theory and practice.'
                  }
                ]
              }
            ]
          }
        },
        publishedDate: new Date('2024-01-15').toISOString(),
        readTime: 7,
        category: 'web-development',
        tags: ['E-Learning', 'EdTech', 'AI', 'VR/AR'],
        status: 'published',
        metaDescription: 'Discover the key trends shaping online learning in 2024, from AI personalization to immersive VR experiences.'
      },
      {
        title: '10 Essential Study Techniques for Online Learners',
        shortDescription: 'Master these proven study techniques to maximize your learning outcomes and retention in online courses.',
        authorType: 'manual',
        authorName: 'Michael Chen',
        authorRole: 'Learning Psychology Expert',
        authorBio: 'Michael specializes in cognitive psychology and has developed study methodologies used by thousands of online learners worldwide.',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Success in online learning requires discipline, organization, and effective study strategies. Here are ten essential techniques that will help you make the most of your online education experience.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: '1. Create a Dedicated Study Space'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Having a designated area for studying helps your brain associate that space with focused work. Ensure it\'s quiet, well-lit, and free from distractions.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: '2. Use the Pomodoro Technique'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Break your study time into 25-minute focused sessions followed by 5-minute breaks. This helps maintain concentration and prevents burnout.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: '3. Active Note-Taking'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Don\'t just passively watch lectures. Take notes in your own words, create mind maps, and summarize key concepts to enhance retention.'
                  }
                ]
              }
            ]
          }
        },
        publishedDate: new Date('2024-01-20').toISOString(),
        readTime: 5,
        category: 'Education',
        tags: ['Study Tips', 'Learning Strategies', 'Productivity'],
        status: 'published',
        metaDescription: 'Learn 10 proven study techniques that will help you succeed in online courses and retain more information.'
      },
      {
        title: 'How to Choose the Right Online Course for Your Career Goals',
        shortDescription: 'A comprehensive guide to selecting online courses that align with your professional development objectives.',
        authorType: 'manual',
        authorName: 'Emily Rodriguez',
        authorRole: 'Career Development Coach',
        authorBio: 'Emily has guided over 500 professionals in their career transitions through strategic skill development and online learning.',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'With thousands of online courses available, choosing the right one can be overwhelming. This guide will help you make informed decisions about your educational investments.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'Assess Your Current Skills and Goals'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Before enrolling in any course, take time to evaluate your current skill level and identify specific career goals. Ask yourself: What skills are in demand in my field? What knowledge gaps do I need to fill?'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'Research Course Content and Structure'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Review the course syllabus carefully. Look for courses that offer hands-on projects, real-world applications, and practical assignments rather than just theory.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'Check Instructor Credentials'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Verify the instructor\'s professional background and teaching experience. Industry experts with practical experience often provide more valuable insights than purely academic instructors.'
                  }
                ]
              }
            ]
          }
        },
        publishedDate: new Date('2024-01-25').toISOString(),
        readTime: 6,
        category: 'Business',
        tags: ['Career Development', 'Course Selection', 'Professional Growth'],
        status: 'published',
        metaDescription: 'Learn how to choose online courses that align with your career goals and maximize your professional development.'
      },
      {
        title: 'The Rise of Remote Learning: Statistics and Insights',
        shortDescription: 'An in-depth look at the data behind the explosive growth of remote education and what it means for the future.',
        authorType: 'manual',
        authorName: 'David Thompson',
        authorRole: 'Education Analytics Researcher',
        authorBio: 'David analyzes trends in educational technology and has published numerous papers on the effectiveness of online learning platforms.',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Remote learning has experienced unprecedented growth over the past few years. Let\'s examine the key statistics and trends that are shaping this educational revolution.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'Market Growth and Projections'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'The global e-learning market is projected to reach $375 billion by 2026, growing at a compound annual growth rate of 8%. This growth is driven by increasing internet penetration, mobile device usage, and demand for flexible learning options.'
                  }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'Student Satisfaction Rates'
                  }
                ]
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Recent surveys show that 85% of students report satisfaction with online learning, citing flexibility and accessibility as primary benefits. However, challenges remain in maintaining engagement and building community.'
                  }
                ]
              }
            ]
          }
        },
        publishedDate: new Date('2024-02-01').toISOString(),
        readTime: 8,
        category: 'general',
        tags: ['Remote Learning', 'Statistics', 'E-Learning Market'],
        status: 'published',
        metaDescription: 'Explore key statistics and insights about the rapid growth of remote learning and its impact on education.'
      }
    ]

    for (const post of blogPosts) {
      try {
        const createdPost = await payload.create({
          collection: 'blog-posts',
          draft: false,
          data: {
            title: post.title,
            shortDescription: post.shortDescription,
            authorType: 'manual' as const,
            authorName: post.authorName,
            authorRole: post.authorRole,
            authorBio: post.authorBio,
            content: {
              root: {
                ...post.content.root,
                direction: 'ltr' as const,
                format: '',
                indent: 0,
                version: 1,
                children: post.content.root.children.map((child: any) => ({
                  ...child,
                  version: 1
                }))
              }
            },
            publishedDate: post.publishedDate,
            readTime: `${post.readTime} min read`,
            category: post.category as 'web-development' | 'data-science' | 'design' | 'marketing' | 'business' | 'general',
            tags: post.tags.map((tag: string) => ({ tag })),
            status: 'published' as const,
            metaDescription: post.metaDescription,
          } as any
        })
        console.log(`✓ Created blog post: ${post.title}`)
      } catch (error) {
        console.error(`✗ Failed to create blog post "${post.title}":`, error)
      }
    }

    console.log('\n✓ Blog posts seeding completed!')
  } catch (error) {
    console.error('Error during seeding:', error)
  }

  process.exit(0)
}

seedBlogPosts()
