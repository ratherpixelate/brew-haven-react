import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-glow hero-glow--left"></div>
        <div className="hero-glow hero-glow--right"></div>
        <div className="hero-rings">
          <div className="hero-ring hero-ring--1"></div>
          <div className="hero-ring hero-ring--2"></div>
          <div className="hero-ring hero-ring--3"></div>
        </div>
      </div>

      <div className="hero-content hero-content--center">
        <p className="hero-eyebrow reveal visible">Est. 2018 · Thiruvananthapuram</p>
        <h1 className="hero-title reveal visible">
          <em>Where Every</em><br />
          Cup Tells<br />
          <span className="hero-accent">a Story.</span>
        </h1>
        <p className="hero-sub reveal visible">
          Specialty coffee, freshly baked pastries, and a corner of the world that's entirely yours.
        </p>
        <div className="hero-actions reveal visible">
          <Link className="btn-primary" to="/menu">Order Now</Link>
          <a href="#menu" className="btn-ghost">Explore Menu</a>
        </div>
      </div>
    </section>
  )
}