'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface BlogPageData {
  id: string
  sectionName: string
  sectionType: string
  status: string
  pageTitle?: {
    title: string
    breadcrumbs?: Array<{
      label: string
      link?: string
      isActive: boolean
    }>
  }
  blogHero?: {
    posts: Array<{
      image: { url: string; alt: string }
      date: string
      category: string
      title: string
      link: string
    }>
  }
  blogPosts?: {
    posts: Array<{
      image: { url: string; alt: string }
      date: {
        day: number
        month: string
      }
      author: string
      category: string
      title: string
      link: string
    }>
  }
}

export default function CMSBlogPage() {
  const [pageData, setPageData] = useState<BlogPageData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize AOS after component mounts
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })

    // Fetch blog page data
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blog')
        const data = await response.json()

        setPageData(data.pageData || [])
      } catch (error) {
        console.error('Error fetching blog data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="loading-container d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  // Extract different sections from pageData
  const pageTitleSection = pageData.find(section => section.sectionType === 'page-title')
  const heroSection = pageData.find(section => section.sectionType === 'blog-hero')
  const postsSection = pageData.find(section => section.sectionType === 'blog-posts')

  return (
    <>
      {/* Page Title */}
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">{pageTitleSection?.pageTitle?.title || 'Blog'}</h1>
          <nav className="breadcrumbs">
            <ol>
              {pageTitleSection?.pageTitle?.breadcrumbs?.map((breadcrumb, index) => (
                <li key={index} className={breadcrumb.isActive ? 'current' : ''}>
                  {breadcrumb.link ? (
                    <Link href={breadcrumb.link}>{breadcrumb.label}</Link>
                  ) : (
                    breadcrumb.label
                  )}
                </li>
              )) || (
                <>
                  <li><Link href="/">Home</Link></li>
                  <li className="current">Blog</li>
                </>
              )}
            </ol>
          </nav>
        </div>
      </div>

      {/* Blog Hero Grid */}
      {heroSection?.blogHero?.posts && (
        <section id="blog-hero" className="blog-hero section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="blog-grid">
              {/* Featured Post (Large) */}
              {heroSection.blogHero.posts[0] && (
                <article className="blog-item featured" data-aos="fade-up">
                  <img 
                    src={heroSection.blogHero.posts[0].image.url} 
                    alt={heroSection.blogHero.posts[0].image.alt || heroSection.blogHero.posts[0].title} 
                    className="img-fluid" 
                  />
                  <div className="blog-content">
                    <div className="post-meta">
                      <span className="date">{heroSection.blogHero.posts[0].date}</span>
                      <span className="category">{heroSection.blogHero.posts[0].category}</span>
                    </div>
                    <h2 className="post-title">
                      <Link href={heroSection.blogHero.posts[0].link} title={heroSection.blogHero.posts[0].title}>
                        {heroSection.blogHero.posts[0].title}
                      </Link>
                    </h2>
                  </div>
                </article>
              )}

              {/* Regular Posts */}
              {heroSection.blogHero.posts.slice(1).map((post, index) => (
                <article key={index} className="blog-item" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                  <img 
                    src={post.image.url} 
                    alt={post.image.alt || post.title} 
                    className="img-fluid" 
                  />
                  <div className="blog-content">
                    <div className="post-meta">
                      <span className="date">{post.date}</span>
                      <span className="category">{post.category}</span>
                    </div>
                    <h3 className="post-title">
                      <Link href={post.link} title={post.title}>
                        {post.title}
                      </Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Section */}
      {postsSection?.blogPosts?.posts && (
        <section id="blog-posts" className="blog-posts section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              {postsSection.blogPosts.posts.map((post, index) => (
                <div key={index} className="col-lg-4">
                  <article className="position-relative h-100">
                    <div className="post-img position-relative overflow-hidden">
                      <img 
                        src={post.image.url} 
                        className="img-fluid" 
                        alt={post.title} 
                      />
                    </div>
                    <div className="meta d-flex align-items-end">
                      <span className="post-date">
                        <span>{post.date.day}</span>
                        {post.date.month}
                      </span>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-person"></i> 
                        <span className="ps-2">{post.author}</span>
                      </div>
                      <span className="px-3 text-black-50">/</span>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-folder2"></i> 
                        <span className="ps-2">{post.category}</span>
                      </div>
                    </div>
                    <div className="post-content d-flex flex-column">
                      <h3 className="post-title">{post.title}</h3>
                      <Link href={post.link} className="readmore stretched-link">
                        <span>Read More</span><i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Show message if no content */}
      {!heroSection?.blogHero?.posts && !postsSection?.blogPosts?.posts && (
        <section className="section">
          <div className="container">
            <div className="text-center py-5">
              <h3>No blog content available</h3>
              <p>Please add blog content through the admin panel.</p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}