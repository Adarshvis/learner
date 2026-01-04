import CMSNewsDetailsPage from '../cms-news-details'

interface NewsDetailsProps {
  params: Promise<{
    slug: string
  }>
}

export default async function NewsDetailsPage({ params }: NewsDetailsProps) {
  const { slug } = await params
  
  return <CMSNewsDetailsPage slug={slug} />
}
