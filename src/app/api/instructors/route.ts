import { NextRequest, NextResponse } from 'next/server'
import { getPageContent } from '../../../lib/payload'

export async function GET(request: NextRequest) {
  try {
    const data = await getPageContent('instructors')
    return NextResponse.json(data || {})
  } catch (error) {
    console.error('Error fetching instructors data:', error)
    return NextResponse.json({}, { status: 500 })
  }
}