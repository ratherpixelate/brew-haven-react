import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

export default function Navbar({ cartCount }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const toggleMobile = () => {
    setMobileOpen(prev => {
      document.body.style.overflow = prev ? '' : 'hidden'
      return !prev
    })
  }

  // Handles links like /#about and /#testimonials
  // If already on home, just scroll. Otherwise navigate to / then scroll.
  const handleAnchorLink = (e, hash) => {
    e.preventDefault()
    const scrollToHash = () => {
      const el = document.querySelector(hash)
      if (el) {
        const navH = 72
        const top = el.getBoundingClientRect().top + window.scrollY - navH - 16
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }

    if (location.pathname === '/') {
      scrollToHash()
    } else {
      navigate('/')
      // Wait for page to render before scrolling
      setTimeout(scrollToHash, 100)
    }
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <span className="logo-text">Brew Haven</span>
          </Link>

          <ul className="nav-links">
            <li><Link to="/menu" className="nav-link">Menu</Link></li>
            <li>
              <a href="#about" className="nav-link" onClick={e => handleAnchorLink(e, '#about')}>
                Our Story
              </a>
            </li>
            <li>
              <a href="#testimonials" className="nav-link" onClick={e => handleAnchorLink(e, '#testimonials')}>
                Reviews
              </a>
            </li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
            <li>
              <Link to="/cart" className="nav-link" style={{ position: 'relative' }}>
                Cart
                {cartCount > 0 && (
                  <span style={{
                    background: 'var(--gold)',
                    color: '#fff',
                    borderRadius: '50%',
                    fontSize: '0.65rem',
                    padding: '1px 5px',
                    marginLeft: '4px',
                    verticalAlign: 'super',
                  }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            <li><Link to="/reservation" className="nav-link nav-cta">Reserve a Seat</Link></li>
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <svg className="icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              <svg className="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </button>
            <button
              className={`hamburger${mobileOpen ? ' active' : ''}`}
              onClick={toggleMobile}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`} aria-hidden={!mobileOpen}>
        <ul>
          <li><Link to="/menu" className="mobile-nav-link">Menu</Link></li>
          <li>
            <a href="#about" className="mobile-nav-link" onClick={e => handleAnchorLink(e, '#about')}>
              Our Story
            </a>
          </li>
          <li>
            <a href="#testimonials" className="mobile-nav-link" onClick={e => handleAnchorLink(e, '#testimonials')}>
              Reviews
            </a>
          </li>
          <li><Link to="/contact" className="mobile-nav-link">Contact</Link></li>
          <li><Link to="/cart" className="mobile-nav-link">Cart {cartCount > 0 && `(${cartCount})`}</Link></li>
          <li><Link to="/reservation" className="mobile-nav-link mobile-cta">Reserve a Seat</Link></li>
        </ul>
      </div>
    </>
  )
}