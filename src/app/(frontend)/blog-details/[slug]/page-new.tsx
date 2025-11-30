import CMSBlogDetailsPage from '../cms-blog-details'

interface BlogDetailsProps {
  params: Promise<{
    slug: string
  }>
}

export default function BlogDetailsPage({ params }: BlogDetailsProps) {
  return <CMSBlogDetailsPage />
}
