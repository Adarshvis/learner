'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface CMSBlogDetailsPageProps {
  slug?: string
}

export default function CMSBlogDetailsPage({ slug }: CMSBlogDetailsPageProps) {
  const [pageData, setPageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/blog-details')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        
        // Check if data is valid (not empty object or array)
        if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
          console.warn('Blog details page: No content configured')
          setPageData(null)
        } else {
          setPageData(data)
        }
      } catch (err) {
        console.error('Failed to fetch blog details page data:', err)
        setError('Failed to load page content')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!loading) {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    }
  }, [loading])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error || !pageData) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-warning">
          <h4>Content Management System</h4>
          <p>Blog details page content is not configured yet.</p>
          <p>Please set up the content in the admin panel:</p>
          <Link href="/admin" className="btn btn-primary">
            Go to Admin Panel
          </Link>
        </div>
      </div>
    )
  }

  const { article, relatedPosts, comments, author } = pageData || {}

  return (
    <>
      {/* Page Title */}
      <section id="page-title" className="page-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12" data-aos="fade-up">
              <h1 className="page-title">{article?.title || 'Blog Article'}</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item"><Link href="/blog">Blog</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Article</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Details */}
      <section id="blog-details" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details-content">
                {/* Article Header */}
                <div className="article-header" data-aos="fade-up">
                  <div className="article-meta">
                    <span className="date">
                      <i className="bi bi-calendar"></i>
                      {article?.publishDate ? new Date(article.publishDate).toLocaleDateString() : 'Date not set'}
                    </span>
                    <span className="category">
                      <i className="bi bi-folder"></i>
                      {article?.category || 'General'}
                    </span>
                    <span className="author">
                      <i className="bi bi-person"></i>
                      {author?.name || article?.author || 'Anonymous'}
                    </span>
                  </div>
                  <h1 className="article-title">{article?.title}</h1>
                  {article?.excerpt && (
                    <p className="article-excerpt">{article.excerpt}</p>
                  )}
                </div>

                {/* Featured Image */}
                {article?.featuredImage && (
                  <div className="article-image" data-aos="fade-up">
                    <Image
                      src={article.featuredImage.url}
                      alt={article.featuredImage.alt || article.title}
                      width={800}
                      height={400}
                      className="img-fluid rounded"
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="article-body" data-aos="fade-up">
                  {article?.content ? (
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  ) : (
                    <div className="placeholder-content">
                      <p>Article content will be displayed here once configured in the admin panel.</p>
                      <p>You can add rich text content, images, videos, and more through the CMS.</p>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {article?.tags && article.tags.length > 0 && (
                  <div className="article-tags" data-aos="fade-up">
                    <h6>Tags:</h6>
                    <div className="tags-list">
                      {article.tags.map((tag: string, index: number) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Share */}
                <div className="article-share" data-aos="fade-up">
                  <h6>Share this article:</h6>
                  <div className="share-buttons">
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article?.title || '')}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>

                {/* Author Bio */}
                {author && (
                  <div className="author-bio" data-aos="fade-up">
                    <div className="author-info">
                      <Image
                        src={author.avatar?.url || '/assets/img/person/default-avatar.jpg'}
                        alt={author.name}
                        width={80}
                        height={80}
                        className="author-avatar"
                      />
                      <div className="author-details">
                        <h6>{author.name}</h6>
                        <p className="author-title">{author.title}</p>
                        <p className="author-description">{author.bio}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="blog-sidebar">
                {/* Recent Posts */}
                {relatedPosts && relatedPosts.length > 0 && (
                  <div className="sidebar-widget" data-aos="fade-up">
                    <h5 className="widget-title">Related Posts</h5>
                    <div className="recent-posts">
                      {relatedPosts.map((post: any, index: number) => (
                        <div key={index} className="recent-post-item">
                          <Image
                            src={post.image?.url || '/assets/img/blog/default-post.jpg'}
                            alt={post.title}
                            width={80}
                            height={60}
                            className="post-thumb"
                          />
                          <div className="post-info">
                            <h6><Link href={`/blog-details/${post.slug}`}>{post.title}</Link></h6>
                            <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories */}
                <div className="sidebar-widget" data-aos="fade-up">
                  <h5 className="widget-title">Categories</h5>
                  <ul className="category-list">
                    <li><Link href="/blog?category=web-development">Web Development</Link></li>
                    <li><Link href="/blog?category=data-science">Data Science</Link></li>
                    <li><Link href="/blog?category=design">Design</Link></li>
                    <li><Link href="/blog?category=marketing">Digital Marketing</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}