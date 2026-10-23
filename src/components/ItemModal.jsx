import { useState, useEffect } from 'react'
import { X, Plus, Minus, Check } from 'lucide-react'
import { useCart } from '../context/cartContext'

export default function ItemModal({ item, onClose }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [milk, setMilk] = useState('Standard')
  const [temp, setTemp] = useState('Hot')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  if (!item) return null

  const isCoffeeOrDrink = ['espresso', 'cold', 'filter', 'noncoffee'].includes(item.category)
  const isIcedCategory = item.category === 'cold'
  const extraPrice = milk === 'Oat Milk' || milk === 'Almond Milk' ? 30 : 0
  const itemPrice = (item.price + extraPrice) * qty

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addToCart(item, {
        milk: milk !== 'Standard' ? milk : null,
        temp: isCoffeeOrDrink && !isIcedCategory ? temp : null,
      })
    }
    setAdded(true)
    setTimeout(() => {
      onClose()
    }, 500)
  }

  return (
    <div
      className="modal-overlay open"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal-box" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-header-text">
            <span className="card-tag">{item.tag || item.category}</span>
            <h3 className="modal-item-name" style={{ marginTop: '0.4rem' }}>{item.name}</h3>
            <p className="modal-item-price">₹{item.price}</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close details">
            <X size={16} />
          </button>
        </div>

        <hr className="modal-divider" />

        <div className="modal-body">
          {item.img && (
            <div style={{ maxHeight: '220px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img
                src={`${import.meta.env.BASE_URL}assets/images/${item.img}.png`}
                alt={item.name}
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
            </div>
          )}

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
            {item.desc}
          </p>

          {isCoffeeOrDrink && !isIcedCategory && (
            <div>
              <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                Temperature
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['Hot', 'Iced'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTemp(t)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      border: '1px solid',
                      borderColor: temp === t ? 'var(--gold)' : 'var(--border)',
                      background: temp === t ? 'var(--gold-dim)' : 'transparent',
                      color: temp === t ? 'var(--gold)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isCoffeeOrDrink && (
            <div>
              <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                Choice of Milk
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Standard', 'Oat Milk (+₹30)', 'Almond Milk (+₹30)'].map(m => {
                  const val = m.split(' ')[0] + (m.includes('Milk') ? ' Milk' : '')
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMilk(val)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                        border: '1px solid',
                        borderColor: milk === val ? 'var(--gold)' : 'var(--border)',
                        background: milk === val ? 'var(--gold-dim)' : 'transparent',
                        color: milk === val ? 'var(--gold)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {m}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="modal-qty-row">
            <span className="modal-qty-label">Quantity</span>
            <div className="qty-stepper">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQty(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600 }}>{qty}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQty(q => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary full-w"
            onClick={handleAdd}
            style={{ marginTop: '0.5rem' }}
          >
            {added ? (
              <>
                <Check size={16} /> Added to Bag
              </>
            ) : (
              `Add to Order · ₹${itemPrice}`
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
