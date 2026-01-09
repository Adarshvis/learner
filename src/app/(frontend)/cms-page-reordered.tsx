import * as React from 'react'
import Link from 'next/link'
import { getPageContent } from '../../lib/payload'
import TestimonialsSlider from './components/TestimonialsSlider'
import { BlockRenderer } from './components/BlockRenderer'
import RecentBlogPosts from './components/RecentBlogPosts'
import FeaturedNews from './components/FeaturedNews'
import { HeroSectionRenderer } from './components/HeroSectionRenderer'

// Section renderer components
const HeroRenderer = ({ section }: { section: any }) => {
  if (!section?.hero) return null
  return <HeroSectionRenderer hero={section.hero} />
}

const OurStoryRenderer = ({ section }: { section: any }) => {
  const ourStory = section?.ourStory
  if (!ourStory) return null
  
  return (
    <section id="about" className="about section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="about-content" data-aos="fade-up" data-aos-delay="200">
              {ourStory.subtitle && <h3>{ourStory.subtitle}</h3>}
              {ourStory.title && <h2>{ourStory.title}</h2>}
              {ourStory.description && <p>{ourStory.description}</p>}

              {ourStory.timelinePoints && ourStory.timelinePoints.length > 0 && (
                <div className="timeline">
                  {ourStory.timelinePoints.map((item: any, index: number) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        {item.title && <h4>{item.title}</h4>}
                        {item.description && <p>{item.description}</p>}
                      </div>
                    </div>
                  ))}
                  
                  {(ourStory.buttonText || ourStory.buttonLink) && (
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <Link 
                          href={ourStory.buttonLink || '/about'} 
                          className="btn btn-primary"
                        >
                          {ourStory.buttonText || 'Learn More About Us'}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="about-image" data-aos="zoom-in" data-aos-delay="300">
              {ourStory.campusImage && (
                <img 
                  src={typeof ourStory.campusImage === 'object' 
                    ? ourStory.campusImage.url 
                    : ourStory.campusImage}
                  alt="Campus" 
                  className="img-fluid rounded"
                />
              )}

              {ourStory.missionVisionCards && ourStory.missionVisionCards.length > 0 && (
                <div className="mission-vision" data-aos="fade-up" data-aos-delay="400">
                  {ourStory.missionVisionCards.map((card: any, index: number) => (
                    <div key={index} className={index === 0 ? 'mission' : 'vision'}>
                      {card.title && <h3>{card.title}</h3>}
                      {card.description && <p>{card.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {ourStory.coreValues && ourStory.coreValues.length > 0 && (
          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="core-values" data-aos="fade-up" data-aos-delay="500">
                <h3 className="text-center mb-4">Core Values</h3>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                  {ourStory.coreValues.map((value: any, index: number) => (
                    <div key={index} className="col">
                      <div className="value-card">
                        <div className="value-icon">
                          <i className={`bi ${value.icon}`}></i>
                        </div>
                        {value.title && <h4>{value.title}</h4>}
                        {value.description && <p>{value.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

const FeaturedInstructorsRenderer = ({ section }: { section: any }) => {
  const data = section?.featuredInstructors
  if (!data) return null
  
  return (
    <section id="featured-instructors" className="featured-instructors section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{data.title || "Research Domains"}</h2>
        <p>{data.description || "Explore our areas of expertise"}</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {data.instructors && data.instructors.map((instructor: any, index: number) => (
            <div key={index} className="col-xl-3 col-lg-4 col-md-6">
              <div className="instructor-card">
                {instructor.image && (
                  <div className="instructor-image">
                    <img 
                      src={typeof instructor.image === 'object' ? instructor.image.url : '/assets/img/education/teacher-2.webp'} 
                      className="img-fluid" 
                      alt={instructor.name || 'Instructor'} 
                    />
                    {(instructor.rating || instructor.courseCount) && (
                      <div className="overlay-content">
                        {instructor.rating && (
                          <div className="rating-stars">
                            {Array.from({ length: Math.floor(instructor.rating) }, (_, i) => (
                              <i key={i} className="bi bi-star-fill"></i>
                            ))}
                            {instructor.rating % 1 !== 0 && <i className="bi bi-star-half"></i>}
                            <span>{instructor.rating}</span>
                          </div>
                        )}
                        {instructor.courseCount && (
                          <div className="course-count">
                            <i className="bi bi-play-circle"></i>
                            <span>{instructor.courseCount} Courses</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <div className="instructor-info">
                  {instructor.name && <h5>{instructor.name}</h5>}
                  {instructor.description && <p className="description">{instructor.description}</p>}
                  {(instructor.studentCount || instructor.rating) && (
                    <div className="stats-grid">
                      {instructor.studentCount && (
                        <div className="stat">
                          <span className="number">{instructor.studentCount}</span>
                          <span className="label">Students</span>
                        </div>
                      )}
                      {instructor.rating && (
                        <div className="stat">
                          <span className="number">{instructor.rating}</span>
                          <span className="label">Rating</span>
                        </div>
                      )}
                    </div>
                  )}
                  {(instructor.profileLink || instructor.profileButtonText || instructor.socialLinks) && (
                    <div className="action-buttons">
                      {(instructor.profileLink || instructor.profileButtonText) && (
                        <a href={instructor.profileLink || '#'} className="btn-view">
                          {instructor.profileButtonText || 'View Profile'}
                        </a>
                      )}
                      {instructor.socialLinks && instructor.socialLinks.length > 0 && (
                        <div className="social-links">
                          {instructor.socialLinks.map((social: any, socialIndex: number) => (
                            social.url && (
                              <a key={socialIndex} href={social.url} target="_blank" rel="noopener noreferrer">
                                <i className={`bi bi-${social.platform}`}></i>
                              </a>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FeaturedCoursesRenderer = ({ section }: { section: any }) => {
  const data = section?.featuredCourses
  if (!data) return null
  
  return (
    <section id="featured-courses" className="featured-courses section">
      <div className="container section-title">
        <h2>{data.title || "Work With Us"}</h2>
        <p>{data.description || ""}</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {data.courses && data.courses.map((course: any, index: number) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="course-card" style={{ height: 'auto' }}>
                {course.image && (
                  <div className="course-image">
                    <img 
                      src={typeof course.image === 'object' ? course.image.url : '/assets/img/education/students-9.webp'} 
                      alt={course.title || 'Course'} 
                      className="img-fluid" 
                    />
                    {course.badge && <div className={`badge ${course.badge}`}>{course.badge}</div>}
                    {course.price && <div className="price-badge">{course.price}</div>}
                  </div>
                )}
                <div className="course-content">
                  {(course.level || course.duration) && (
                    <div className="course-meta">
                      {course.level && <span className="level">{course.level}</span>}
                      {course.duration && <span className="duration">{course.duration}</span>}
                    </div>
                  )}
                  {course.title && <h3><a href="#">{course.title}</a></h3>}
                  {course.description && <p>{course.description}</p>}
                  {(course.instructorAvatar || course.instructorName || course.instructorSpecialty) && (
                    <div className="instructor">
                      {course.instructorAvatar && (
                        <img 
                          src={typeof course.instructorAvatar === 'object' ? course.instructorAvatar.url : '/assets/img/person/person-f-3.webp'} 
                          alt={course.instructorName || 'Instructor'} 
                          className="instructor-img" 
                        />
                      )}
                      {(course.instructorName || course.instructorSpecialty) && (
                        <div className="instructor-info">
                          {course.instructorName && <h6>{course.instructorName}</h6>}
                          {course.instructorSpecialty && <span>{course.instructorSpecialty}</span>}
                        </div>
                      )}
                    </div>
                  )}
                  {(course.rating || course.studentCount) && (
                    <div className="course-stats">
                      {course.rating && (
                        <div className="rating">
                          {Array.from({ length: Math.floor(course.rating) }, (_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                          {course.rating % 1 !== 0 && <i className="bi bi-star-half"></i>}
                          <span>({course.rating})</span>
                        </div>
                      )}
                      {course.studentCount && (
                        <div className="students">
                          <i className="bi bi-people-fill"></i>
                          <span>{course.studentCount} students</span>
                        </div>
                      )}
                    </div>
                  )}
                  {(course.buttonText || course.buttonLink) && (
                    <a href={course.buttonLink || '#'} className="btn-course">
                      {course.buttonText || 'Enroll Now'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.viewAllButton && data.viewAllButton.text && data.viewAllButton.link && (
          <div className="more-courses text-center">
            <a href={data.viewAllButton.link} className="btn-more">
              {data.viewAllButton.text}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

const TestimonialsRenderer = ({ section }: { section: any }) => {
  const data = section?.testimonials
  if (!data || (!data.criticReviews?.length && !data.studentReviews?.length)) return null
  
  return (
    <section id="testimonials" className="testimonials section">
      {(data.title || data.description) && (
        <div className="container section-title" data-aos="fade-up">
          {data.title && <h2>{data.title}</h2>}
          {data.description && <p>{data.description}</p>}
        </div>
      )}

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <div className="col-12">
            {data.criticReviews && data.criticReviews.length > 0 && (
              <div className="critic-reviews" data-aos="fade-up" data-aos-delay="300">
                <div className="row">
                  {data.criticReviews.map((review: any, index: number) => (
                    <div key={index} className="col-md-4">
                      <div className="critic-review">
                        <div className="review-quote">&quot;</div>
                        <div className="stars">
                          {Array.from({ length: Math.floor(review.rating || 5) }, (_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                          {(review.rating || 5) % 1 !== 0 && <i className="bi bi-star-half"></i>}
                        </div>
                        {review.quote && <p>{review.quote}</p>}
                        {review.source && (
                          <div className="critic-info">
                            <div className="critic-name">{review.source}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.studentReviews && data.studentReviews.length > 0 && (
              <TestimonialsSlider testimonials={data.studentReviews} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const FeaturedNewsRenderer = ({ section }: { section: any }) => {
  return (
    <FeaturedNews 
      title={section?.featuredNews?.title}
      description={section?.featuredNews?.description}
    />
  )
}

const BlogPostsRenderer = () => {
  return <RecentBlogPosts />
}

const CTARenderer = ({ section }: { section: any }) => {
  const cta = section?.cta
  if (!cta) return null
  
  return (
    <section id="cta" className="cta section light-background">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row align-items-center">
          <div className="col-lg-6" data-aos="fade-right" data-aos-delay="200">
            <div className="cta-content">
              <h2>{cta.title}</h2>
              <p>{cta.description}</p>

              {cta.features && (
                <div className="features-list">
                  {cta.features.map((feature: any, index: number) => (
                    <div key={index} className="feature-item" data-aos="fade-up" data-aos-delay={300 + (index * 50)}>
                      <i className="bi bi-check-circle-fill"></i>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="cta-actions" data-aos="fade-up" data-aos-delay="500">
                {cta.primaryButton && (
                  <a href={cta.primaryButton.link} className="btn btn-primary">
                    {cta.primaryButton.text}
                  </a>
                )}
                {cta.secondaryButton && (
                  <a href={cta.secondaryButton.link} className="btn btn-outline">
                    {cta.secondaryButton.text}
                  </a>
                )}
              </div>

              {cta.stats && (
                <div className="stats-row" data-aos="fade-up" data-aos-delay="400">
                  {cta.stats.map((stat: any, index: number) => (
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
                src={typeof cta.image === 'object' ? cta.image.url : '/assets/img/education/courses-4.webp'} 
                alt={cta.title || 'Online Learning Platform'} 
                className="img-fluid" 
              />

              {cta.floatingCards && (
                <>
                  {cta.floatingCards.map((card: any, index: number) => (
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
  )
}

const CustomBlockRenderer = ({ section }: { section: any }) => {
  if (!section?.customBlock) return null
  return <BlockRenderer blocks={section.customBlock} />
}

// Map section types to their renderers
const sectionRenderers: { [key: string]: React.FC<{ section: any }> } = {
  'hero': HeroRenderer,
  'our-story': OurStoryRenderer,
  'featured-instructors': FeaturedInstructorsRenderer,
  'featured-courses': FeaturedCoursesRenderer,
  'testimonials': TestimonialsRenderer,
  'featured-news': FeaturedNewsRenderer,
  'blog-posts': BlogPostsRenderer,
  'cta': CTARenderer,
  'custom-block': CustomBlockRenderer,
}

export default async function CMSHomePage() {
  try {
    // Fetch home page sections from the home-page collection
    // Sections are sorted by 'order' field in getPageContent
    const homePageSections = await getPageContent('home')
    
    // Add safety check and ensure homePageSections is an array
    const sections = Array.isArray(homePageSections) ? homePageSections : []
    
    console.log('=== CMS HomePage Debug ===')
    console.log('Total sections:', sections.length)
    console.log('Section order:', sections.map((s: any) => `${s.order}: ${s.sectionType}`))
    console.log('========================')
    
    // If no sections, show setup message
    if (sections.length === 0) {
      return (
        <div className="container py-5">
          <div className="text-center">
            <h2>CMS Integration Active!</h2>
            <p>Your homepage is connected but needs content. Please add sections to your <strong>Home Page</strong> collection.</p>
            <div className="alert alert-info my-4">
              <h6>Available Section Types:</h6>
              <ul className="list-unstyled">
                <li>Hero Section</li>
                <li>Our Story</li>
                <li>Work With Us (Featured Courses)</li>
                <li>Research Domains (Featured Instructors)</li>
                <li>Testimonials</li>
                <li>Featured News</li>
                <li>Recent Blog Posts</li>
                <li>CTA Section</li>
                <li>Custom Block</li>
              </ul>
            </div>
            <p className="text-muted">
              <strong>Tip:</strong> Use the &quot;Order&quot; field to control section position. Lower numbers appear first.
            </p>
            <Link href="/admin" className="btn btn-primary btn-lg">
              Go to Admin Panel
            </Link>
          </div>
        </div>
      )
    }

    // Render sections dynamically based on their order from the database
    return (
      <>
        {sections.map((section: any, index: number) => {
          const Renderer = sectionRenderers[section.sectionType]
          if (!Renderer) {
            console.warn(`Unknown section type: ${section.sectionType}`)
            return null
          }
          return <Renderer key={section.id || index} section={section} />
        })}
      </>
    )
  } catch (error) {
    // Return empty sections on error
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
