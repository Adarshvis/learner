import { NextRequest, NextResponse } from 'next/server'
import { getPageContent } from '../../../lib/payload'

export async function GET(request: NextRequest) {
  try {
    const data = await getPageContent('blog-details')
    return NextResponse.json(data || {})
  } catch (error) {
    console.error('Error fetching blog-details data:', error)
    return NextResponse.json({}, { status: 500 })
  }
}