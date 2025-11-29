import Link from 'next/link'
import { getSettings } from '@/lib/settings'

export default async function Footer() {
  const settings = await getSettings()
  
  return (
    <footer id="footer" className="footer accent-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-about">
            <Link href="/" className="logo d-flex align-items-center">
              <span className="sitename">{(settings?.siteName && typeof settings.siteName === 'string') ? settings.siteName : 'Learner'}</span>
            </Link>
            <p>{(settings?.footerText && typeof settings.footerText === 'string') ? settings.footerText : 'Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.'}</p>
            <div className="social-links d-flex mt-4">
              {settings?.socialLinks?.twitter && typeof settings.socialLinks.twitter === 'string' && (
                <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-twitter-x"></i>
                </a>
              )}
              {settings?.socialLinks?.facebook && typeof settings.socialLinks.facebook === 'string' && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-facebook"></i>
                </a>
              )}
              {settings?.socialLinks?.instagram && typeof settings.socialLinks.instagram === 'string' && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram"></i>
                </a>
              )}
              {settings?.socialLinks?.linkedin && typeof settings.socialLinks.linkedin === 'string' && (
                <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-linkedin"></i>
                </a>
              )}
              {settings?.socialLinks?.youtube && typeof settings.socialLinks.youtube === 'string' && (
                <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-youtube"></i>
                </a>
              )}
              {(!settings?.socialLinks || (!settings.socialLinks.twitter && !settings.socialLinks.facebook && !settings.socialLinks.instagram && !settings.socialLinks.linkedin && !settings.socialLinks.youtube)) && (
                <>
                  <a href="#"><i className="bi bi-twitter-x"></i></a>
                  <a href="#"><i className="bi bi-facebook"></i></a>
                  <a href="#"><i className="bi bi-instagram"></i></a>
                  <a href="#"><i className="bi bi-linkedin"></i></a>
                </>
              )}
            </div>
          </div>

          {settings?.footerLinks && Array.isArray(settings.footerLinks) && settings.footerLinks.length > 0 ? (
            settings.footerLinks.map((section: any, index: number) => (
              <div key={index} className="col-lg-2 col-6 footer-links">
                <h4>{section.title}</h4>
                <ul>
                  {section.links && Array.isArray(section.links) && section.links.map((link: any, linkIndex: number) => (
                    <li key={linkIndex}>
                      <Link href={link.url || '#'}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <>
              <div className="col-lg-2 col-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About us</Link></li>
                  <li><Link href="/courses">Courses</Link></li>
                  <li><Link href="/terms">Terms of service</Link></li>
                  <li><Link href="/privacy">Privacy policy</Link></li>
                </ul>
              </div>

              <div className="col-lg-2 col-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li><a href="#">Web Development</a></li>
                  <li><a href="#">Data Science</a></li>
                  <li><a href="#">Digital Marketing</a></li>
                  <li><a href="#">Design</a></li>
                  <li><a href="#">Business</a></li>
                </ul>
              </div>
            </>
          )}

          <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            {settings?.address && typeof settings.address === 'object' ? (
              <>
                {settings.address.street && typeof settings.address.street === 'string' && <p>{settings.address.street}</p>}
                {settings.address.city && settings.address.state && settings.address.zipCode && (
                  <p>
                    {typeof settings.address.city === 'string' ? settings.address.city : ''},{' '}
                    {typeof settings.address.state === 'string' ? settings.address.state : ''}{' '}
                    {typeof settings.address.zipCode === 'string' ? settings.address.zipCode : ''}
                  </p>
                )}
                {settings.address.country && typeof settings.address.country === 'string' && <p>{settings.address.country}</p>}
              </>
            ) : (
              <>
                <p>A108 Adam Street</p>
                <p>New York, NY 535022</p>
                <p>United States</p>
              </>
            )}
            <p className="mt-4">
              <strong>Phone:</strong> <span>{(settings?.contactPhone && typeof settings.contactPhone === 'string') ? settings.contactPhone : '+1 5589 55488 55'}</span>
            </p>
            <p>
              <strong>Email:</strong> <span>{(settings?.contactEmail && typeof settings.contactEmail === 'string') ? settings.contactEmail : 'info@example.com'}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          {settings?.copyrightText && typeof settings.copyrightText === 'string' ? (
            settings.copyrightText
          ) : (
            <>
              © <span>Copyright</span> <strong className="px-1 sitename">{settings?.siteName || 'Learner'}</strong>{' '}
              <span>All Rights Reserved</span>
            </>
          )}
        </p>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </div>
    </footer>
  )
}

