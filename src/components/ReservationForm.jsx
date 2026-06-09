import { useState } from 'react'
import { Link } from 'react-router-dom'

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
  const [form, setForm] = useState({
    name: '', phone: '', email: '', date: '', time: '', guests: '', notes: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validators = {
    name:   v => v.trim().length > 0,
    phone:  v => /^[0-9+\s]{10,14}$/.test(v.trim()),
    email:  v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    date:   v => v !== '',
    time:   v => v !== '',
    guests: v => v !== '',
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }))
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
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 900)
  }

  if (submitted) {
    return (
      <div className="form-card">
        <div className="form-success visible">
          <div className="form-success-icon">✓</div>
          <h3>You're all set!</h3>
          <p>
            Your table has been reserved. We've noted your details and look forward to seeing you.<br /><br />
            A confirmation will be sent to your phone number.
          </p>
          <br />
          <Link to="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="form-card">
      <form className="form-stack" onSubmit={handleSubmit} noValidate>

        <p className="form-section-label">Your Details</p>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="resName">Full Name</label>
            <input
              type="text" id="resName" name="name"
              placeholder="e.g. Priya Nair"
              value={form.name} onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="field-error visible">Please enter your name.</span>}
          </div>
          <div className="form-group">
            <label htmlFor="resPhone">Phone Number</label>
            <input
              type="tel" id="resPhone" name="phone"
              placeholder="+91 98765 43210"
              value={form.phone} onChange={handleChange}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="field-error visible">Enter a valid phone number.</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="resEmail">Email Address</label>
          <input
            type="email" id="resEmail" name="email"
            placeholder="you@example.com"
            value={form.email} onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="field-error visible">Enter a valid email address.</span>}
        </div>

        <hr className="form-divider" />
        <p className="form-section-label">Reservation Details</p>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="resDate">Date</label>
            <input
              type="date" id="resDate" name="date"
              min={today}
              value={form.date} onChange={handleChange}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="field-error visible">Please select a date.</span>}
          </div>
          <div className="form-group">
            <label htmlFor="resTime">Time</label>
            <select
              id="resTime" name="time"
              value={form.time} onChange={handleChange}
              className={errors.time ? 'error' : ''}
            >
              <option value="" disabled>Select a time</option>
              {timeSlots.map(t => <option key={t}>{t}</option>)}
            </select>
            {errors.time && <span className="field-error visible">Please select a time.</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="resGuests">Number of Guests</label>
          <select
            id="resGuests" name="guests"
            value={form.guests} onChange={handleChange}
            className={errors.guests ? 'error' : ''}
          >
            <option value="" disabled>How many guests?</option>
            {guestOptions.map(g => <option key={g}>{g}</option>)}
          </select>
          {errors.guests && <span className="field-error visible">Please select the number of guests.</span>}
        </div>

        <hr className="form-divider" />
        <p className="form-section-label">
          Special Requests{' '}
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'none', letterSpacing: 0 }}>
            — optional
          </span>
        </p>

        <div className="form-group">
          <label htmlFor="resNotes">Notes for us</label>
          <textarea
            id="resNotes" name="notes" rows="3"
            placeholder="e.g. window seat preferred, birthday occasion, dietary requirements…"
            value={form.notes} onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
          disabled={loading}
        >
          {loading ? 'Confirming…' : 'Confirm Reservation'}
        </button>

      </form>
    </div>
  )
}