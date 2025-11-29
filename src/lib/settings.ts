import { getPayload } from 'payload'
import config from '@payload-config'

export async function getSettings() {
  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({
      slug: 'settings',
    })
    return settings
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}
