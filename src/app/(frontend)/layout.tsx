import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollHandler from './components/ScrollHandler'
import { getSettings } from '@/lib/settings'

export async function generateMetadata() {
  const settings = await getSettings()
  
  const faviconUrl = settings?.favicon && typeof settings.favicon === 'object' && 'url' in settings.favicon
    ? settings.favicon.url as string
    : null

  return {
    title: settings?.defaultMetaTitle || 'Learner - Online Learning Platform',
    description: settings?.defaultMetaDescription || 'Empowering learners worldwide with quality education and expert instructors.',
    icons: faviconUrl ? {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    } : undefined,
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />

        {/* Vendor CSS Files */}
        <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />

        {/* Main CSS File - This contains the template styling */}
        <link href="/assets/css/main.css" rel="stylesheet" />
        
        {/* Prevent horizontal scroll for full-width hero */}
        <style>{`
          body { overflow-x: hidden; }
          .main { overflow-x: hidden; }
        `}</style>
      </head>
      <body className="index-page">
        <ScrollHandler />
        <Header />
        <main className="main">{children}</main>
        <Footer />

        {/* Scroll Top */}
        <a
          href="#"
          id="scroll-top"
          className="scroll-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </a>

        {/* Essential JS for dropdowns and navigation */}
        <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  )
}
