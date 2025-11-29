import * as React from 'react'
import Link from 'next/link'
import { getPageContent } from '../../../lib/payload'

export default async function CMSPricingPage() {
  try {
    const pricingPageContent = await getPageContent('pricing')
    
    if (!pricingPageContent || pricingPageContent.length === 0) {
      return (
        <div className="container py-5">
          <div className="text-center">
            <h2>Pricing Plans</h2>
            <p>Content is being loaded from CMS. Please add content through the admin panel.</p>
            <Link href="/admin" className="btn btn-primary">Go to Admin Panel</Link>
          </div>
        </div>
      )
    }

    const pageTitleSection = pricingPageContent.find((section: any) => section.sectionType === 'page-title')
    const pricingSection = pricingPageContent.find((section: any) => section.sectionType === 'pricing-section')
    
    return (
      <>
        {/* Page Title */}
        <div className="page-title light-background">
          <div className="container d-lg-flex justify-content-between align-items-center">
            <h1 className="mb-2 mb-lg-0">
              {pageTitleSection?.pageTitle?.title || 'Pricing'}
            </h1>
            <nav className="breadcrumbs">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li className="current">Pricing</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Pricing Section */}
        <section id="pricing" className="pricing section">
          <div className="container pricing-toggle-container" data-aos="fade-up" data-aos-delay="100">

            {/* Pricing Toggle */}
            {pricingSection && pricingSection.pricingSection && (
              <>
                <div className="pricing-toggle d-flex align-items-center justify-content-center text-center mb-5">
                  <span className="monthly active">
                    {pricingSection.pricingSection.toggleLabels?.monthlyLabel || 'Monthly'}
                  </span>
                  <div className="form-check form-switch d-inline-block mx-3">
                    <input className="form-check-input" type="checkbox" id="pricingSwitch" />
                    <label className="form-check-label" htmlFor="pricingSwitch"></label>
                  </div>
                  <span className="yearly">
                    {pricingSection.pricingSection.toggleLabels?.yearlyLabel || 'Yearly'}{' '}
                    {pricingSection.pricingSection.toggleLabels?.yearlyBadge && (
                      <span className="badge">{pricingSection.pricingSection.toggleLabels.yearlyBadge}</span>
                    )}
                  </span>
                </div>

                {/* Pricing Plans */}
                <div className="row gy-4 justify-content-center">
                  {pricingSection.pricingSection.pricingPlans && pricingSection.pricingSection.pricingPlans.map((plan: any, index: number) => (
                    <div key={index} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={100 + (index * 100)}>
                      <div className={`pricing-item ${plan.isPopular ? 'popular' : ''}`}>
                        {plan.isPopular && plan.popularBadge && (
                          <div className="popular-badge">{plan.popularBadge}</div>
                        )}
                        
                        <div className="pricing-header">
                          <h6 className="pricing-category">{plan.planName}</h6>
                          <div className="price-wrap">
                            {plan.priceType === 'free' ? (
                              <h2 className="price">Free</h2>
                            ) : plan.priceType === 'custom' ? (
                              <h2 className="price">Custom</h2>
                            ) : plan.priceType === 'monthly-yearly' ? (
                              <>
                                <div className="price monthly">
                                  <sup>$</sup>{plan.monthlyPrice}<span>/m</span>
                                </div>
                                <div className="price yearly">
                                  <sup>$</sup>{plan.yearlyPrice}<span>/m</span>
                                </div>
                              </>
                            ) : null}
                          </div>
                          <p className="pricing-description">{plan.description}</p>
                        </div>

                        <div className="pricing-cta">
                          <a href={plan.ctaLink} className="btn btn-primary w-100">
                            {plan.ctaText}
                          </a>
                        </div>

                        <div className="pricing-features">
                          <h6>{plan.featuresHeading}</h6>
                          <ul className="feature-list">
                            {plan.features && plan.features.map((feature: any, featureIndex: number) => (
                              <li key={featureIndex}>
                                <i className="bi bi-check"></i>{' '}
                                {feature.isHighlight ? (
                                  <span className="feature-highlight">{feature.text}</span>
                                ) : (
                                  feature.text
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </section>

        {/* Fallback when no content */}
        {!pricingSection && (
          <div className="container py-5">
            <div className="text-center">
              <h2>Pricing Plans</h2>
              <p>Please add pricing plans through the admin panel.</p>
              <Link href="/admin" className="btn btn-primary">Go to Admin Panel</Link>
            </div>
          </div>
        )}
      </>
    )
  } catch (error) {
    console.error('Error fetching pricing page content:', error)
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Pricing Plans</h2>
          <p>Content is being loaded. Please check the admin panel.</p>
          <Link href="/admin" className="btn btn-primary">Go to Admin Panel</Link>
        </div>
      </div>
    )
  }
}