import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { CartContext } from './cartContext'

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('bh_cart')
      return stored ? JSON.parse(stored) : []
    } catch (err) {
      void err
      return []
    }
  })

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [lastAddedId, setLastAddedId] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('bh_cart', JSON.stringify(cart))
    } catch (err) {
      void err
    }
  }, [cart])

  function addToCart(item, customizations = {}) {
    const customKey = customizations.milk || customizations.temperature || ''
    const cartItemId = customKey ? `${item.id}-${customKey}` : item.id

    setCart(prev => {
      const existing = prev.find(i => i.cartItemId === cartItemId || i.id === cartItemId)
      if (existing) {
        return prev.map(i =>
          (i.cartItemId === cartItemId || i.id === cartItemId)
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }
      return [
        ...prev,
        {
          ...item,
          cartItemId,
          customizations,
          qty: 1,
        },
      ]
    })

    setLastAddedId(item.id)
    setTimeout(() => setLastAddedId(null), 1200)

    toast.success(`Added ${item.name}`, {
      description: `₹${item.price} · Freshly brewed to order`,
      action: {
        label: 'View Bag',
        onClick: () => setIsDrawerOpen(true),
      },
      duration: 3500,
    })
  }

  function updateQty(id, delta) {
    setCart(prev =>
      prev
        .map(item => {
          const key = item.cartItemId || item.id
          if (key === id || item.id === id) {
            return { ...item, qty: item.qty + delta }
          }
          return item
        })
        .filter(item => item.qty > 0)
    )
  }

  function removeFromCart(id) {
    const itemToRemove = cart.find(i => (i.cartItemId || i.id) === id || i.id === id)
    setCart(prev => prev.filter(i => (i.cartItemId || i.id) !== id && i.id !== id))

    if (itemToRemove) {
      toast('Item removed', {
        action: {
          label: 'Undo',
          onClick: () => {
            setCart(prev => [...prev, itemToRemove])
          },
        },
        duration: 3000,
      })
    }
  }

  function clearCart() {
    setCart([])
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        isDrawerOpen,
        setIsDrawerOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastAddedId,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
