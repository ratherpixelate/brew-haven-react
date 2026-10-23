import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/cartContext'

export default function CartDrawer() {
  const {
    cart,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQty,
    removeFromCart,
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
  } = useCart()

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false)
      }
    }
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDrawerOpen, setIsDrawerOpen])

  const tax = Math.round(cartTotal * 0.05)
  const finalTotal = cartTotal + tax

  return (
    <>
      <div
        className={`drawer-backdrop${isDrawerOpen ? ' open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer${isDrawerOpen ? ' open' : ''}`}
        aria-label="Your Bag"
        aria-modal="true"
        role="dialog"
      >
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--gold)" />
            <h2 className="drawer-title">Your Order ({cartCount})</h2>
          </div>
          <button
            className="drawer-close"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close bag"
          >
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--gold-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  color: 'var(--gold)',
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                Your bag is empty
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Explore our signature roasts and freshly prepared bakes.
              </p>
              <Link
                to="/menu"
                className="btn-primary"
                onClick={() => setIsDrawerOpen(false)}
              >
                Explore Menu
              </Link>
            </div>
          ) : (
            cart.map(item => {
              const itemKey = item.cartItemId || item.id
              return (
                <div key={itemKey} className="drawer-item">
                  {item.img ? (
                    <img
                      src={`${import.meta.env.BASE_URL}assets/images/${item.img}.png`}
                      alt={item.name}
                      className="drawer-item-img"
                    />
                  ) : (
                    <div className="drawer-item-placeholder">
                      ☕
                    </div>
                  )}

                  <div className="drawer-item-info">
                    <span className="drawer-item-name">{item.name}</span>
                    {item.customizations?.milk && (
                      <span className="drawer-item-custom">
                        {item.customizations.milk} milk
                      </span>
                    )}
                    <span className="drawer-item-price">
                      ₹{item.price * item.qty}
                    </span>
                  </div>

                  <div className="drawer-item-actions">
                    <div className="drawer-qty">
                      <button
                        className="drawer-qty-btn"
                        onClick={() => updateQty(itemKey, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="drawer-qty-val">{item.qty}</span>
                      <button
                        className="drawer-qty-btn"
                        onClick={() => updateQty(itemKey, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(itemKey)}
                      aria-label={`Remove ${item.name}`}
                      style={{
                        color: 'var(--text-muted)',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#e05252'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="drawer-summary-row">
              <span>Estimated GST (5%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="drawer-summary-row drawer-summary-total">
              <span>Total</span>
              <span className="drawer-total-val">₹{finalTotal}</span>
            </div>

            <div className="drawer-actions">
              <button
                className="btn-primary full-w"
                onClick={() => {
                  setIsDrawerOpen(false)
                  setIsCheckoutOpen(true)
                }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
              <Link
                to="/cart"
                className="btn-ghost full-w"
                onClick={() => setIsDrawerOpen(false)}
                style={{ textAlign: 'center' }}
              >
                View Full Bag
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
