import { getPayload } from 'payload'
import config from './src/payload.config.ts'
import dotenv from 'dotenv'

dotenv.config()

async function fixFooterText() {
  try {
    const payload = await getPayload({ config })
    
    // Get current settings
    const settings = await payload.findGlobal({
      slug: 'settings',
    })
    
    console.log('Current footerText:', settings.footerText)
    
    // Update with string value
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        footerText: 'Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.',
      },
    })
    
    console.log('✅ Footer text fixed!')
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

fixFooterText()
