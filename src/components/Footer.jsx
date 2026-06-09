import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="nav-logo">
            <span className="logo-text">Brew Haven</span>
          </Link>
          <p className="footer-tagline">Where every cup tells a story.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter / X" target="_blank" rel="noopener">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservation">Reservations</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Hours</h4>
          <ul className="hours-list">
            <li><span>Mon – Fri</span><span>7:00 – 22:00</span></li>
            <li><span>Saturday</span><span>8:00 – 22:00</span></li>
            <li><span>Sunday</span><span>9:00 – 21:00</span></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Find Us</h4>
          <address>
            12 Coffee Lane,<br />
            Pattom, Thiruvananthapuram<br />
            Kerala – 695004<br />
            <a href="tel:+914712345678">+91 471 234 5678</a>
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Brew Haven. All rights reserved.</p>
        <p>Crafted with care &amp; caffeine.</p>
      </div>
    </footer>
  )
}