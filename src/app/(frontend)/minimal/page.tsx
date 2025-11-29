export default function MinimalPage() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4">Welcome to Learner</h1>
          <p className="lead">Transform Your Future with Expert-Led Online Courses</p>
          
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <i className="bi bi-code-slash fs-1 text-primary"></i>
                  <h5 className="card-title mt-3">Web Development</h5>
                  <p className="card-text">Learn modern web technologies</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <i className="bi bi-palette fs-1 text-success"></i>
                  <h5 className="card-title mt-3">UI/UX Design</h5>
                  <p className="card-text">Master design principles</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <i className="bi bi-graph-up fs-1 text-warning"></i>
                  <h5 className="card-title mt-3">Digital Marketing</h5>
                  <p className="card-text">Grow your online presence</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <a href="/admin" className="btn btn-primary me-3">Admin Panel</a>
            <a href="/" className="btn btn-outline-secondary">Full Homepage</a>
          </div>
        </div>
      </div>
    </div>
  )
}
