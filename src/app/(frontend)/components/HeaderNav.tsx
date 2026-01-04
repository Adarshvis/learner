'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface PageStatus {
  about: boolean
  courses: boolean
  instructors: boolean
  news: boolean
  blog: boolean
  contact: boolean
  enroll: boolean
}

export default function HeaderNav() {
  const pathname = usePathname()
  const [pageStatus, setPageStatus] = useState<PageStatus>({
    about: true,
    courses: true,
    instructors: true,
    news: true,
    blog: true,
    contact: true,
    enroll: true,
  })

  useEffect(() => {
    fetch('/api/page-status')
      .then((res) => res.json())
      .then((data) => setPageStatus(data))
      .catch((error) => console.error('Error fetching page status:', error))
  }, [])

  return (
    <nav id="navmenu" className="navmenu">
      <ul>
        <li>
          <Link href="/" className={pathname === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>
        {pageStatus.about && (
          <li>
            <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
              About
            </Link>
          </li>
        )}
        {pageStatus.courses && (
          <li>
            <Link href="/courses" className={pathname === '/courses' ? 'active' : ''}>
              Courses
            </Link>
          </li>
        )}
        {pageStatus.instructors && (
          <li>
            <Link href="/instructors" className={pathname === '/instructors' ? 'active' : ''}>
              Instructors
            </Link>
          </li>
        )}
        {pageStatus.news && (
          <li>
            <Link href="/news" className={pathname === '/news' ? 'active' : ''}>
              News
            </Link>
          </li>
        )}
        {pageStatus.blog && (
          <li>
            <Link href="/blog" className={pathname === '/blog' ? 'active' : ''}>
              Blog
            </Link>
          </li>
        )}
        <li className="dropdown">
          <a href="#">
            <span>More Pages</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
          </a>
          <ul>
            <li>
              <Link href="/course-details">Course Details</Link>
            </li>
            <li>
              <Link href="/instructor-profile">Instructor Profile</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/blog-details">Blog Details</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/404">404</Link>
            </li>
          </ul>
        </li>

        <li className="dropdown">
          <a href="#">
            <span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
          </a>
          <ul>
            <li>
              <a href="#">Dropdown 1</a>
            </li>
            <li className="dropdown">
              <a href="#">
                <span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
              </a>
              <ul>
                <li>
                  <a href="#">Deep Dropdown 1</a>
                </li>
                <li>
                  <a href="#">Deep Dropdown 2</a>
                </li>
                <li>
                  <a href="#">Deep Dropdown 3</a>
                </li>
                <li>
                  <a href="#">Deep Dropdown 4</a>
                </li>
                <li>
                  <a href="#">Deep Dropdown 5</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Dropdown 2</a>
            </li>
            <li>
              <a href="#">Dropdown 3</a>
            </li>
            <li>
              <a href="#">Dropdown 4</a>
            </li>
          </ul>
        </li>
        {pageStatus.contact && (
          <li>
            <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>
              Contact
            </Link>
          </li>
        )}
      </ul>
      <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
    </nav>
  )
}
