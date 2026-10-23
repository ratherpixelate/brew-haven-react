import { useState } from 'react'
import { Coffee, CupSoda, Flame, Sparkles, Check, Utensils, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../context/cartContext'
import ItemModal from './ItemModal'

export default function CoffeeCard({ item, onAddToCart, delay = 0 }) {
  const { cart, addToCart, updateQty } = useCart()
  const [added, setAdded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const matchingItems = cart.filter(i => i.id === item.id)
  const inCartQty = matchingItems.reduce((sum, i) => sum + i.qty, 0)
  const targetItem = matchingItems[matchingItems.length - 1]

  function handleAdd(e) {
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart(item)
    } else {
      addToCart(item)
    }

    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  function handleIncrement(e) {
    e.stopPropagation()
    if (targetItem) {
      updateQty(targetItem.cartItemId || targetItem.id, 1)
    } else {
      addToCart(item)
    }
  }

  function handleDecrement(e) {
    e.stopPropagation()
    if (targetItem) {
      updateQty(targetItem.cartItemId || targetItem.id, -1)
    }
  }

  function getPlaceholderIcon() {
    switch (item.category) {
      case 'cold':
        return <CupSoda size={26} />
      case 'food':
        return <Utensils size={26} />
      case 'filter':
        return <Flame size={26} />
      case 'noncoffee':
        return <Sparkles size={26} />
      default:
        return <Coffee size={26} />
    }
  }

  return (
    <>
      <article
        className="menu-card reveal visible"
        style={{ '--delay': `${delay}ms`, cursor: 'pointer' }}
        onClick={() => setModalOpen(true)}
      >
        <div className="card-img-wrap">
          {item.img ? (
            <img
              src={`${import.meta.env.BASE_URL}assets/images/${item.img}.png`}
              alt={item.name}
              className="card-img"
              loading="lazy"
            />
          ) : (
            <div className="card-img-placeholder">
              <div className="card-placeholder-icon-wrap">
                {getPlaceholderIcon()}
              </div>
              <span className="card-placeholder-label">{item.category}</span>
            </div>
          )}
        </div>

        <div className="card-body">
          <div className="card-top">
            <span className="card-tag">{item.tag}</span>
            <span className="card-price">₹{item.price}</span>
          </div>

          <h3 className="card-name">{item.name}</h3>
          <p className="card-desc">{item.desc}</p>

          {inCartQty === 0 ? (
            <button
              className={`card-btn${added ? ' added' : ''}`}
              onClick={handleAdd}
              aria-label={`Add ${item.name} to bag`}
            >
              {added ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                'Add to Bag'
              )}
            </button>
          ) : (
            <div className="card-stepper" onClick={e => e.stopPropagation()}>
              <button
                type="button"
                className={`card-stepper-btn${inCartQty === 1 ? ' remove' : ''}`}
                onClick={handleDecrement}
                aria-label={inCartQty === 1 ? `Remove ${item.name} from bag` : 'Decrease quantity'}
              >
                {inCartQty === 1 ? <Trash2 size={13} /> : <Minus size={13} />}
              </button>

              <span className="card-stepper-label" key={inCartQty}>
                <span className="card-stepper-num">{inCartQty}</span> in bag
              </span>

              <button
                type="button"
                className="card-stepper-btn"
                onClick={handleIncrement}
                aria-label="Increase quantity"
              >
                <Plus size={13} />
              </button>
            </div>
          )}
        </div>
      </article>

      {modalOpen && (
        <ItemModal item={item} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}
