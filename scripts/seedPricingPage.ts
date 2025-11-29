import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedPricingPage() {
  const payload = await getPayload({ config })

  console.log('💰 Seeding PricingPage content...')

  try {
    console.log('\n📄 Creating PricingPage sections...\n')

    // PAGE TITLE
    await payload.create({
      collection: 'pricing-page',
      data: {
        sectionName: 'Pricing Page Title',
        sectionType: 'page-title',
        status: 'active',
        pageTitle: {
          title: 'Pricing',
          breadcrumbs: [
            { label: 'Home', link: '/index.html', isActive: false },
            { label: 'Pricing', link: '', isActive: true },
          ],
        },
      },
    })
    console.log('✅ Page Title created')

    // PRICING SECTION
    await payload.create({
      collection: 'pricing-page',
      data: {
        sectionName: 'Pricing Plans Section',
        sectionType: 'pricing-section',
        status: 'active',
        pricingSection: {
          toggleLabels: {
            monthlyLabel: 'Monthly',
            yearlyLabel: 'Yearly',
            yearlyBadge: '20% OFF',
          },
          pricingPlans: [
            {
              planName: 'Basic',
              description: 'Lorem ipsum dolor sit',
              isPopular: false,
              priceType: 'free',
              ctaText: 'Continue',
              ctaLink: '#',
              featuresHeading: 'Basic Plan Includes:',
              features: [
                { text: 'Lorem ipsum dolor sit amet', isHighlight: false },
                { text: 'Consectetur adipiscing elit', isHighlight: false },
                { text: 'Sed do eiusmod tempor', isHighlight: false },
                { text: 'Incididunt ut labore', isHighlight: false },
                { text: 'Et dolore magna aliqua', isHighlight: false },
                { text: 'Ut enim ad minim veniam', isHighlight: false },
                { text: 'Quis nostrud exercitation', isHighlight: false },
                { text: 'Ullamco laboris nisi ut', isHighlight: false },
                { text: 'Aliquip ex ea commodo', isHighlight: false },
              ],
            },
            {
              planName: 'Plus',
              description: 'Consectetur adipiscing elit',
              isPopular: false,
              priceType: 'monthly-yearly',
              monthlyPrice: 25,
              yearlyPrice: 20,
              ctaText: 'Buy Now',
              ctaLink: '#',
              featuresHeading: 'Everything from Basic, plus:',
              features: [
                { text: 'Duis aute irure dolor', isHighlight: false },
                { text: 'In reprehenderit in voluptate', isHighlight: false },
                { text: 'Velit esse cillum dolore', isHighlight: false },
                { text: 'Eu fugiat nulla pariatur', isHighlight: false },
                { text: 'Excepteur sint occaecat', isHighlight: false },
                { text: 'Cupidatat non proident', isHighlight: false },
                { text: 'Sunt in culpa qui officia', isHighlight: false },
                { text: 'Deserunt mollit anim id', isHighlight: false },
                { text: 'Est laborum et dolorum', isHighlight: false },
                { text: 'Fuga eum dicta sunt explicabo', isHighlight: false },
              ],
            },
            {
              planName: 'Business',
              description: 'Sed ut perspiciatis unde',
              isPopular: true,
              popularBadge: 'Most Popular',
              priceType: 'monthly-yearly',
              monthlyPrice: 45,
              yearlyPrice: 36,
              ctaText: 'Buy Now',
              ctaLink: '#',
              featuresHeading: 'Everything in Plus, plus:',
              features: [
                { text: 'Voluptas Sit', isHighlight: true },
                { text: 'Aspernatur aut odit aut fugit', isHighlight: false },
                { text: 'Sed quia consequuntur', isHighlight: false },
                { text: 'Magni dolores eos qui', isHighlight: false },
                { text: 'Ratione voluptatem sequi', isHighlight: false },
                { text: 'Nesciunt neque porro', isHighlight: false },
                { text: 'Quisquam est qui dolorem', isHighlight: false },
                { text: 'Ipsum quia dolor sit amet', isHighlight: false },
                { text: 'Consectetur adipisci velit', isHighlight: false },
                { text: 'Sed quia non numquam', isHighlight: false },
              ],
            },
            {
              planName: 'Enterprise',
              description: 'Eius modi tempora incidunt',
              isPopular: false,
              priceType: 'custom',
              ctaText: 'Contact Sales',
              ctaLink: '#',
              featuresHeading: 'Everything in Business, plus:',
              features: [
                { text: 'Ipsa quae ab illo inventore', isHighlight: false },
                { text: 'Veritatis et quasi architecto', isHighlight: false },
                { text: 'Beatae vitae dicta sunt', isHighlight: false },
                { text: 'Explicabo nemo enim ipsam', isHighlight: false },
                { text: 'Voluptatem quia voluptas', isHighlight: false },
                { text: 'Sit aspernatur aut odit', isHighlight: false },
                { text: 'Aut fugit sed quia consequuntur', isHighlight: false },
              ],
            },
          ],
        },
      },
    })
    console.log('✅ Pricing Plans Section created')

    console.log('\n🎉 PricingPage seeding completed!')
    console.log('\n📋 Next steps:')
    console.log('1. Go to http://localhost:3000/admin')
    console.log('2. Navigate to "Pricing Page" collection')
    console.log('3. Edit pricing plans, features, and prices')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding PricingPage:', error)
    process.exit(1)
  }
}

seedPricingPage()
