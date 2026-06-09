import { useState } from 'react'
import CoffeeCard from '../components/CoffeeCard'
import { menuItems, categories, categoryTitles } from '../data/menuData'

export default function Menu({ onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState('all')

  // Get unique categories that have items
  const visibleCategories = activeFilter === 'all'
    ? [...new Set(menuItems.map(i => i.category))]
    : [activeFilter]

  return (
    <main>
      <div className="page-hero">
        <p className="page-hero-eyebrow reveal visible">What we brew</p>
        <h1 className="page-hero-title reveal visible">Our <em>Menu</em></h1>
        <p className="page-hero-sub reveal visible">Sourced from small farms, roasted in-house, made for you.</p>
      </div>

      <section className="menu-page-section">
        <div className="container">

          {/* Filter bar */}
          <div className="menu-filter-bar">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`filter-btn${activeFilter === cat.key ? ' active' : ''}`}
                onClick={() => setActiveFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu categories */}
          {visibleCategories.map(cat => {
            const items = menuItems.filter(i => i.category === cat)
            return (
              <div key={cat} className="menu-category">
                <h2 className="menu-category-title">{categoryTitles[cat]}</h2>
                <div className="menu-full-grid">
                  {items.map((item, i) => (
                    <CoffeeCard
                      key={item.id}
                      item={item}
                      onAddToCart={onAddToCart}
                      delay={(i % 3) * 80}
                    />
                  ))}
                </div>
              </div>
            )
          })}

        </div>
      </section>
    </main>
  )
}