import { useState, useMemo } from 'react'
import { Search, X, Sparkles } from 'lucide-react'
import CoffeeCard from '../components/CoffeeCard'
import { menuItems, categories, categoryTitles } from '../data/menuData'

export default function Menu({ onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = activeFilter === 'all' || item.category === activeFilter
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.tag.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeFilter, searchQuery])

  const visibleCategories = useMemo(() => {
    if (activeFilter !== 'all') return [activeFilter]
    return [...new Set(filteredItems.map(i => i.category))]
  }, [activeFilter, filteredItems])

  return (
    <main>
      <div className="page-hero">
        <p className="page-hero-eyebrow reveal visible">What we brew</p>
        <h1 className="page-hero-title reveal visible">Our <em>Menu</em></h1>
        <p className="page-hero-sub reveal visible">
          Sourced from small farms, roasted in-house, made for you.
        </p>
      </div>

      <section className="menu-page-section">
        <div className="container">
          <div className="menu-controls">
            <div className="menu-search-wrap">
              <span className="menu-search-icon">
                <Search size={18} />
              </span>
              <input
                type="text"
                className="menu-search-input"
                placeholder="Search brews, cold drinks, pastries…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="menu-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

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
          </div>

          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--gold-dim)',
                  color: 'var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}
              >
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '0.4rem' }}>
                No brews found
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                We couldn't find anything matching "{searchQuery}".
              </p>
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilter('all')
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            visibleCategories.map(cat => {
              const items = filteredItems.filter(i => i.category === cat)
              if (items.length === 0) return null

              return (
                <div key={cat} className="menu-category">
                  <h2 className="menu-category-title">{categoryTitles[cat] || cat}</h2>
                  <div className="menu-full-grid">
                    {items.map((item, i) => (
                      <CoffeeCard
                        key={item.id}
                        item={item}
                        onAddToCart={onAddToCart}
                        delay={(i % 3) * 60}
                      />
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>
    </main>
  )
}
