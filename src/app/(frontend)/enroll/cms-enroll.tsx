'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function CMSEnrollPage() {
  const [pageData, setPageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    plan: '',
    paymentMethod: 'credit-card'
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/enroll')
        const data = await response.json()
        setPageData(data)
      } catch (err) {
        console.error('Failed to fetch enroll page data:', err)
        setError('Failed to load page content')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!loading) {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    }
  }, [loading])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Enrollment form submitted:', formData)
    alert('Enrollment submitted successfully! You will receive a confirmation email shortly.')
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error || !pageData) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-warning">
          <h4>Content Management System</h4>
          <p>Enroll page content is not configured yet.</p>
          <p>Please set up the content in the admin panel:</p>
          <Link href="/admin" className="btn btn-primary">
            Go to Admin Panel
          </Link>
        </div>
      </div>
    )
  }

  const { hero, courses, plans, features, testimonials } = pageData || {}

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="hero-section bg-gradient">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-up">
              <h1 className="hero-title">{hero?.title || 'Start Your Learning Journey'}</h1>
              <p className="hero-subtitle">{hero?.subtitle || 'Enroll in our courses and transform your career'}</p>
              <div className="hero-features">
                <div className="feature-item">
                  <i className="bi bi-check-circle"></i>
                  <span>Lifetime Access</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-check-circle"></i>
                  <span>Certificate of Completion</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-check-circle"></i>
                  <span>Expert Support</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              {hero?.image && (
                <Image
                  src={hero.image.url}
                  alt={hero.image.alt || 'Enroll Now'}
                  width={600}
                  height={400}
                  className="img-fluid"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enrollment-form" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="enrollment-card" data-aos="fade-up">
                <div className="card-header text-center">
                  <h2>Complete Your Enrollment</h2>
                  <p>Fill out the form below to get started with your chosen course</p>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    {/* Personal Information */}
                    <div className="form-section">
                      <h5 className="section-title">Personal Information</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              className="form-control"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="lastName">Last Name *</label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              className="form-control"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-control"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              className="form-control"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Selection */}
                    <div className="form-section">
                      <h5 className="section-title">Course & Plan Selection</h5>
                      <div className="form-group">
                        <label htmlFor="course">Select Course *</label>
                        <select
                          id="course"
                          name="course"
                          className="form-control"
                          value={formData.course}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Choose a course...</option>
                          {courses?.list?.map((course: any, index: number) => (
                            <option key={index} value={course.id || course.title}>
                              {course.title} - ${course.price}
                            </option>
                          )) || [
                            <option key="default-1" value="web-development">Web Development - $299</option>,
                            <option key="default-2" value="data-science">Data Science - $399</option>,
                            <option key="default-3" value="digital-marketing">Digital Marketing - $199</option>
                          ]}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="plan">Payment Plan *</label>
                        <select
                          id="plan"
                          name="plan"
                          className="form-control"
                          value={formData.plan}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Choose payment plan...</option>
                          {plans?.list?.map((plan: any, index: number) => (
                            <option key={index} value={plan.id || plan.name}>
                              {plan.name} - {plan.description}
                            </option>
                          )) || [
                            <option key="one-time" value="one-time">One-time Payment - Full access immediately</option>,
                            <option key="monthly" value="monthly">Monthly Plan - Spread over 3 months</option>,
                            <option key="installment" value="installment">Installment Plan - Pay in 2 parts</option>
                          ]}
                        </select>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="form-section">
                      <h5 className="section-title">Payment Information</h5>
                      <div className="payment-methods">
                        <div className="payment-option">
                          <input
                            type="radio"
                            id="credit-card"
                            name="paymentMethod"
                            value="credit-card"
                            checked={formData.paymentMethod === 'credit-card'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="credit-card">
                            <i className="bi bi-credit-card"></i>
                            Credit/Debit Card
                          </label>
                        </div>
                        <div className="payment-option">
                          <input
                            type="radio"
                            id="paypal"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="paypal">
                            <i className="bi bi-paypal"></i>
                            PayPal
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Terms & Submit */}
                    <div className="form-section">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="terms"
                          className="form-check-input"
                          required
                        />
                        <label htmlFor="terms" className="form-check-label">
                          I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link> *
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary btn-lg w-100">
                        Complete Enrollment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {features && (
        <section id="features" className="features section-padding bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center" data-aos="fade-up">
                <h2>{features.title || 'Why Choose Us'}</h2>
                <p>{features.description || 'Benefits of enrolling with us'}</p>
              </div>
            </div>
            <div className="row">
              {features.list?.map((feature: any, index: number) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="feature-item text-center">
                    <i className={`bi ${feature.icon || 'bi-check-circle'} feature-icon`}></i>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              )) || null}
            </div>
          </div>
        </section>
      )}
    </>
  )
}