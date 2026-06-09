import ReservationForm from '../components/ReservationForm'

export default function Reservation() {
  return (
    <main>
      <div className="page-hero">
        <p className="page-hero-eyebrow reveal visible">Book your spot</p>
        <h1 className="page-hero-title reveal visible">Reserve <em>a Seat</em></h1>
        <p className="page-hero-sub reveal visible">
          We'd love to have you. Fill in the details below and we'll hold your table.
        </p>
      </div>

      <section className="form-section">
        <div className="container">
          <ReservationForm />
        </div>
      </section>
    </main>
  )
}