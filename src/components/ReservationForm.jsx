import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, Clock, CheckCircle2, Coffee } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useCart } from '../context/cartContext'

const timeSlots = [
  '7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','9:30 AM',
  '10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM',
  '1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM',
  '4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM',
  '7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM',
]

const guestOptions = [
  '1 guest','2 guests','3 guests','4 guests','5 guests','6 guests',
  '7–10 guests (large group)','10+ guests (event)',
]

const today = new Date().toISOString().split('T')[0]

export default function ReservationForm() {
  const { cart, cartTotal } = useCart()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: today,
    time: '10:00 AM',
    guests: '2 guests',
    notes: '',
    includePreorder: cart.length > 0,
  })

  const [errors, setErrors] = useState({})
  const [bookingConfirmed, setBookingConfirmed] = useState(null)
  const [loading, setLoading] = useState(false)

  const validators = {
    name: v => v.trim().length > 0,
    phone: v => /^[0-9+\s]{10,14}$/.test(v.trim()),
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    date: v => v !== '',
    time: v => v !== '',
    guests: v => v !== '',
  }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }))
  }

  const handleQuickDate = daysOffset => {
    const d = new Date()
    d.setDate(d.getDate() + daysOffset)
    const val = d.toISOString().split('T')[0]
    setForm(prev => ({ ...prev, date: val }))
    if (errors.date) setErrors(prev => ({ ...prev, date: false }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newErrors = {}
    let valid = true

    Object.entries(validators).forEach(([field, check]) => {
      if (!check(form[field])) {
        newErrors[field] = true
        valid = false
      }
    })

    setErrors(newErrors)
    if (!valid) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const bookingRef = `RES-${Math.floor(1000 + Math.random() * 9000)}`
      setBookingConfirmed({
        ref: bookingRef,
        ...form,
      })

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#c8934a', '#e8b56a', '#f5ede0', '#2a221a'],
        })
      } catch (err) {
        void err
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 750)
  }

  if (bookingConfirmed) {
    return (
      <div className="form-card" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(74, 200, 100, 0.12)',
            color: '#4ac864',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
          }}
        >
          <CheckCircle2 size={34} />
        </div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
          Table Reserved!
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
          We're looking forward to welcoming you, {bookingConfirmed.name}.
        </p>

        <div className="receipt-card" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="receipt-header">
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              Confirmation Reference
            </span>
            <div className="receipt-id">{bookingConfirmed.ref}</div>
          </div>
          <div className="receipt-rows">
            <div className="receipt-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} color="var(--gold)" /> Date
              </span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{bookingConfirmed.date}</span>
            </div>
            <div className="receipt-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} color="var(--gold)" /> Time
              </span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{bookingConfirmed.time}</span>
            </div>
            <div className="receipt-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Users size={14} color="var(--gold)" /> Party Size
              </span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{bookingConfirmed.guests}</span>
            </div>
            {bookingConfirmed.includePreorder && cart.length > 0 && (
              <div className="receipt-row total">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Coffee size={14} color="var(--gold)" /> Linked Pre-order
                </span>
                <span style={{ color: 'var(--gold)' }}>{cart.length} items (₹{cartTotal})</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/menu" className="btn-ghost">
            View Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="form-card" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <form className="form-stack" onSubmit={handleSubmit} noValidate>
        {cart.length > 0 && (
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--gold-dim)',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.5rem',
            }}
          >
            <Coffee size={20} color="var(--gold)" />
            <div style={{ flex: 1, fontSize: '0.85rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Pre-order your bag:</strong> You have {cart.length} items in your bag.
              We can prepare them right for your table reservation.
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="includePreorder"
                checked={form.includePreorder}
                onChange={handleChange}
                style={{ accentColor: 'var(--gold)' }}
              />
              Include
            </label>
          </div>
        )}

        <p className="form-section-label">Your Details</p>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="resName">Full Name</label>
            <input
              type="text"
              id="resName"
              name="name"
              placeholder="e.g. Priya Nair"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="field-error visible">Please enter your name.</span>}
          </div>
          <div className="form-group">
            <label htmlFor="resPhone">Phone Number</label>
            <input
              type="tel"
              id="resPhone"
              name="phone"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="field-error visible">Enter a valid 10-digit phone number.</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="resEmail">Email Address</label>
          <input
            type="email"
            id="resEmail"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="field-error visible">Enter a valid email address.</span>}
        </div>

        <hr className="form-divider" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p className="form-section-label" style={{ margin: 0 }}>Reservation Date & Time</p>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              type="button"
              onClick={() => handleQuickDate(0)}
              style={{
                fontSize: '0.72rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '100px',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handleQuickDate(1)}
              style={{
                fontSize: '0.72rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '100px',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              Tomorrow
            </button>
          </div>
        </div>

        <div className="form-row" style={{ marginTop: '0.75rem' }}>
          <div className="form-group">
            <label htmlFor="resDate">Date</label>
            <input
              type="date"
              id="resDate"
              name="date"
              min={today}
              value={form.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="field-error visible">Please select a date.</span>}
          </div>

          <div className="form-group">
            <label htmlFor="resTime">Time</label>
            <select
              id="resTime"
              name="time"
              value={form.time}
              onChange={handleChange}
              className={errors.time ? 'error' : ''}
            >
              {timeSlots.map(t => <option key={t}>{t}</option>)}
            </select>
            {errors.time && <span className="field-error visible">Please select a time.</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="resGuests">Number of Guests</label>
          <select
            id="resGuests"
            name="guests"
            value={form.guests}
            onChange={handleChange}
            className={errors.guests ? 'error' : ''}
          >
            {guestOptions.map(g => <option key={g}>{g}</option>)}
          </select>
          {errors.guests && <span className="field-error visible">Please select number of guests.</span>}
        </div>

        <hr className="form-divider" />
        <p className="form-section-label">
          Special Requests{' '}
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'none', letterSpacing: 0 }}>
            — optional
          </span>
        </p>

        <div className="form-group">
          <label htmlFor="resNotes">Notes for our Baristas & Hosts</label>
          <textarea
            id="resNotes"
            name="notes"
            rows="3"
            placeholder="e.g. window seat preferred, anniversary occasion, high-chair needed…"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
          disabled={loading}
        >
          {loading ? 'Securing your table…' : 'Confirm Table Reservation'}
        </button>
      </form>
    </div>
  )
}
