import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useCart } from '../context/cartContext'

export default function Navbar({ cartCount: propCartCount }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const { toggleTheme } = useTheme()
  const { cartCount: ctxCartCount, setIsDrawerOpen } = useCart()
  const cartCount = propCartCount !== undefined ? propCartCount : ctxCartCount

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && mobileOpen) {
        closeMobile()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  function closeMobile() {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  function toggleMobile() {
    setMobileOpen(prev => {
      const next = !prev
      document.body.style.overflow = next ? 'hidden' : ''
      return next
    })
  }

  function handleAnchorLink(e, hash) {
    e.preventDefault()
    closeMobile()

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
      setTimeout(scrollToHash, 100)
    }
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={closeMobile}>
            <span className="logo-text">Brew Haven</span>
          </Link>

          <ul className="nav-links">
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                Menu
              </NavLink>
            </li>
            <li>
              <a
                href="#about"
                className="nav-link"
                onClick={e => handleAnchorLink(e, '#about')}
              >
                Our Story
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="nav-link"
                onClick={e => handleAnchorLink(e, '#testimonials')}
              >
                Reviews
              </a>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                className="nav-link"
                onClick={() => setIsDrawerOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                aria-label={`Open bag with ${cartCount} items`}
              >
                <ShoppingBag size={15} style={{ marginRight: '5px' }} />
                <span>Bag</span>
                {cartCount > 0 && (
                  <span key={cartCount} className="cart-badge bump">
                    {cartCount}
                  </span>
                )}
              </button>
            </li>
            <li>
              <NavLink to="/reservation" className="nav-link nav-cta">
                Reserve a Seat
              </NavLink>
            </li>
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <svg className="icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="23" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg className="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
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

      <div
        className={`mobile-nav-backdrop${mobileOpen ? ' open' : ''}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`} aria-hidden={!mobileOpen}>
        <ul>
          <li>
            <NavLink to="/menu" className="mobile-nav-link" onClick={closeMobile}>
              Menu
            </NavLink>
          </li>
          <li>
            <a
              href="#about"
              className="mobile-nav-link"
              onClick={e => handleAnchorLink(e, '#about')}
            >
              Our Story
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="mobile-nav-link"
              onClick={e => handleAnchorLink(e, '#testimonials')}
            >
              Reviews
            </a>
          </li>
          <li>
            <NavLink to="/contact" className="mobile-nav-link" onClick={closeMobile}>
              Contact
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              className="mobile-nav-link"
              onClick={() => {
                closeMobile()
                setIsDrawerOpen(true)
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>Order Bag</span>
              {cartCount > 0 && (
                <span key={cartCount} className="cart-badge bump">
                  {cartCount}
                </span>
              )}
            </button>
          </li>
          <li>
            <NavLink
              to="/reservation"
              className="mobile-nav-link mobile-cta"
              onClick={closeMobile}
            >
              Reserve a Seat
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}
