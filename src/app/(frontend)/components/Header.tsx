import Link from 'next/link'
import { getSettings } from '@/lib/settings'
import HeaderNav from './HeaderNav'

export default async function Header() {
  const settings = await getSettings()
  
  // Extract logo URL if it exists
  const logoUrl = settings?.logo && typeof settings.logo === 'object' && 'url' in settings.logo 
    ? settings.logo.url as string 
    : null
  
  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link href="/" className="logo d-flex align-items-center me-auto">
          {settings?.useLogo && logoUrl ? (
            <img 
              src={logoUrl} 
              alt={settings?.siteName || 'Learner'} 
              className="site-logo"
              style={{ 
                height: '60px', 
                maxHeight: '60px',
                width: 'auto', 
                objectFit: 'contain',
                display: 'block'
              }}
            />
          ) : (
            <h1 className="sitename">{settings?.siteName || 'Learner'}</h1>
          )}
        </Link>

        <HeaderNav />

        <Link className="btn-getstarted" href="/enroll">
          Enroll Now
        </Link>
      </div>
    </header>
  )
}
