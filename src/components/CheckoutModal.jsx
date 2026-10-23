import { useState, useEffect, useCallback } from 'react'
import { X, CheckCircle2, Clock, MapPin, Coffee } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useCart } from '../context/cartContext'

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    clearCart,
  } = useCart()

  const [orderType, setOrderType] = useState('dine_in')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    tableNo: 'Table 4',
    pickupTime: 'In 15 minutes',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [confirmedOrder, setConfirmedOrder] = useState(null)
  const [errors, setErrors] = useState({})

  const handleClose = useCallback(() => {
    setIsCheckoutOpen(false)
    setConfirmedOrder(null)
    setErrors({})
    document.body.style.overflow = ''
  }, [setIsCheckoutOpen])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isCheckoutOpen && !loading) {
        handleClose()
      }
    }
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCheckoutOpen, loading, handleClose])

  if (!isCheckoutOpen) return null

  const tax = Math.round(cartTotal * 0.05)
  const finalTotal = cartTotal + tax

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = true
    if (!/^[0-9+\s]{10,14}$/.test(form.phone.trim())) errs.phone = true
    if (orderType === 'dine_in' && !form.tableNo.trim()) errs.tableNo = true

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      const orderNumber = `BH-${Math.floor(1000 + Math.random() * 9000)}`
      const orderData = {
        orderId: orderNumber,
        items: [...cart],
        type: orderType,
        total: finalTotal,
        customerName: form.name,
        tableNo: form.tableNo,
        pickupTime: form.pickupTime,
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setConfirmedOrder(orderData)
      clearCart()

      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#c8934a', '#e8b56a', '#f5ede0', '#2a221a'],
        })
      } catch (err) {
        void err
      }
    }, 750)
  }

  return (
    <div
      className="modal-overlay open"
      onClick={e => {
        if (e.target === e.currentTarget && !loading) {
          handleClose()
        }
      }}
    >
      <div className="modal-box" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-header-text">
            <h3 className="modal-item-name">
              {confirmedOrder ? 'Order Confirmed' : 'Checkout & Details'}
            </h3>
            <p className="modal-item-price">
              {confirmedOrder ? 'Brewing right now' : `${cart.length} items · Total ₹${finalTotal}`}
            </p>
          </div>
          <button
            className="modal-close"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        <hr className="modal-divider" />

        <div className="modal-body">
          {confirmedOrder ? (
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(74, 200, 100, 0.12)',
                  color: '#4ac864',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '0.4rem' }}>
                Thank you, {confirmedOrder.customerName}!
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Your order is with our baristas.
              </p>

              <div className="receipt-card">
                <div className="receipt-header">
                  <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    Receipt
                  </span>
                  <div className="receipt-id">{confirmedOrder.orderId}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Placed at {confirmedOrder.placedAt}
                  </div>
                </div>

                <div className="receipt-rows">
                  <div className="receipt-row">
                    <span>Order Option</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {confirmedOrder.type === 'dine_in' ? `Dine-in (${confirmedOrder.tableNo})` : `Takeaway (${confirmedOrder.pickupTime})`}
                    </span>
                  </div>
                  {confirmedOrder.items.map(item => (
                    <div key={item.cartItemId || item.id} className="receipt-row">
                      <span>{item.qty}× {item.name}</span>
                      <span>₹{item.price * item.qty}</span>
                    </div>
                  ))}
                  <div className="receipt-row total">
                    <span>Grand Total</span>
                    <span style={{ color: 'var(--gold)' }}>₹{confirmedOrder.total}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--gold)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                <Clock size={16} />
                <span>Estimated ready in ~10–12 minutes</span>
              </div>

              <button
                className="btn-primary full-w"
                onClick={handleClose}
              >
                Done & Return to Menu
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="checkout-tabs">
                <button
                  type="button"
                  className={`checkout-tab${orderType === 'dine_in' ? ' active' : ''}`}
                  onClick={() => setOrderType('dine_in')}
                >
                  <Coffee size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  Dine-in
                </button>
                <button
                  type="button"
                  className={`checkout-tab${orderType === 'takeaway' ? ' active' : ''}`}
                  onClick={() => setOrderType('takeaway')}
                >
                  <MapPin size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  Takeaway Pickup
                </button>
              </div>

              <div className="modal-form">
                <div className="form-group">
                  <label htmlFor="ckName">Full Name</label>
                  <input
                    type="text"
                    id="ckName"
                    placeholder="e.g. Arun Kumar"
                    value={form.name}
                    onChange={e => {
                      setForm(prev => ({ ...prev, name: e.target.value }))
                      if (errors.name) setErrors(prev => ({ ...prev, name: false }))
                    }}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="field-error visible">Name is required</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="ckPhone">Phone Number</label>
                  <input
                    type="tel"
                    id="ckPhone"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => {
                      setForm(prev => ({ ...prev, phone: e.target.value }))
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: false }))
                    }}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="field-error visible">Valid 10-digit number required</span>}
                </div>

                {orderType === 'dine_in' ? (
                  <div className="form-group">
                    <label htmlFor="ckTable">Table Number or Section</label>
                    <input
                      type="text"
                      id="ckTable"
                      placeholder="e.g. Table 4 or Bar counter"
                      value={form.tableNo}
                      onChange={e => setForm(prev => ({ ...prev, tableNo: e.target.value }))}
                      className={errors.tableNo ? 'error' : ''}
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <label htmlFor="ckTime">Estimated Pickup Time</label>
                    <select
                      id="ckTime"
                      value={form.pickupTime}
                      onChange={e => setForm(prev => ({ ...prev, pickupTime: e.target.value }))}
                    >
                      <option>In 15 minutes</option>
                      <option>In 30 minutes</option>
                      <option>In 45 minutes</option>
                      <option>In 1 hour</option>
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="ckNotes">Barista Notes (Optional)</label>
                  <input
                    type="text"
                    id="ckNotes"
                    placeholder="e.g. extra hot, oat milk preferred"
                    value={form.notes}
                    onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    className="btn-primary full-w"
                    disabled={loading}
                  >
                    {loading ? 'Brewing order…' : `Confirm Order · ₹${finalTotal}`}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
