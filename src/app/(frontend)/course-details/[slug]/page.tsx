'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface CourseDetailsProps {
  params: Promise<{
    slug: string
  }>
}

export default function CourseDetailsPage({ params }: CourseDetailsProps) {
  useEffect(() => {
    // Initialize AOS after component mounts
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  }, [])

  return (
    <>
      {/* Page Title */}
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Course Details</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li className="current">Course Details</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Course Details Section */}
      <section id="course-details" className="course-details section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row">
            <div className="col-lg-8">
              {/* Course Hero */}
              <div className="course-hero" data-aos="fade-up" data-aos-delay="200">
                <div className="hero-content">
                  <div className="course-badge">
                    <span className="category">Web Development</span>
                    <span className="level">Advanced</span>
                  </div>
                  <h1>Full Stack JavaScript Mastery</h1>
                  <p className="course-subtitle">
                    Master modern web development with React, Node.js, and MongoDB in this comprehensive hands-on course
                  </p>

                  <div className="instructor-card">
                    <img src="/assets/img/person/person-m-8.webp" alt="Instructor" className="instructor-image" />
                    <div className="instructor-details">
                      <h5>Prof. Michael Rodriguez</h5>
                      <span>Senior Full Stack Developer</span>
                      <div className="instructor-rating">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                        <span>4.8 (1,247 reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hero-image">
                  <img src="/assets/img/education/courses-8.webp" alt="Course Preview" className="img-fluid" />
                  <div className="play-overlay">
                    <button className="play-btn">
                      <i className="bi bi-play-fill"></i>
                    </button>
                    <span>Watch Preview</span>
                  </div>
                </div>
              </div>

              {/* Course Navigation Tabs */}
              <div className="course-nav-tabs" data-aos="fade-up" data-aos-delay="300">
                <ul className="nav nav-tabs" id="courseTab" role="tablist">
                  <li className="nav-item">
                    <button 
                      className="nav-link active" 
                      id="overview-tab" 
                      data-bs-toggle="tab" 
                      data-bs-target="#overview" 
                      type="button" 
                      role="tab"
                    >
                      <i className="bi bi-layout-text-window-reverse"></i>
                      Overview
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className="nav-link" 
                      id="curriculum-tab" 
                      data-bs-toggle="tab" 
                      data-bs-target="#curriculum" 
                      type="button" 
                      role="tab"
                    >
                      <i className="bi bi-list-ul"></i>
                      Curriculum
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className="nav-link" 
                      id="reviews-tab" 
                      data-bs-toggle="tab" 
                      data-bs-target="#reviews" 
                      type="button" 
                      role="tab"
                    >
                      <i className="bi bi-star"></i>
                      Reviews
                    </button>
                  </li>
                </ul>

                <div className="tab-content" id="courseTabContent">
                  {/* Overview Tab */}
                  <div className="tab-pane fade show active" id="overview" role="tabpanel">
                    <div className="overview-section">
                      <h3>Course Description</h3>
                      <p>
                        This comprehensive Full Stack JavaScript course will take you from beginner to advanced level in modern web development. 
                        You'll learn to build complete web applications using the most popular JavaScript technologies including React for frontend, 
                        Node.js for backend, and MongoDB for database management.
                      </p>
                      <p>
                        Throughout this course, you'll work on real-world projects that will help you build a professional portfolio. 
                        By the end, you'll have the skills to create full-stack applications from scratch and deploy them to production.
                      </p>
                    </div>

                    <div className="skills-grid">
                      <h3>Skills You'll Gain</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="skill-item">
                            <div className="skill-icon">
                              <i className="bi bi-code-slash"></i>
                            </div>
                            <div className="skill-content">
                              <h5>Frontend Development</h5>
                              <p>React, JavaScript ES6+, HTML5 & CSS3</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="skill-item">
                            <div className="skill-icon">
                              <i className="bi bi-server"></i>
                            </div>
                            <div className="skill-content">
                              <h5>Backend Development</h5>
                              <p>Node.js, Express.js, RESTful APIs</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="skill-item">
                            <div className="skill-icon">
                              <i className="bi bi-database"></i>
                            </div>
                            <div className="skill-content">
                              <h5>Database Management</h5>
                              <p>MongoDB, Mongoose, Data Modeling</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="skill-item">
                            <div className="skill-icon">
                              <i className="bi bi-shield-check"></i>
                            </div>
                            <div className="skill-content">
                              <h5>Security & Testing</h5>
                              <p>Authentication, JWT, Unit Testing</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="requirements-section">
                      <h3>Requirements</h3>
                      <ul className="requirements-list">
                        <li><i className="bi bi-check2"></i>Basic understanding of HTML and CSS</li>
                        <li><i className="bi bi-check2"></i>Familiarity with JavaScript fundamentals</li>
                        <li><i className="bi bi-check2"></i>Computer with internet connection</li>
                        <li><i className="bi bi-check2"></i>Text editor or IDE installed</li>
                      </ul>
                    </div>
                  </div>

                  {/* Curriculum Tab */}
                  <div className="tab-pane fade" id="curriculum" role="tabpanel">
                    <div className="curriculum-overview">
                      <div className="curriculum-stats">
                        <div className="stat">
                          <i className="bi bi-collection-play"></i>
                          <span>12 Sections</span>
                        </div>
                        <div className="stat">
                          <i className="bi bi-play-circle"></i>
                          <span>89 Lectures</span>
                        </div>
                        <div className="stat">
                          <i className="bi bi-clock"></i>
                          <span>45h 32m</span>
                        </div>
                      </div>
                    </div>

                    <div className="accordion" id="curriculumAccordion">
                      <div className="accordion-item curriculum-module">
                        <h2 className="accordion-header">
                          <button 
                            className="accordion-button" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#module1"
                          >
                            <div className="module-info">
                              <span className="module-title">JavaScript Fundamentals & ES6+</span>
                              <span className="module-meta">8 lessons • 4h 15m</span>
                            </div>
                          </button>
                        </h2>
                        <div id="module1" className="accordion-collapse collapse show" data-bs-parent="#curriculumAccordion">
                          <div className="accordion-body">
                            <div className="lessons-list">
                              <div className="lesson">
                                <i className="bi bi-play-circle"></i>
                                <span className="lesson-title">Variables, Functions and Scope</span>
                                <span className="lesson-time">28 min</span>
                              </div>
                              <div className="lesson">
                                <i className="bi bi-play-circle"></i>
                                <span className="lesson-title">Arrow Functions and Destructuring</span>
                                <span className="lesson-time">35 min</span>
                              </div>
                              <div className="lesson">
                                <i className="bi bi-file-earmark-text"></i>
                                <span className="lesson-title">Promises and Async/Await</span>
                                <span className="lesson-time">42 min</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item curriculum-module">
                        <h2 className="accordion-header">
                          <button 
                            className="accordion-button collapsed" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#module2"
                          >
                            <div className="module-info">
                              <span className="module-title">React Development Deep Dive</span>
                              <span className="module-meta">12 lessons • 7h 45m</span>
                            </div>
                          </button>
                        </h2>
                        <div id="module2" className="accordion-collapse collapse" data-bs-parent="#curriculumAccordion">
                          <div className="accordion-body">
                            <div className="lessons-list">
                              <div className="lesson">
                                <i className="bi bi-play-circle"></i>
                                <span className="lesson-title">Components and JSX Syntax</span>
                                <span className="lesson-time">32 min</span>
                              </div>
                              <div className="lesson">
                                <i className="bi bi-play-circle"></i>
                                <span className="lesson-title">State Management with Hooks</span>
                                <span className="lesson-time">48 min</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item curriculum-module">
                        <h2 className="accordion-header">
                          <button 
                            className="accordion-button collapsed" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#module3"
                          >
                            <div className="module-info">
                              <span className="module-title">Node.js & Server Development</span>
                              <span className="module-meta">15 lessons • 8h 20m</span>
                            </div>
                          </button>
                        </h2>
                        <div id="module3" className="accordion-collapse collapse" data-bs-parent="#curriculumAccordion">
                          <div className="accordion-body">
                            <div className="lessons-list">
                              <div className="lesson">
                                <i className="bi bi-play-circle"></i>
                                <span className="lesson-title">Express.js Server Setup</span>
                                <span className="lesson-time">25 min</span>
                              </div>
                              <div className="lesson">
                                <i className="bi bi-file-earmark-text"></i>
                                <span className="lesson-title">Building RESTful APIs</span>
                                <span className="lesson-time">55 min</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reviews Tab */}
                  <div className="tab-pane fade" id="reviews" role="tabpanel">
                    <div className="reviews-summary">
                      <div className="rating-overview">
                        <div className="overall-rating">
                          <div className="rating-number">4.8</div>
                          <div className="rating-stars">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-half"></i>
                          </div>
                          <div className="rating-text">1,247 reviews</div>
                        </div>
                      </div>
                    </div>

                    <div className="reviews-list">
                      <div className="review-item">
                        <div className="reviewer-info">
                          <img src="/assets/img/person/person-f-12.webp" alt="Reviewer" className="reviewer-avatar" />
                          <div className="reviewer-details">
                            <h6>Jessica Chen</h6>
                            <div className="review-rating">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </div>
                          </div>
                          <span className="review-date">2 weeks ago</span>
                        </div>
                        <p className="review-text">
                          Excellent course! The instructor explains complex concepts very clearly and the hands-on projects 
                          really helped me understand how to apply what I learned. Highly recommended for anyone wanting to 
                          become a full-stack developer.
                        </p>
                      </div>

                      <div className="review-item">
                        <div className="reviewer-info">
                          <img src="/assets/img/person/person-m-5.webp" alt="Reviewer" className="reviewer-avatar" />
                          <div className="reviewer-details">
                            <h6>David Thompson</h6>
                            <div className="review-rating">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star"></i>
                            </div>
                          </div>
                          <span className="review-date">1 month ago</span>
                        </div>
                        <p className="review-text">
                          Great practical examples and real-world projects that helped me understand the concepts better. 
                          The course structure is well-organized and the pace is perfect for learning complex topics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              {/* Enrollment Card */}
              <div className="enrollment-card" data-aos="fade-up" data-aos-delay="200">
                <div className="card-header">
                  <div className="price-display">
                    <span className="current-price">$149</span>
                    <span className="original-price">$249</span>
                    <span className="discount">40% OFF</span>
                  </div>
                  <div className="enrollment-count">
                    <i className="bi bi-people"></i>
                    <span>3,892 students enrolled</span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="course-highlights">
                    <div className="highlight-item">
                      <i className="bi bi-trophy"></i>
                      <span>Certificate included</span>
                    </div>
                    <div className="highlight-item">
                      <i className="bi bi-clock-history"></i>
                      <span>45 hours content</span>
                    </div>
                    <div className="highlight-item">
                      <i className="bi bi-download"></i>
                      <span>Downloadable resources</span>
                    </div>
                    <div className="highlight-item">
                      <i className="bi bi-infinity"></i>
                      <span>Lifetime access</span>
                    </div>
                    <div className="highlight-item">
                      <i className="bi bi-phone"></i>
                      <span>Mobile access</span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button className="btn-primary">Enroll Now</button>
                    <button className="btn-secondary">Add to Wishlist</button>
                  </div>

                  <div className="guarantee">
                    <i className="bi bi-shield-check"></i>
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="course-details-card" data-aos="fade-up" data-aos-delay="300">
                <h4>Course Details</h4>
                <div className="detail-grid">
                  <div className="detail-row">
                    <span className="detail-label">Duration</span>
                    <span className="detail-value">16 weeks</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Skill Level</span>
                    <span className="detail-value">Intermediate</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Language</span>
                    <span className="detail-value">English</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Quizzes</span>
                    <span className="detail-value">24</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Assignments</span>
                    <span className="detail-value">8 projects</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Updated</span>
                    <span className="detail-value">December 2024</span>
                  </div>
                </div>
              </div>

              {/* Share Course */}
              <div className="share-course-card" data-aos="fade-up" data-aos-delay="400">
                <h4>Share This Course</h4>
                <div className="social-links">
                  <a href="#" className="social-link facebook">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="social-link twitter">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="social-link linkedin">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href="#" className="social-link email">
                    <i className="bi bi-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
