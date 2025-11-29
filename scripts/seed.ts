import 'dotenv/config'
import { seedDatabase } from '../src/lib/seed'

async function runSeed(): Promise<void> {
  console.log('🌱 Starting database seeding...')
  await seedDatabase()
  process.exit(0)
}

runSeed().catch((error: Error) => {
  console.error('❌ Seeding failed:', error)
  process.exit(1)
})
