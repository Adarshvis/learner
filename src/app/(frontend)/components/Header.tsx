import Link from 'next/link'
import { getSettings } from '@/lib/settings'
import HeaderNav from './HeaderNav'

export default async function Header() {
  const settings = await getSettings()
  
  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link href="/" className="logo d-flex align-items-center me-auto">
          {settings?.logo && typeof settings.logo === 'object' && 'url' in settings.logo ? (
            <img src={settings.logo.url as string} alt={settings?.siteName || 'Learner'} />
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
