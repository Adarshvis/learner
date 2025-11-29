import 'dotenv/config'
import { seedAllContent } from '../src/lib/seedContent'

async function runSeed(): Promise<void> {
  console.log('🌱 Starting content seeding...')
  await seedAllContent()
  process.exit(0)
}

runSeed().catch((error: Error) => {
  console.error('❌ Seeding failed:', error)
  process.exit(1)
})
