import CMSBlogDetailsPage from '../cms-blog-details'

interface BlogDetailsProps {
  params: Promise<{
    slug: string
  }>
}

export default function BlogDetailsPage({ params }: BlogDetailsProps) {
  return <CMSBlogDetailsPage />
}

  return (
    <>
      {/* Page Title */}
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Blog Details</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li className="current">Blog Details</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Blog Details Section */}
      <section id="blog-details" className="blog-details section">
        <div className="container" data-aos="fade-up">
          <article className="article">
            <div className="article-header">
              <div className="meta-categories" data-aos="fade-up">
                <a href="#" className="category">Technology</a>
                <a href="#" className="category">Innovation</a>
              </div>

              <h1 className="title" data-aos="fade-up" data-aos-delay="100">
                The Evolution of User Interface Design: From Skeuomorphism to Neumorphism
              </h1>

              <div className="article-meta" data-aos="fade-up" data-aos-delay="200">
                <div className="author">
                  <img src="/assets/img/person/person-m-6.webp" alt="Author" className="author-img" />
                  <div className="author-info">
                    <h4>David Wilson</h4>
                    <span>UI/UX Design Lead</span>
                  </div>
                </div>
                <div className="post-info">
                  <span><i className="bi bi-calendar4-week"></i> November 14, 2024</span>
                  <span><i className="bi bi-clock"></i> 10 min read</span>
                  <span><i className="bi bi-chat-square-text"></i> 32 Comments</span>
                </div>
              </div>
            </div>

            <div className="article-featured-image" data-aos="zoom-in">
              <img src="/assets/img/blog/blog-hero-1.webp" alt="UI Design Evolution" className="img-fluid" />
            </div>

            <div className="article-wrapper">
              <aside className="table-of-contents" data-aos="fade-left">
                <h3>Table of Contents</h3>
                <nav>
                  <ul>
                    <li><a href="#introduction" className="active">Introduction</a></li>
                    <li><a href="#skeuomorphism">The Skeuomorphic Era</a></li>
                    <li><a href="#flat-design">Flat Design Revolution</a></li>
                    <li><a href="#material-design">Material Design</a></li>
                    <li><a href="#neumorphism">Rise of Neumorphism</a></li>
                    <li><a href="#future">Future Trends</a></li>
                  </ul>
                </nav>
              </aside>

              <div className="article-content">
                <div className="content-section" id="introduction" data-aos="fade-up">
                  <p className="lead">
                    The journey of user interface design has been marked by significant shifts in aesthetic approaches, 
                    each era bringing its own unique perspective on how digital interfaces should look and feel.
                  </p>

                  <p>
                    From the early days of graphical user interfaces to today's sophisticated design systems, 
                    the evolution of UI design reflects not just technological advancement, but also changing user 
                    expectations and cultural shifts in how we interact with digital products.
                  </p>

                  <div className="highlight-quote">
                    <blockquote>
                      <p>Design is not just what it looks like and feels like. Design is how it works.</p>
                      <cite>Steve Jobs</cite>
                    </blockquote>
                  </div>
                </div>

                <div className="content-section" id="skeuomorphism" data-aos="fade-up">
                  <h2>The Skeuomorphic Era</h2>
                  <div className="image-with-caption right">
                    <img src="/assets/img/blog/blog-hero-2.webp" alt="Skeuomorphic Design Example" className="img-fluid" loading="lazy" />
                    <figcaption>Early iOS design showcasing skeuomorphic elements</figcaption>
                  </div>
                  <p>
                    Skeuomorphic design dominated the early years of digital interfaces, attempting to mirror 
                    real-world objects in digital form. This approach helped users transition from physical to 
                    digital interactions through familiar visual metaphors.
                  </p>

                  <div className="feature-points">
                    <div className="point">
                      <i className="bi bi-layers"></i>
                      <div>
                        <h4>Realistic Textures</h4>
                        <p>Detailed representations of materials like leather, metal, and paper</p>
                      </div>
                    </div>
                    <div className="point">
                      <i className="bi bi-lightbulb"></i>
                      <div>
                        <h4>Familiar Metaphors</h4>
                        <p>Digital elements mimicking their physical counterparts</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content-section" id="flat-design" data-aos="fade-up">
                  <h2>The Flat Design Revolution</h2>
                  <p>
                    As users became more comfortable with digital interfaces, design began moving towards simplification. 
                    Flat design emerged as a reaction to the ornate details of skeuomorphism, emphasizing clarity and efficiency.
                  </p>

                  <div className="comparison-grid">
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div className="comparison-card">
                          <div className="icon"><i className="bi bi-check-circle"></i></div>
                          <h4>Advantages</h4>
                          <ul>
                            <li>Improved loading times</li>
                            <li>Better scalability</li>
                            <li>Cleaner visual hierarchy</li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="comparison-card">
                          <div className="icon"><i className="bi bi-exclamation-circle"></i></div>
                          <h4>Challenges</h4>
                          <ul>
                            <li>Reduced visual cues</li>
                            <li>Potential usability issues</li>
                            <li>Limited depth perception</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content-section" id="material-design" data-aos="fade-up">
                  <h2>Material Design: Finding Balance</h2>
                  <p>
                    Google's Material Design emerged as a comprehensive design system that combined the simplicity 
                    of flat design with subtle depth cues, creating a more intuitive user experience while maintaining 
                    modern aesthetics.
                  </p>

                  <div className="key-principles">
                    <div className="principle">
                      <span className="number">01</span>
                      <h4>Physical Properties</h4>
                      <p>Surfaces and edges provide meaningful interaction cues</p>
                    </div>
                    <div className="principle">
                      <span className="number">02</span>
                      <h4>Bold Graphics</h4>
                      <p>Deliberate color choices and intentional white space</p>
                    </div>
                    <div className="principle">
                      <span className="number">03</span>
                      <h4>Meaningful Motion</h4>
                      <p>Animation informs and reinforces user actions</p>
                    </div>
                  </div>
                </div>

                <div className="content-section" id="neumorphism" data-aos="fade-up">
                  <h2>The Rise of Neumorphism</h2>
                  <p>
                    Neumorphism represents the latest evolution in UI design, combining aspects of skeuomorphism 
                    with modern minimal aesthetics. This style creates soft, extruded surfaces that appear to 
                    emerge from the background.
                  </p>

                  <div className="info-box">
                    <div className="icon">
                      <i className="bi bi-info-circle"></i>
                    </div>
                    <div className="content">
                      <h4>Key Characteristics</h4>
                      <p>
                        Neumorphic design relies on subtle shadow work to create the illusion of elements either 
                        protruding from or being pressed into their background surface.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="content-section" id="future" data-aos="fade-up">
                  <h2>Looking to the Future</h2>
                  <p>
                    As we look ahead, UI design continues to evolve with new technologies and user expectations. 
                    The future may bring more personalized, adaptive interfaces that respond to individual user 
                    preferences and contexts.
                  </p>

                  <div className="future-trends">
                    <div className="trend">
                      <i className="bi bi-phone"></i>
                      <h4>Adaptive Interfaces</h4>
                      <p>Interfaces that automatically adjust based on user behavior and preferences</p>
                    </div>
                    <div className="trend">
                      <i className="bi bi-eye"></i>
                      <h4>Immersive Experiences</h4>
                      <p>Integration of AR and VR elements in everyday interfaces</p>
                    </div>
                    <div className="trend">
                      <i className="bi bi-hand-index"></i>
                      <h4>Gesture Controls</h4>
                      <p>Advanced motion and gesture-based interactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="article-footer" data-aos="fade-up">
              <div className="share-article">
                <h4>Share this article</h4>
                <div className="share-buttons">
                  <a href="#" className="share-button twitter">
                    <i className="bi bi-twitter-x"></i>
                    <span>Share on X</span>
                  </a>
                  <a href="#" className="share-button facebook">
                    <i className="bi bi-facebook"></i>
                    <span>Share on Facebook</span>
                  </a>
                  <a href="#" className="share-button linkedin">
                    <i className="bi bi-linkedin"></i>
                    <span>Share on LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="article-tags">
                <h4>Related Topics</h4>
                <div className="tags">
                  <a href="#" className="tag">UI Design</a>
                  <a href="#" className="tag">User Experience</a>
                  <a href="#" className="tag">Design Trends</a>
                  <a href="#" className="tag">Innovation</a>
                  <a href="#" className="tag">Technology</a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Blog Comments Section */}
      <section id="blog-comments" className="blog-comments section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="blog-comments-4">
            <div className="comments-header">
              <h3 className="title">Community Feedback</h3>
              <div className="comments-stats">
                <span className="count">12</span>
                <span className="label">Comments</span>
              </div>
            </div>

            <div className="comments-container">
              {/* Comment #1 */}
              <div className="comment-thread">
                <div className="comment-box">
                  <div className="comment-wrapper">
                    <div className="avatar-wrapper">
                      <img src="/assets/img/person/person-f-9.webp" alt="Avatar" loading="lazy" />
                      <span className="status-indicator"></span>
                    </div>

                    <div className="comment-content">
                      <div className="comment-header">
                        <div className="user-info">
                          <h4>Thomas Anderson</h4>
                          <span className="time-badge">
                            <i className="bi bi-clock"></i>
                            2 hours ago
                          </span>
                        </div>
                        <div className="engagement">
                          <span className="likes">
                            <i className="bi bi-heart"></i>
                            24
                          </span>
                        </div>
                      </div>

                      <div className="comment-body">
                        <p>
                          Excellent article! The evolution from skeuomorphism to neumorphism really shows how 
                          design adapts to user needs and technological capabilities. Looking forward to seeing 
                          what comes next in UI design.
                        </p>
                      </div>

                      <div className="comment-actions">
                        <button className="action-btn like-btn" aria-label="Like comment">
                          <i className="bi bi-heart"></i>
                          <span>Like</span>
                        </button>
                        <button className="action-btn reply-btn" aria-label="Reply to comment">
                          <i className="bi bi-chat"></i>
                          <span>Reply</span>
                        </button>
                        <button className="action-btn share-btn" aria-label="Share comment">
                          <i className="bi bi-share"></i>
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Replies Container */}
                <div className="replies-container">
                  {/* Reply #1 */}
                  <div className="comment-box reply">
                    <div className="comment-wrapper">
                      <div className="avatar-wrapper">
                        <img src="/assets/img/person/person-m-9.webp" alt="Avatar" loading="lazy" />
                        <span className="status-indicator"></span>
                      </div>

                      <div className="comment-content">
                        <div className="comment-header">
                          <div className="user-info">
                            <h4>Maria Rodriguez</h4>
                            <span className="time-badge">
                              <i className="bi bi-clock"></i>
                              1 hour ago
                            </span>
                          </div>
                          <div className="engagement">
                            <span className="likes">
                              <i className="bi bi-heart"></i>
                              8
                            </span>
                          </div>
                        </div>

                        <div className="comment-body">
                          <p>
                            I agree! As a UX designer, I've seen firsthand how these design trends have shaped 
                            user expectations. The shift to neumorphism is particularly interesting.
                          </p>
                        </div>

                        <div className="comment-actions">
                          <button className="action-btn like-btn" aria-label="Like comment">
                            <i className="bi bi-heart"></i>
                            <span>Like</span>
                          </button>
                          <button className="action-btn reply-btn" aria-label="Reply to comment">
                            <i className="bi bi-chat"></i>
                            <span>Reply</span>
                          </button>
                          <button className="action-btn share-btn" aria-label="Share comment">
                            <i className="bi bi-share"></i>
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment #2 */}
              <div className="comment-thread">
                <div className="comment-box">
                  <div className="comment-wrapper">
                    <div className="avatar-wrapper">
                      <img src="/assets/img/person/person-f-7.webp" alt="Avatar" loading="lazy" />
                      <span className="status-indicator"></span>
                    </div>

                    <div className="comment-content">
                      <div className="comment-header">
                        <div className="user-info">
                          <h4>Emily Watson</h4>
                          <span className="time-badge">
                            <i className="bi bi-clock"></i>
                            3 hours ago
                          </span>
                        </div>
                        <div className="engagement">
                          <span className="likes">
                            <i className="bi bi-heart"></i>
                            15
                          </span>
                        </div>
                      </div>

                      <div className="comment-body">
                        <p>
                          Great breakdown of design evolution! I remember when flat design first emerged and 
                          how revolutionary it felt. It's fascinating to see how we've come full circle with 
                          neumorphism bringing back some depth.
                        </p>
                      </div>

                      <div className="comment-actions">
                        <button className="action-btn like-btn" aria-label="Like comment">
                          <i className="bi bi-heart"></i>
                          <span>Like</span>
                        </button>
                        <button className="action-btn reply-btn" aria-label="Reply to comment">
                          <i className="bi bi-chat"></i>
                          <span>Reply</span>
                        </button>
                        <button className="action-btn share-btn" aria-label="Share comment">
                          <i className="bi bi-share"></i>
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Comment Form Section */}
      <section id="blog-comment-form" className="blog-comment-form section">
        <div className="container">
          <form action="">
            <h4>Post Comment</h4>
            <p>Your email address will not be published. Required fields are marked *</p>
            <div className="row">
              <div className="col-md-6 form-group">
                <input name="name" type="text" className="form-control" placeholder="Your Name*" />
              </div>
              <div className="col-md-6 form-group">
                <input name="email" type="text" className="form-control" placeholder="Your Email*" />
              </div>
            </div>
            <div className="row">
              <div className="col form-group">
                <input name="website" type="text" className="form-control" placeholder="Your Website" />
              </div>
            </div>
            <div className="row">
              <div className="col form-group">
                <textarea name="comment" className="form-control" placeholder="Your Comment*"></textarea>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">Post Comment</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
