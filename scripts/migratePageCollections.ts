import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

async function migratePageCollections() {
  const payload = await getPayload({ config })

  console.log('🔄 Migrating individual page collections to PageContent...')

  try {
    // Helper function to convert section data to PageContent format
    const convertToPageContent = (doc: any, pageName: string, sectionType: string) => {
      const extractContent = (sectionData: any) => {
        if (!sectionData) return {}

        // Extract common fields that fit the PageContent structure
        return {
          title: sectionData.title || sectionData.heading || sectionData.pageTitle?.title,
          subtitle: sectionData.subtitle || sectionData.description,
          description: sectionData.description || sectionData.content,
          buttonText: sectionData.buttonText || sectionData.ctaText || sectionData.submitButton?.text,
          buttonLink: sectionData.buttonLink || sectionData.ctaLink || '#',
          image: sectionData.image || sectionData.featuredImage,
          backgroundImage: sectionData.backgroundImage || sectionData.heroImage,
        }
      }

      // Map specific section data based on type
      let content = {}
      let stats: any[] = []
      let features: any[] = []
      let customFields: any[] = []

      switch (sectionType) {
        case 'hero':
          const hero = doc.hero
          if (hero) {
            content = extractContent(hero)
            if (hero.stats) stats = hero.stats
          }
          break
        
        case 'featured-courses':
          const courses = doc.featuredCourses
          if (courses) {
            content = { title: courses.heading, description: courses.description }
            if (courses.courses) {
              customFields.push({
                fieldName: 'courses',
                fieldValue: JSON.stringify(courses.courses),
                fieldType: 'json'
              })
            }
          }
          break

        case 'about-main':
          const aboutMain = doc.aboutMain
          if (aboutMain) {
            content = extractContent(aboutMain)
            if (aboutMain.stats) stats = aboutMain.stats
          }
          break

        case 'pricing-section':
          const pricing = doc.pricingSection
          if (pricing) {
            content = { title: 'Pricing Plans' }
            if (pricing.pricingPlans) {
              customFields.push({
                fieldName: 'pricingPlans',
                fieldValue: JSON.stringify(pricing.pricingPlans),
                fieldType: 'json'
              })
            }
          }
          break

        default:
          // For other sections, try to extract data generically
          const sectionData = Object.values(doc).find((val: any) => 
            val && typeof val === 'object' && !Array.isArray(val) && val.title
          )
          if (sectionData) {
            content = extractContent(sectionData)
          }
          break
      }

      return {
        pageName,
        section: sectionType.replace(/-/g, '_'),
        sectionLabel: doc.sectionName || `${pageName} ${sectionType}`,
        content,
        stats,
        features,
        customFields,
        status: doc.status || 'active'
      }
    }

    // Collections to migrate with their mappings
    const collections = [
      { slug: 'home-page', pageName: 'homepage' },
      { slug: 'about-page', pageName: 'about' },
      { slug: 'courses-page', pageName: 'courses' },
      { slug: 'instructors-page', pageName: 'instructors' },
      { slug: 'pricing-page', pageName: 'pricing' },
      { slug: 'blog-page', pageName: 'blog' },
      { slug: 'blog-details-page', pageName: 'blog-details' },
      { slug: 'contact-page', pageName: 'contact' },
      { slug: 'enroll-page', pageName: 'enroll' }
    ]

    let totalMigrated = 0

    for (const { slug, pageName } of collections) {
      try {
        console.log(`\n📄 Migrating ${slug}...`)
        
        const result = await payload.find({
          collection: slug as any,
          limit: 1000,
        })

        console.log(`  Found ${result.docs.length} sections`)

        for (const doc of result.docs) {
          const pageContentDoc = convertToPageContent(doc, pageName, doc.sectionType)
          
          await payload.create({
            collection: 'page-content',
            data: pageContentDoc,
          })

          totalMigrated++
          console.log(`    ✅ Migrated: ${pageContentDoc.sectionLabel}`)
        }

      } catch (error) {
        console.log(`  ⚠️  Collection ${slug} not found or error: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    console.log(`\n🎉 Migration completed!`)
    console.log(`📊 Total sections migrated: ${totalMigrated}`)
    console.log('\n📋 Next steps:')
    console.log('1. All page content is now in the PageContent collection')
    console.log('2. You can now remove individual page collections from the config')
    console.log('3. Users can create new pages by adding entries to PageContent')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error during migration:', error)
    process.exit(1)
  }
}

migratePageCollections()