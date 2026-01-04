import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedNews() {
  const payload = await getPayload({ config })

  console.log('📰 Seeding News articles...')

  try {
    // Get the first media item for featured images (or you can upload specific images)
    const mediaItems = await payload.find({
      collection: 'media',
      limit: 10,
    })

    const defaultImage = mediaItems.docs[0]?.id

    console.log('\n📰 Creating news articles...\n')

    const newsArticles = [
      {
        title: 'Campus Expansion Project Breaks Ground',
        slug: 'campus-expansion-project-breaks-ground',
        excerpt: 'The college has officially commenced construction on its ambitious campus expansion project, which will add state-of-the-art facilities and increase student capacity by 30%.',
        category: 'campus',
        isFeatured: true,
        authorType: 'manual' as const,
        authorName: 'Jennifer Mitchell',
        authorRole: 'Campus Communications Director',
        readTime: '5 min read',
        commentCount: 12,
        status: 'published',
        publishedDate: new Date('2024-02-15').toISOString(),
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'In a momentous ceremony attended by college officials, students, and local dignitaries, the groundbreaking for our new campus expansion took place this morning. This $50 million project represents the largest infrastructure investment in the college\'s history.',
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Project Overview' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'The expansion will include a new science and technology building, expanded library facilities, additional student housing, and modern recreational spaces. Construction is expected to be completed by Fall 2026.',
                  },
                ],
              },
            ],
          },
        },
        tags: [
          { tag: 'campus expansion' },
          { tag: 'infrastructure' },
          { tag: 'development' },
        ],
      },
      {
        title: 'College Ranks Top 50 in National Academic Excellence Survey',
        slug: 'college-ranks-top-50-national-survey',
        excerpt: 'Our institution has achieved a significant milestone by securing a place in the top 50 colleges nationwide in the latest academic excellence rankings.',
        category: 'achievements',
        isFeatured: true,
        authorType: 'manual' as const,
        authorName: 'Robert Anderson',
        authorRole: 'Academic Affairs Director',
        readTime: '4 min read',
        commentCount: 28,
        status: 'published',
        publishedDate: new Date('2024-03-21').toISOString(),
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'We are thrilled to announce that our college has been ranked among the top 50 institutions in the prestigious National Academic Excellence Survey. This achievement reflects our commitment to providing outstanding education and student support.',
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Recognition Highlights' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'The survey particularly noted our strong performance in student satisfaction, graduate employment rates, and research output. Our faculty\'s dedication to excellence has been a key factor in this success.',
                  },
                ],
              },
            ],
          },
        },
        tags: [
          { tag: 'rankings' },
          { tag: 'academic excellence' },
          { tag: 'achievement' },
        ],
      },
      {
        title: 'New Research Center Focuses on Sustainable Technology',
        slug: 'new-research-center-sustainable-technology',
        excerpt: 'The college announces the establishment of a cutting-edge research center dedicated to developing sustainable technology solutions for environmental challenges.',
        category: 'research',
        isFeatured: true,
        authorType: 'manual' as const,
        authorName: 'Sarah Thompson',
        authorRole: 'Research Communications Manager',
        readTime: '6 min read',
        commentCount: 15,
        status: 'published',
        publishedDate: new Date('2024-01-30').toISOString(),
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Our new Center for Sustainable Technology Innovation will bring together researchers, students, and industry partners to address pressing environmental challenges through technological innovation.',
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Research Focus Areas' }],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'The center will focus on renewable energy systems, smart grid technology, sustainable materials, and environmental monitoring solutions. Initial funding of $10 million has been secured from government and private sources.',
                  },
                ],
              },
            ],
          },
        },
        tags: [
          { tag: 'research' },
          { tag: 'sustainability' },
          { tag: 'technology' },
        ],
      },
      {
        title: 'Student Entrepreneurs Win National Innovation Competition',
        slug: 'student-entrepreneurs-win-national-competition',
        excerpt: 'A team of our students has taken first place in the National Student Innovation Challenge with their groundbreaking healthcare technology solution.',
        category: 'achievements',
        isFeatured: false,
        authorType: 'manual' as const,
        authorName: 'Michael Davidson',
        authorRole: 'Student Success Coordinator',
        readTime: '4 min read',
        commentCount: 22,
        status: 'published',
        publishedDate: new Date('2024-03-10').toISOString(),
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Congratulations to our brilliant students who won first place and $50,000 in funding at the National Student Innovation Challenge. Their innovative healthcare app addresses medication management for elderly patients.',
                  },
                ],
              },
            ],
          },
        },
        tags: [
          { tag: 'students' },
          { tag: 'innovation' },
          { tag: 'competition' },
        ],
      },
      {
        title: 'College Launches New Digital Learning Platform',
        slug: 'college-launches-digital-learning-platform',
        excerpt: 'Students and faculty now have access to an advanced digital learning platform that enhances the educational experience with AI-powered tools and resources.',
        category: 'technology',
        isFeatured: false,
        authorType: 'manual' as const,
        authorName: 'Emily Richardson',
        authorRole: 'Educational Technology Director',
        readTime: '5 min read',
        commentCount: 18,
        status: 'published',
        publishedDate: new Date('2024-02-28').toISOString(),
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'We are excited to introduce our new digital learning platform that leverages artificial intelligence to provide personalized learning experiences, real-time feedback, and comprehensive analytics for both students and instructors.',
                  },
                ],
              },
            ],
          },
        },
        tags: [
          { tag: 'technology' },
          { tag: 'education' },
          { tag: 'innovation' },
        ],
      },
      {
        title: 'Annual Science Fair Showcases Student Research Projects',
        slug: 'annual-science-fair-student-research',
        excerpt: 'Over 200 students presented their research projects at this year\'s Science Fair, demonstrating innovation and scientific excellence across multiple disciplines.',
        category: 'events',
        isFeatured: false,
        authorType: 'manual' as const,
        authorName: 'Daniel Cooper',
        authorRole: 'Events Coordinator',
        readTime: '3 min read',
        commentCount: 8,
        status: 'published',
        publishedDate: new Date('2024-03-15').toISOString(),
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Our annual Science Fair was a tremendous success, featuring cutting-edge research from students across all scientific disciplines. The event attracted judges from leading research institutions and industry.',
                  },
                ],
              },
            ],
          },
        },
        tags: [
          { tag: 'science' },
          { tag: 'research' },
          { tag: 'events' },
        ],
      },
      {
        title: 'College Athletics Teams Achieve Record-Breaking Season',
        slug: 'athletics-teams-record-breaking-season',
        excerpt: 'Our college sports teams have concluded an exceptional season with multiple championship titles and individual athlete recognitions.',
        category: 'sports',
        isFeatured: false,
        authorType: 'manual' as const,
        authorName: 'Rachel Stevens',
        authorRole: 'Athletic Communications Manager',
        readTime: '4 min read',
        commentCount: 45,
        status: 'published',
        publishedDate: new Date('2024-03-25').toISOString(),
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'This season has been historic for our athletic programs. Our basketball, soccer, and swimming teams all won conference championships, while individual athletes set new records in track and field events.',
                  },
                ],
              },
            ],
          },
        },
        tags: [
          { tag: 'sports' },
          { tag: 'athletics' },
          { tag: 'championships' },
        ],
      },
    ]

    for (const article of newsArticles) {
      const newsData: any = {
        ...article,
      }

      if (defaultImage) {
        newsData.featuredImage = defaultImage
      }

      await payload.create({
        collection: 'news',
        data: newsData,
      })

      console.log(`✅ Created: ${article.title}`)
    }

    console.log('\n🎉 News seeding completed!')
    console.log(`📰 Created ${newsArticles.length} news articles`)
    console.log('\n📋 Next steps:')
    console.log('1. Go to http://localhost:3000/admin')
    console.log('2. Navigate to "News" collection')
    console.log('3. Edit articles and add proper images')
    console.log('4. Visit /news to see the news page')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding news:', error)
    process.exit(1)
  }
}

seedNews()
