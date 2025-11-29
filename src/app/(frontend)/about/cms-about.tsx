import * as React from 'react'
import Link from 'next/link'
import { getPageContent } from '../../../lib/payload'

export default async function CMSAboutPage() {
  try {
    const aboutPageContent = await getPageContent('about')
    
    if (!aboutPageContent || aboutPageContent.length === 0) {
      return (
        <div className="container py-5">
          <div className="text-center">
            <h2>About Us</h2>
            <p>Content is being loaded from CMS. Please add content through the admin panel.</p>
            <Link href="/admin" className="btn btn-primary">Go to Admin Panel</Link>
          </div>
        </div>
      )
    }

    // Find different sections using correct section types
    const pageTitleSection = aboutPageContent.find((section: any) => section.sectionType === 'page-title')
    const aboutMainSection = aboutPageContent.find((section: any) => section.sectionType === 'about-main')
    const missionVisionSection = aboutPageContent.find((section: any) => section.sectionType === 'mission-vision-values')
    const whyChooseUsSection = aboutPageContent.find((section: any) => section.sectionType === 'why-choose-us')
    
    return (
      <>
        {/* Page Title */}
        <div className="page-title light-background">
          <div className="container d-lg-flex justify-content-between align-items-center">
            <h1 className="mb-2 mb-lg-0">
              {pageTitleSection?.pageTitle?.title || 'About'}
            </h1>
            <nav className="breadcrumbs">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li className="current">About</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* About Main Section */}
        {aboutMainSection && aboutMainSection.aboutMain && (
          <section id="about" className="about section">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  {aboutMainSection.aboutMain.image && (
                    <img 
                      src={typeof aboutMainSection.aboutMain.image === 'object' ? aboutMainSection.aboutMain.image.url : aboutMainSection.aboutMain.image}
                      alt={aboutMainSection.aboutMain.title} 
                      className="img-fluid rounded-4" 
                    />
                  )}
                </div>
                <div className="col-lg-6">
                  <div className="about-content">
                    {aboutMainSection.aboutMain.subtitle && (
                      <span className="subtitle">{aboutMainSection.aboutMain.subtitle}</span>
                    )}
                    <h2>{aboutMainSection.aboutMain.title}</h2>
                    <p>{aboutMainSection.aboutMain.description}</p>
                    
                    {/* Stats */}
                    {aboutMainSection.aboutMain.stats && (
                      <div className="stats-row">
                        {aboutMainSection.aboutMain.stats.map((stat: any, index: number) => (
                          <div key={index} className="stats-item">
                            <span className="count">{stat.count}</span>
                            <p>{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mission Vision Values - Part of About Section */}
              {missionVisionSection && missionVisionSection.missionVisionValues && (
                <div className="row mt-5 pt-4">
                  {missionVisionSection.missionVisionValues.cards && missionVisionSection.missionVisionValues.cards.map((card: any, index: number) => (
                    <div key={index} className="col-lg-4" data-aos="fade-up" data-aos-delay={200 + (index * 100)}>
                      <div className="mission-card">
                        <div className="icon-box">
                          <i className={`bi ${card.icon}`}></i>
                        </div>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Why Choose Us Section - Part of About Section */}
              {whyChooseUsSection && whyChooseUsSection.whyChooseUs && (
                <div className="row mt-5 pt-3 align-items-center">
                  <div className="col-lg-6 order-lg-2" data-aos="fade-up" data-aos-delay="300">
                    <div className="achievements">
                      <span className="subtitle">{whyChooseUsSection.whyChooseUs.subtitle}</span>
                      <h2>{whyChooseUsSection.whyChooseUs.title}</h2>
                      <p>{whyChooseUsSection.whyChooseUs.description}</p>
                      
                      {/* Features List */}
                      {whyChooseUsSection.whyChooseUs.features && (
                        <ul className="achievements-list">
                          {whyChooseUsSection.whyChooseUs.features.map((feature: any, index: number) => (
                            <li key={index}>
                              <i className="bi bi-check-circle-fill"></i> {feature.text}
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {/* CTA Button */}
                      <a href={whyChooseUsSection.whyChooseUs.buttonLink} className="btn-explore">
                        {whyChooseUsSection.whyChooseUs.buttonText} <i className="bi bi-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-6 order-lg-1" data-aos="fade-up" data-aos-delay="200">
                    {/* Gallery Images */}
                    {whyChooseUsSection.whyChooseUs.galleryImages && (
                      <div className="about-gallery">
                        <div className="row g-3">
                          {whyChooseUsSection.whyChooseUs.galleryImages.slice(0, 2).map((item: any, index: number) => (
                            <div key={index} className="col-6">
                              <img 
                                src={typeof item.image === 'object' ? item.image.url : item.image}
                                alt={item.alt}
                                className="img-fluid rounded-3"
                              />
                            </div>
                          ))}
                          {whyChooseUsSection.whyChooseUs.galleryImages[2] && (
                            <div className="col-12 mt-3">
                              <img 
                                src={typeof whyChooseUsSection.whyChooseUs.galleryImages[2].image === 'object' 
                                  ? whyChooseUsSection.whyChooseUs.galleryImages[2].image.url 
                                  : whyChooseUsSection.whyChooseUs.galleryImages[2].image}
                                alt={whyChooseUsSection.whyChooseUs.galleryImages[2].alt}
                                className="img-fluid rounded-3"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </section>
        )}

        {/* Fallback when no content */}
        {!aboutMainSection && !missionVisionSection && !whyChooseUsSection && (
          <div className="container py-5">
            <div className="text-center">
              <h2>About Us</h2>
              <p>Please add content to your about page through the admin panel.</p>
              <Link href="/admin" className="btn btn-primary">Go to Admin Panel</Link>
            </div>
          </div>
        )}
      </>
    )
  } catch (error) {
    console.error('Error fetching about page content:', error)
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>About Us</h2>
          <p>Content is being loaded. Please check the admin panel to add content.</p>
          <Link href="/admin" className="btn btn-primary">Go to Admin Panel</Link>
        </div>
      </div>
    )
  }
}