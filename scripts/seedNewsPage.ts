import 'dotenv/config'
// @ts-nocheck
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedNewsPage() {
  const payload = await getPayload({ config })

  console.log('📰 Seeding NewsPage content...')

  try {
    console.log('\n📄 Creating NewsPage sections...\n')

    // PAGE TITLE
    await payload.create({
      collection: 'news-page',
      data: {
        sectionName: 'News Page Title',
        sectionType: 'page-title',
        status: 'active',
        pageTitle: {
          title: 'News',
          breadcrumbs: [
            { label: 'Home', link: '/', isActive: false },
            { label: 'News', link: '', isActive: true },
          ],
        },
      },
    })
    console.log('✅ Page Title created')

    // NEWS HERO SECTION
    await payload.create({
      collection: 'news-page',
      data: {
        sectionName: 'News Hero Section',
        sectionType: 'news-hero',
        status: 'active',
        newsHero: {
          showFeaturedNews: true,
          featuredNewsCount: 3,
        },
      },
    })
    console.log('✅ News Hero Section created')

    // NEWS LISTING SECTION
    await payload.create({
      collection: 'news-page',
      data: {
        sectionName: 'News Listing Configuration',
        sectionType: 'news-listing',
        status: 'active',
        newsListing: {
          showTabs: true,
          tabs: [
            { tabName: 'Top stories', tabType: 'top-stories' },
            { tabName: 'Trending News', tabType: 'trending' },
            { tabName: 'Latest News', tabType: 'latest' },
          ],
          newsPerPage: 9,
          showCategories: true,
        },
      },
    })
    console.log('✅ News Listing Configuration created')

    console.log('\n🎉 NewsPage seeding completed!')
    console.log('\n📋 Next steps:')
    console.log('1. Go to http://localhost:3000/admin')
    console.log('2. Navigate to "News Page" collection')
    console.log('3. Customize news page settings')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding NewsPage:', error)
    process.exit(1)
  }
}

seedNewsPage()
