import React from 'react'

export default function MinimalLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <title>Learner - Minimal Test</title>
        {/* Only Bootstrap CSS - no JS */}
        <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
      </head>
      <body>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">Learner</a>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-dark text-white text-center py-3">
          <p>&copy; 2024 Learner. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
