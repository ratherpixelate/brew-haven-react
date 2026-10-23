import { Link } from 'react-router-dom'
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Clock } from 'lucide-react'
import { useCart } from '../context/cartContext'
import CoffeeCard from '../components/CoffeeCard'
import { menuItems } from '../data/menuData'

export default function Cart({ cart: propCart, onRemove, onUpdateQty }) {
  const context = useCart()
  const cart = propCart || context.cart
  const updateQty = onUpdateQty || context.updateQty
  const removeFromCart = onRemove || context.removeFromCart
  const setIsCheckoutOpen = context.setIsCheckoutOpen

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const tax = Math.round(subtotal * 0.05)
  const grandTotal = subtotal + tax
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0)

  const recommendedItems = menuItems.filter(i =>
    ['Honey Oat Latte', 'Almond Croissant', 'Midnight Cold Brew'].includes(i.name)
  )

  return (
    <main>
      <div className="page-hero" style={{ paddingBottom: '2.5rem' }}>
        <p className="page-hero-eyebrow reveal visible">Review your selection</p>
        <h1 className="page-hero-title reveal visible">Your <em>Bag</em></h1>
        <p className="page-hero-sub reveal visible">
          {cart.length === 0
            ? 'Nothing in your bag yet.'
            : `${itemCount} item${itemCount > 1 ? 's' : ''} prepared to order.`}
        </p>
      </div>

      <section className="form-section" style={{ paddingTop: '0.5rem' }}>
        <div className="container">
          {cart.length === 0 ? (
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <div className="cart-items-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--gold-dim)',
                    color: 'var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}
                >
                  <ShoppingBag size={28} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  Your bag is empty
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', maxWidth: '400px', margin: '0 auto 1.75rem' }}>
                  Freshly ground single-origin coffees and artisanal pastries await.
                </p>
                <Link to="/menu" className="btn-primary">
                  Explore Menu
                </Link>
              </div>

              <div style={{ marginTop: '3.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1.25rem', textAlign: 'center' }}>
                  Popular Recommendations
                </h3>
                <div className="menu-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                  {recommendedItems.map(item => (
                    <CoffeeCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="cart-grid-layout">
              <div className="cart-items-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
                    Items ({itemCount})
                  </h2>
                  <Link to="/menu" style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>
                    + Add more items
                  </Link>
                </div>

                <div>
                  {cart.map(item => {
                    const itemKey = item.cartItemId || item.id
                    return (
                      <div key={itemKey} className="cart-line-item">
                        {item.img ? (
                          <img
                            src={`${import.meta.env.BASE_URL}assets/images/${item.img}.png`}
                            alt={item.name}
                            className="cart-line-img"
                          />
                        ) : (
                          <div className="cart-line-placeholder">
                            <ShoppingBag size={24} />
                          </div>
                        )}

                        <div>
                          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                            {item.name}
                          </p>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                            ₹{item.price} each {item.customizations?.milk && `· ${item.customizations.milk} milk`}
                          </p>
                        </div>

                        <div className="drawer-qty">
                          <button
                            className="drawer-qty-btn"
                            onClick={() => updateQty(itemKey, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="drawer-qty-val" style={{ minWidth: '30px' }}>
                            {item.qty}
                          </span>
                          <button
                            className="drawer-qty-btn"
                            onClick={() => updateQty(itemKey, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', minWidth: '60px', textAlign: 'right' }}>
                          ₹{item.price * item.qty}
                        </span>

                        <button
                          onClick={() => removeFromCart(itemKey)}
                          aria-label={`Remove ${item.name}`}
                          style={{
                            background: 'none',
                            color: 'var(--text-muted)',
                            padding: '6px',
                            cursor: 'pointer',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = '#e05252'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="cart-summary-card">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                  Order Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Items Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Estimated GST (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Packaging & Prep</span>
                    <span style={{ color: '#4ac864' }}>Complimentary</span>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0.5rem 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.15rem' }}>
                    <span>Grand Total</span>
                    <span style={{ color: 'var(--gold)' }}>₹{grandTotal}</span>
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    className="btn-primary full-w"
                    onClick={() => setIsCheckoutOpen(true)}
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </button>
                  <Link to="/reservation" className="btn-ghost full-w" style={{ textAlign: 'center' }}>
                    Book Table with Order
                  </Link>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={14} color="var(--gold)" />
                    <span>Prepared fresh upon arrival or pickup</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={14} color="var(--gold)" />
                    <span>Pay at counter or online confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
