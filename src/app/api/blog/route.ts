import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '../../../lib/payload'

export async function GET(request: NextRequest) {
  try {
    const [pageInfo] = await Promise.all([
      getCollection('blog-page')
    ])

    return NextResponse.json({
      pageData: pageInfo || []
    })
  } catch (error) {
    console.error('Error fetching blog data:', error)
    return NextResponse.json({
      pageData: []
    }, { status: 500 })
  }
}