import { Link } from 'react-router-dom'

export default function Cart({ cart, onRemove, onUpdateQty }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <main>
      <div className="page-hero" style={{ paddingBottom: '2rem' }}>
        <p className="page-hero-eyebrow reveal visible">Your order</p>
        <h1 className="page-hero-title reveal visible">Your <em>Cart</em></h1>
        <p className="page-hero-sub reveal visible">
          {cart.length === 0
            ? 'Nothing here yet.'
            : `${itemCount} item${itemCount > 1 ? 's' : ''} in your cart.`}
        </p>
      </div>

      <section className="form-section" style={{ paddingTop: '1.5rem' }}>
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

              {/* Line items */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {cart.map((item, i) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto auto auto',
                      alignItems: 'center',
                      gap: '1.25rem',
                      padding: '1rem 0',
                      borderBottom: i < cart.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    {/* Name + unit price */}
                    <div>
                      <p style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        ₹{item.price} each
                      </p>
                    </div>

                    {/* ─ qty stepper ─ */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}>
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        aria-label="Decrease quantity"
                        style={{
                          width: '32px',
                          height: '32px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: item.qty === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                          fontSize: '1.1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        −
                      </button>

                      <span style={{
                        minWidth: '28px',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        userSelect: 'none',
                      }}>
                        {item.qty}
                      </span>

                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        aria-label="Increase quantity"
                        style={{
                          width: '32px',
                          height: '32px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--text-primary)',
                          fontSize: '1.1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        +
                      </button>
                    </div>

                    {/* Line total */}
                    <span style={{
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      minWidth: '60px',
                      textAlign: 'right',
                    }}>
                      ₹{item.price * item.qty}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.name}`}
                      style={{
                        background: 'none',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        padding: '0.3rem 0.65rem',
                        cursor: 'pointer',
                        color: 'var(--text-muted)',
                        fontSize: '0.78rem',
                        letterSpacing: '0.02em',
                        transition: 'border-color 0.15s, color 0.15s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--accent-muted, #c0392b)'
                        e.currentTarget.style.color = 'var(--accent-muted, #c0392b)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border)'
                        e.currentTarget.style.color = 'var(--text-muted)'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Divider + Total */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem 0 0',
                marginTop: '0.5rem',
                borderTop: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Total</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gold, var(--accent))' }}>
                  ₹{total}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <Link to="/reservation" className="btn-primary">Reserve a Table</Link>
                <Link to="/menu" className="btn-ghost">Add More Items</Link>
              </div>

            </div>
          )}
        </div>
      </section>
    </main>
  )
}