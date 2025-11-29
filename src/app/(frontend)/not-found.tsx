import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      {/* Page Title */}
      <div className="page-title light-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">404 - Page Not Found</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li className="current">404</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="not-found-page section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="not-found-content">
                <div className="error-illustration mb-4">
                  <h1 className="display-1 text-primary fw-bold">404</h1>
                </div>
                
                <h2 className="mb-3">Oops! Page Not Found</h2>
                <p className="lead mb-4 text-muted">
                  Sorry, the page you are looking for doesn't exist or has been moved.
                  But don't worry, you can find plenty of other things on our homepage.
                </p>
                
                <div className="not-found-actions">
                  <Link href="/" className="btn btn-primary me-3">
                    <i className="bi bi-house me-2"></i>
                    Go to Homepage
                  </Link>
                  <Link href="/courses" className="btn btn-outline-primary">
                    <i className="bi bi-book me-2"></i>
                    Browse Courses
                  </Link>
                </div>
                
                <div className="popular-links mt-5">
                  <h5 className="mb-3">Or visit these popular pages:</h5>
                  <div className="row g-3 justify-content-center">
                    <div className="col-auto">
                      <Link href="/about" className="btn btn-sm btn-light">
                        About Us
                      </Link>
                    </div>
                    <div className="col-auto">
                      <Link href="/instructors" className="btn btn-sm btn-light">
                        Instructors
                      </Link>
                    </div>
                    <div className="col-auto">
                      <Link href="/blog" className="btn btn-sm btn-light">
                        Blog
                      </Link>
                    </div>
                    <div className="col-auto">
                      <Link href="/contact" className="btn btn-sm btn-light">
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}