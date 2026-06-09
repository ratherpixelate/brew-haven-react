import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import MenuSection from '../components/MenuSection'

const testimonials = [
  {
    id: 1,
    quote: "The pour over here is genuinely the best I've had in Kerala. The baristas actually know what they're doing.",
    name: 'Arjun Menon',
    title: 'Coffee Enthusiast',
    initials: 'AM',
  },
  {
    id: 2,
    quote: "Came for the cold brew, stayed for the atmosphere. Brew Haven has become my second office.",
    name: 'Sneha Pillai',
    title: 'Freelance Designer',
    initials: 'SP',
  },
  {
    id: 3,
    quote: "The Honey Oat Latte is something else. I've tried replicating it at home — impossible. Just go here.",
    name: 'Rahul Nair',
    title: 'Regular Since 2019',
    initials: 'RN',
  },
]

const stats = [
  { num: '6+',  label: 'Years Brewing' },
  { num: '12',  label: 'Origin Farms'  },
  { num: '40+', label: 'Menu Items'    },
  { num: '★',   label: 'Top Rated'     },
]

export default function Home({ onAddToCart }) {
  return (
    <main>
      <HeroSection />

      {/* Divider */}
      <div className="section-divider" aria-hidden="true">
        <div className="divider-line"></div>
        <div className="divider-emblem">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 8h1a4 4 0 0 1 0 8h-1"/>
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
            <line x1="6" y1="2" x2="6" y2="4"/>
            <line x1="10" y1="2" x2="10" y2="4"/>
            <line x1="14" y1="2" x2="14" y2="4"/>
          </svg>
        </div>
        <div className="divider-line"></div>
      </div>

      {/* Featured Menu */}
      <MenuSection onAddToCart={onAddToCart} />

      {/* About */}
      <section className="about-section" id="about">
        <div className="container about-grid">

          {/* text — grid-column: 1 */}
          <div className="about-text">
            <div className="section-header reveal visible" style={{ textAlign: 'left' }}>
              <p className="section-eyebrow">Our Story</p>
              <h2 className="section-title">More than<br /><em>just coffee</em></h2>
            </div>
            <p className="reveal visible" style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              Brew Haven started in 2018 as a tiny corner café in Pattom. We wanted a place where
              people could slow down — really slow down — and savour something made with care.
            </p>
            <p className="reveal visible" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Today we source directly from small farms across Coorg, Chikmagalur, and East Africa,
              roasting in small batches to preserve what makes each bean special.
            </p>
          </div>

          {/* stats — grid-column: 2, inner 2×2 grid via CSS */}
          <div className="about-stats">
            {stats.map((s, i) => (
              <div key={i} className="stat-card reveal visible" style={{ '--delay': `${i * 80}ms` }}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <div className="section-header reveal visible">
            <p className="section-eyebrow">What People Say</p>
            <h2 className="section-title">Brewed with <em>love</em></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <blockquote key={t.id} className="testi-card reveal visible" style={{ '--delay': `${i * 80}ms` }}>
                <p className="testi-stars">★★★★★</p>
                <p className="testi-text">"{t.quote}"</p>
                <footer className="testi-author">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <p className="testi-name">{t.name}</p>
                    <p className="testi-role">{t.title}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band reveal visible">
        <div className="container cta-inner">
          <div className="cta-text">
            <h2>Ready for your<br /><em>next favourite cup?</em></h2>
            <p>Walk in anytime, or reserve your spot. We're open 7am – 10pm, every day.</p>
          </div>
          <div className="cta-actions">
            <Link to="/reservation" className="btn-primary large">Reserve a Seat</Link>
            <Link to="/menu" className="btn-ghost">Browse Menu</Link>
          </div>
        </div>
      </section>
    </main>
  )
}