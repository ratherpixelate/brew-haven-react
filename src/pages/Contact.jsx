import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validators = {
    name:    v => v.trim().length > 0,
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    subject: v => v !== '',
    message: v => v.trim().length > 5,
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newErrors = {}
    let valid = true
    Object.entries(validators).forEach(([field, check]) => {
      if (!check(form[field])) { newErrors[field] = true; valid = false }
    })
    setErrors(newErrors)
    if (!valid) return

    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 900)
  }

  return (
    <main>
      <div className="page-hero">
        <p className="page-hero-eyebrow reveal visible">Get in touch</p>
        <h1 className="page-hero-title reveal visible">Say <em>Hello</em></h1>
        <p className="page-hero-sub reveal visible">
          Questions, feedback, events, or just want to say hi — we're always happy to hear from you.
        </p>
      </div>

      <section className="contact-layout">
        <div className="container contact-grid">

          {/* Left: Info */}
          <div className="contact-info">
            <div className="contact-info-card reveal visible" style={{ '--delay': '0ms' }}>
              <div className="contact-info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="contact-info-body">
                <h4>Address</h4>
                <p>12 Coffee Lane, Pattom<br />Thiruvananthapuram, Kerala – 695004</p>
              </div>
            </div>

            <div className="contact-info-card reveal visible" style={{ '--delay': '80ms' }}>
              <div className="contact-info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                </svg>
              </div>
              <div className="contact-info-body">
                <h4>Phone</h4>
                <a href="tel:+914712345678">+91 471 234 5678</a>
                <p style={{ marginTop: '0.2rem', fontSize: '0.8rem' }}>Mon–Fri 7am–10pm · Weekends 8am–9pm</p>
              </div>
            </div>

            <div className="contact-info-card reveal visible" style={{ '--delay': '160ms' }}>
              <div className="contact-info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="contact-info-body">
                <h4>Email</h4>
                <a href="mailto:hello@brewhaven.in">hello@brewhaven.in</a>
                <p style={{ marginTop: '0.2rem', fontSize: '0.8rem' }}>We reply within 24 hours</p>
              </div>
            </div>

            <div className="contact-info-card reveal visible" style={{ '--delay': '240ms' }}>
              <div className="contact-info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className="contact-info-body">
                <h4>Opening Hours</h4>
                <p>Mon – Fri &nbsp;&nbsp; 7:00 – 22:00<br />
                   Saturday &nbsp; 8:00 – 22:00<br />
                   Sunday &nbsp;&nbsp;&nbsp; 9:00 – 21:00</p>
              </div>
            </div>

            <div className="map-placeholder reveal visible" style={{ '--delay': '300ms' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Map coming soon</span>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-side contact-form-card">
            {submitted ? (
              <div className="form-card">
                <div className="form-success visible">
                  <div className="form-success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                  <br />
                  <button className="btn-outline" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}>
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Send a Message
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                  Have a question or want to arrange something special? Drop us a message.
                </p>

                <form className="form-stack" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="ctName">Your Name</label>
                      <input type="text" id="ctName" name="name" placeholder="e.g. Rohan Menon"
                        value={form.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
                      {errors.name && <span className="field-error visible">Please enter your name.</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="ctEmail">Email Address</label>
                      <input type="email" id="ctEmail" name="email" placeholder="you@example.com"
                        value={form.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
                      {errors.email && <span className="field-error visible">Enter a valid email.</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="ctSubject">Subject</label>
                    <select id="ctSubject" name="subject" value={form.subject} onChange={handleChange} className={errors.subject ? 'error' : ''}>
                      <option value="" disabled>What's this about?</option>
                      <option>General Enquiry</option>
                      <option>Event Booking</option>
                      <option>Feedback</option>
                      <option>Catering Request</option>
                      <option>Press / Media</option>
                      <option>Other</option>
                    </select>
                    {errors.subject && <span className="field-error visible">Please select a subject.</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="ctMessage">Message</label>
                    <textarea id="ctMessage" name="message" rows="5"
                      placeholder="Tell us what's on your mind…"
                      value={form.message} onChange={handleChange} className={errors.message ? 'error' : ''} />
                    {errors.message && <span className="field-error visible">Please write a message.</span>}
                  </div>

                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }} disabled={loading}>
                    {loading ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  )
}