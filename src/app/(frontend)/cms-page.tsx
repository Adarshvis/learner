import * as React from 'react'
import Link from 'next/link'
import { getPageContent } from '../../lib/payload'
import TestimonialsSlider from './components/TestimonialsSlider'

export default async function CMSHomePage() {
  try {
    // Fetch home page sections from the home-page collection
    const homePageSections = await getPageContent('home')
    
    // Add safety check and ensure homePageSections is an array
    const sections = Array.isArray(homePageSections) ? homePageSections : []
    
    // If no sections, show setup message
    if (sections.length === 0) {
      return (
        <div className="container py-5">
          <div className="text-center">
            <h2>🎉 CMS Integration Active!</h2>
            <p>Your homepage is connected but needs content. Please add sections to your <strong>Home Page</strong> collection.</p>
            <div className="alert alert-info my-4">
              <h6>Available Section Types:</h6>
              <ul className="list-unstyled">
                <li>✅ Hero Section</li>
                <li>✅ Featured Courses</li>
                <li>✅ Course Categories</li>
                <li>✅ Featured Instructors</li>
                <li>✅ Testimonials</li>
                <li>✅ Recent Blog Posts</li>
                <li>✅ CTA Section</li>
              </ul>
            </div>
            <Link href="/admin" className="btn btn-primary btn-lg">
              Go to Admin Panel
            </Link>
          </div>
        </div>
      )
    }

    // Find sections by type
    const heroSection = sections.find((section: any) => section.sectionType === 'hero')
    const featuredCoursesSection = sections.find((section: any) => section.sectionType === 'featured-courses')
    const categoriesSection = sections.find((section: any) => section.sectionType === 'course-categories')
    const instructorsSection = sections.find((section: any) => section.sectionType === 'featured-instructors')
    const testimonialsSection = sections.find((section: any) => section.sectionType === 'testimonials')
    const blogSection = sections.find((section: any) => section.sectionType === 'blog-posts')
    const ctaSection = sections.find((section: any) => section.sectionType === 'cta')

    return (
      <>
        {/* Hero Section */}
        {heroSection && heroSection.hero && (
          <section id="courses-hero" className="courses-hero section light-background">
            <div className="hero-content">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="hero-text">
                      <h1>{heroSection.hero.title || "Welcome to Learner"}</h1>
                      <p>{heroSection.hero.description || "Learn new skills with our expert courses"}</p>

                      {/* Hero Stats */}
                      {heroSection.hero.stats && (
                        <div className="hero-stats">
                          {heroSection.hero.stats.map((stat: any, index: number) => (
                            <div key={index} className="stat-item">
                              <span className="number">{stat.number}</span>
                              <span className="label">{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Hero Buttons */}
                      <div className="hero-buttons">
                        {heroSection.hero.primaryButton && (
                          <a href={heroSection.hero.primaryButton.link} className="btn btn-primary">
                            {heroSection.hero.primaryButton.text}
                          </a>
                        )}
                        {heroSection.hero.secondaryButton && (
                          <a href={heroSection.hero.secondaryButton.link} className="btn btn-outline">
                            {heroSection.hero.secondaryButton.text}
                          </a>
                        )}
                      </div>

                      {/* Hero Features */}
                      {heroSection.hero.features && (
                        <div className="hero-features">
                          {heroSection.hero.features.map((feature: any, index: number) => (
                            <div key={index} className="feature">
                              <i className={`bi ${feature.icon}`}></i>
                              <span>{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="hero-image">
                      <div className="main-image">
                        {heroSection.hero.heroImage && (
                          <img
                            src={typeof heroSection.hero.heroImage === 'object' ? heroSection.hero.heroImage.url : '/assets/img/education/courses-13.webp'}
                            alt={heroSection.hero.title}
                            className="img-fluid"
                          />
                        )}
                        {!heroSection.hero.heroImage && (
                          <img
                            src="/assets/img/education/courses-13.webp"
                            alt="Online Learning"
                            className="img-fluid"
                          />
                        )}
                      </div>

                      {/* Floating Cards */}
                      {heroSection.hero.floatingCards && (
                        <div className="floating-cards">
                          {heroSection.hero.floatingCards.map((card: any, index: number) => (
                            <div key={index} className="course-card">
                              <div className="card-icon">
                                <i className={`bi ${card.icon}`}></i>
                              </div>
                              <div className="card-content">
                                <h6>{card.title}</h6>
                                <span>{card.students}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-background">
              <div className="bg-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
              </div>
            </div>
          </section>
        )}

        {/* Featured Courses Section */}
        {featuredCoursesSection && featuredCoursesSection.featuredCourses && (
          <section id="featured-courses" className="featured-courses section">
            <div className="container section-title">
              <h2>{featuredCoursesSection.featuredCourses.title || "Featured Courses"}</h2>
              <p>{featuredCoursesSection.featuredCourses.description || "Explore our most popular courses"}</p>
            </div>

            <div className="container">
              <div className="row gy-4">
                {featuredCoursesSection.featuredCourses.courses && featuredCoursesSection.featuredCourses.courses.map((course: any, index: number) => (
                  <div key={index} className="col-lg-4 col-md-6">
                    <div className="course-card">
                      <div className="course-image">
                        <img 
                          src={typeof course.image === 'object' ? course.image.url : '/assets/img/education/students-9.webp'} 
                          alt={course.title} 
                          className="img-fluid" 
                        />
                        {course.badge && <div className={`badge ${course.badge}`}>{course.badge}</div>}
                        <div className="price-badge">{course.price}</div>
                      </div>
                      <div className="course-content">
                        <div className="course-meta">
                          <span className="level">{course.level}</span>
                          <span className="duration">{course.duration}</span>
                        </div>
                        <h3><a href="#">{course.title}</a></h3>
                        <p>{course.description}</p>
                        <div className="instructor">
                          <img 
                            src={typeof course.instructorAvatar === 'object' ? course.instructorAvatar.url : '/assets/img/person/person-f-3.webp'} 
                            alt={course.instructorName} 
                            className="instructor-img" 
                          />
                          <div className="instructor-info">
                            <h6>{course.instructorName}</h6>
                            <span>{course.instructorSpecialty}</span>
                          </div>
                        </div>
                        <div className="course-stats">
                          <div className="rating">
                            {Array.from({ length: Math.floor(course.rating || 5) }, (_, i) => (
                              <i key={i} className="bi bi-star-fill"></i>
                            ))}
                            {(course.rating || 5) % 1 !== 0 && <i className="bi bi-star-half"></i>}
                            <span>({course.rating || 5})</span>
                          </div>
                          <div className="students">
                            <i className="bi bi-people-fill"></i>
                            <span>{course.studentCount} students</span>
                          </div>
                        </div>
                        <a href="/enroll" className="btn-course">Enroll Now</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              {featuredCoursesSection.featuredCourses.viewAllButton && (
                <div className="more-courses text-center">
                  <a href={featuredCoursesSection.featuredCourses.viewAllButton.link} className="btn-more">
                    {featuredCoursesSection.featuredCourses.viewAllButton.text}
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Course Categories Section */}
        {categoriesSection && categoriesSection.courseCategories && (
          <section id="course-categories" className="course-categories section">
            <div className="container section-title">
              <h2>{categoriesSection.courseCategories.title || "Course Categories"}</h2>
              <p>{categoriesSection.courseCategories.description || "Explore our diverse course categories"}</p>
            </div>

            <div className="container">
              <div className="row g-4">
                {categoriesSection.courseCategories.categories && categoriesSection.courseCategories.categories.map((category: any, index: number) => (
                  <div key={index} className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <a href={category.link || '/courses'} className="category-card category-tech">
                      <div className="category-icon">
                        <i className={`bi ${category.icon}`}></i>
                      </div>
                      <h5>{category.name}</h5>
                      <span className="course-count">{category.courseCount} Courses</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Instructors Section */}
        {instructorsSection && instructorsSection.featuredInstructors && (
          <section id="featured-instructors" className="featured-instructors section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
              <h2>{instructorsSection.featuredInstructors.title || "Featured Instructors"}</h2>
              <p>{instructorsSection.featuredInstructors.description || "Learn from industry experts"}</p>
            </div>{/* End Section Title */}

            <div className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="row gy-4">
                {instructorsSection.featuredInstructors.instructors && instructorsSection.featuredInstructors.instructors.map((instructor: any, index: number) => (
                  <div key={index} className="col-xl-3 col-lg-4 col-md-6">
                    <div className="instructor-card">
                      <div className="instructor-image">
                        <img 
                          src={typeof instructor.image === 'object' ? instructor.image.url : '/assets/img/education/teacher-2.webp'} 
                          className="img-fluid" 
                          alt={instructor.name} 
                        />
                        <div className="overlay-content">
                          <div className="rating-stars">
                            {Array.from({ length: Math.floor(instructor.rating || 5) }, (_, i) => (
                              <i key={i} className="bi bi-star-fill"></i>
                            ))}
                            {(instructor.rating || 5) % 1 !== 0 && <i className="bi bi-star-half"></i>}
                            <span>{instructor.rating || 5}</span>
                          </div>
                          <div className="course-count">
                            <i className="bi bi-play-circle"></i>
                            <span>{instructor.courseCount} Courses</span>
                          </div>
                        </div>
                      </div>
                      <div className="instructor-info">
                        <h5>{instructor.name}</h5>
                        <p className="specialty">{instructor.specialty}</p>
                        <p className="description">{instructor.description}</p>
                        <div className="stats-grid">
                          <div className="stat">
                            <span className="number">{instructor.studentCount}</span>
                            <span className="label">Students</span>
                          </div>
                          <div className="stat">
                            <span className="number">{instructor.rating || 5}</span>
                            <span className="label">Rating</span>
                          </div>
                        </div>
                        <div className="action-buttons">
                          <a href="#" className="btn-view">View Profile</a>
                          <div className="social-links">
                            {instructor.socialLinks && instructor.socialLinks.map((social: any, socialIndex: number) => (
                              <a key={socialIndex} href={social.url} target="_blank">
                                <i className={`bi bi-${social.platform}`}></i>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {testimonialsSection && testimonialsSection.testimonials && (
          <section id="testimonials" className="testimonials section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
              <h2>{testimonialsSection.testimonials.title || "Testimonials"}</h2>
              <p>{testimonialsSection.testimonials.description || "What our students say about us"}</p>
            </div>{/* End Section Title */}

            <div className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="row">
                <div className="col-12">
                  
                  {/* Critic Reviews - Top 3 Cards */}
                  {testimonialsSection.testimonials.criticReviews && (
                    <div className="critic-reviews" data-aos="fade-up" data-aos-delay="300">
                      <div className="row">
                        {testimonialsSection.testimonials.criticReviews.map((review: any, index: number) => (
                          <div key={index} className="col-md-4">
                            <div className="critic-review">
                              <div className="review-quote">"</div>
                              <div className="stars">
                                {Array.from({ length: Math.floor(review.rating || 5) }, (_, i) => (
                                  <i key={i} className="bi bi-star-fill"></i>
                                ))}
                                {(review.rating || 5) % 1 !== 0 && <i className="bi bi-star-half"></i>}
                              </div>
                              <p>{review.quote}</p>
                              <div className="critic-info">
                                <div className="critic-name">{review.source}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Student Testimonials with Slider */}
                  {testimonialsSection.testimonials.studentReviews && (
                    <TestimonialsSlider testimonials={testimonialsSection.testimonials.studentReviews} />
                  )}

                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recent Blog Posts Section */}
        {blogSection && blogSection.blogPosts && (
          <section id="recent-blog-posts" className="recent-blog-posts section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
              <h2>{blogSection.blogPosts.title || "Recent Blog Posts"}</h2>
              <p>{blogSection.blogPosts.description || "Stay updated with our latest insights"}</p>
            </div>{/* End Section Title */}

            <div className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="row gy-4">
                {blogSection.blogPosts.posts && blogSection.blogPosts.posts.map((post: any, index: number) => (
                  <div key={index} className="col-lg-4" data-aos="fade-up" data-aos-delay={(index + 2) * 100}>
                    <div className="card">
                      <div className="card-top d-flex align-items-center">
                        <img 
                          src={typeof post.authorAvatar === 'object' ? post.authorAvatar.url : '/assets/img/person/person-f-12.webp'} 
                          alt="Author" 
                          className="rounded-circle me-2"
                        />
                        <span className="author-name">By {post.authorName}</span>
                        <span className="ms-auto likes">
                          <i className="bi bi-heart"></i> {post.likes}
                        </span>
                      </div>
                      <div className="card-img-wrapper">
                        <img 
                          src={typeof post.image === 'object' ? post.image.url : '/assets/img/blog/blog-post-1.webp'} 
                          alt="Post Image"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          <a href={post.link}>{post.title}</a>
                        </h5>
                        <p className="card-text">{post.excerpt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {ctaSection && ctaSection.cta && (
          <section id="cta" className="cta section light-background">
            <div className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="row align-items-center">
                
                <div className="col-lg-6" data-aos="fade-right" data-aos-delay="200">
                  <div className="cta-content">
                    <h2>{ctaSection.cta.title}</h2>
                    <p>{ctaSection.cta.description}</p>

                    {/* Feature List */}
                    {ctaSection.cta.features && (
                      <div className="features-list">
                        {ctaSection.cta.features.map((feature: any, index: number) => (
                          <div key={index} className="feature-item" data-aos="fade-up" data-aos-delay={300 + (index * 50)}>
                            <i className="bi bi-check-circle-fill"></i>
                            <span>{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="cta-actions" data-aos="fade-up" data-aos-delay="500">
                      {ctaSection.cta.primaryButton && (
                        <a href={ctaSection.cta.primaryButton.link} className="btn btn-primary">
                          {ctaSection.cta.primaryButton.text}
                        </a>
                      )}
                      {ctaSection.cta.secondaryButton && (
                        <a href={ctaSection.cta.secondaryButton.link} className="btn btn-outline">
                          {ctaSection.cta.secondaryButton.text}
                        </a>
                      )}
                    </div>

                    {/* CTA Stats */}
                    {ctaSection.cta.stats && (
                      <div className="stats-row" data-aos="fade-up" data-aos-delay="400">
                        {ctaSection.cta.stats.map((stat: any, index: number) => (
                          <div key={index} className="stat-item">
                            <h3>
                              <span className="purecounter">{stat.number}</span>
                              {stat.suffix && stat.suffix}
                            </h3>
                            <p>{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-lg-6" data-aos="fade-left" data-aos-delay="300">
                  <div className="cta-image">
                    <img 
                      src={typeof ctaSection.cta.image === 'object' ? ctaSection.cta.image.url : '/assets/img/education/courses-4.webp'} 
                      alt={ctaSection.cta.title || 'Online Learning Platform'} 
                      className="img-fluid" 
                    />

                    {/* Floating Cards */}
                    {ctaSection.cta.floatingCards && (
                      <>
                        {ctaSection.cta.floatingCards.map((card: any, index: number) => (
                          <div 
                            key={index} 
                            className={`floating-element ${index === 0 ? 'student-card' : 'course-card'}`}
                            data-aos="zoom-in" 
                            data-aos-delay={600 + (index * 100)}
                          >
                            <div className="card-content">
                              <i className={`bi ${card.icon}`}></i>
                              <div className="text">
                                <span className="number">{card.number}</span>
                                <span className="label">{card.label}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}
      </>
    )
  } catch (error) {
    console.error('Error fetching home page content:', error)
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Welcome to Learner</h2>
          <p>Error loading content. Please check the admin panel and server logs.</p>
          <Link href="/admin" className="btn btn-primary">Go to Admin Panel</Link>
          <div className="alert alert-danger mt-3">
            <strong>Debug Info:</strong> {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        </div>
      </div>
    )
  }
}
