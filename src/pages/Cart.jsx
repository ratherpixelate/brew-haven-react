import { Link } from 'react-router-dom'

export default function Cart({ cart, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <main>
      <div className="page-hero">
        <p className="page-hero-eyebrow reveal visible">Your order</p>
        <h1 className="page-hero-title reveal visible">Your <em>Cart</em></h1>
        <p className="page-hero-sub reveal visible">
          {cart.length === 0 ? 'Nothing here yet.' : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart.`}
        </p>
      </div>

      <section className="form-section">
        <div className="container">
          {cart.length === 0 ? (
            <div className="form-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Your cart is empty. Head to the menu and add something!
              </p>
              <Link to="/menu" className="btn-primary">Browse Menu</Link>
            </div>
          ) : (
            <div className="form-card">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <div>
                      <p style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        ₹{item.price} × {item.qty}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        ₹{item.price * item.qty}
                      </span>
                      <button
                        onClick={() => onRemove(item.id)}
                        style={{
                          background: 'none',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                          padding: '0.3rem 0.7rem',
                          cursor: 'pointer',
                          color: 'var(--text-muted)',
                          fontSize: '0.8rem',
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem 0 0',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}>
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <Link to="/reservation" className="btn-primary">
                    Reserve a Table
                  </Link>
                  <Link to="/menu" className="btn-ghost">
                    Add More Items
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}