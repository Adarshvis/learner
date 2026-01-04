import { getPayload } from 'payload'
import config from '@payload-config'

export async function getSettings() {
  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({
      slug: 'settings',
      depth: 2, // This will populate the logo and favicon relationships
    })
    return settings
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}
