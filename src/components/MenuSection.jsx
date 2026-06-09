import { Link } from 'react-router-dom'
import CoffeeCard from './CoffeeCard'
import { menuItems } from '../data/menuData'

// Show only the featured 4 items on homepage
const featured = menuItems.filter(i =>
  ['Dark Velvet Espresso', 'Honey Oat Latte', 'Midnight Cold Brew', 'Sunrise Pour Over'].includes(i.name)
)

export default function MenuSection({ onAddToCart }) {
  return (
    <section className="menu-section" id="menu">
      <div className="container">
        <div className="section-header reveal visible">
          <p className="section-eyebrow">Featured Menu</p>
          <h2 className="section-title">Crafted with <em>intention</em></h2>
          <p className="section-sub">
            Each drink is sourced from small-batch roasters and prepared by our in-house baristas.
          </p>
        </div>

        <div className="menu-grid">
          {featured.map((item, i) => (
            <CoffeeCard
              key={item.id}
              item={item}
              onAddToCart={onAddToCart}
              delay={i * 80}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/menu" className="btn-ghost">View Full Menu →</Link>
        </div>
      </div>
    </section>
  )
}