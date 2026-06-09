import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservation from './pages/Reservation'
import Contact from './pages/Contact'
import Cart from './pages/Cart'

function App() {
  const [cart, setCart] = useState([])

  function addToCart(item) {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) {
        return prev.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <BrowserRouter>
      <div className="grain-overlay" aria-hidden="true"></div>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/"            element={<Home onAddToCart={addToCart} />} />
        <Route path="/menu"        element={<Menu onAddToCart={addToCart} />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/cart"        element={<Cart cart={cart} onRemove={removeFromCart} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App