import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { CartProvider } from './context/CartContext'
import { useCart } from './context/cartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservation from './pages/Reservation'
import Contact from './pages/Contact'
import Cart from './pages/Cart'

function AppContent() {
  const { cart, addToCart, removeFromCart, updateQty, cartCount } = useCart()

  return (
    <>
      <div className="grain-overlay" aria-hidden="true"></div>
      <Navbar cartCount={cartCount} />
      <CartDrawer />
      <CheckoutModal />

      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/menu" element={<Menu onAddToCart={addToCart} />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onRemove={removeFromCart}
              onUpdateQty={updateQty}
            />
          }
        />
      </Routes>

      <Footer />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-strong)',
            fontFamily: 'var(--font-body)',
          },
          actionButtonStyle: {
            background: 'var(--gold)',
            color: '#fff',
            fontWeight: 500,
          },
        }}
      />
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename="/brew-haven-react/">
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
