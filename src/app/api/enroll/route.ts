import { NextRequest, NextResponse } from 'next/server'
import { getPageContent } from '../../../lib/payload'

export async function GET(request: NextRequest) {
  try {
    const data = await getPageContent('enroll')
    return NextResponse.json(data || {})
  } catch (error) {
    console.error('Error fetching enroll data:', error)
    return NextResponse.json({}, { status: 500 })
  }
}