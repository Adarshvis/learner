import { NextResponse } from 'next/server'
import { getPayloadInstance } from '@/lib/payload'

export async function GET() {
  try {
    const payload = await getPayloadInstance()
    const navigation = await payload.findGlobal({
      slug: 'navigation' as any,
      depth: 2,
    })
    
    return NextResponse.json(navigation)
  } catch (error) {
    console.error('Error fetching navigation:', error)
    return NextResponse.json(
      { menuItems: [], ctaButton: { isVisible: true, text: 'Enroll Now', internalLink: '/enroll' } },
      { status: 200 }
    )
  }
}
