export default function CoffeeCard({ item, onAddToCart, delay = 0 }) {
  return (
    <article className="menu-card reveal visible" style={{ '--delay': `${delay}ms` }}>
      <div className="card-img-wrap">
        {item.img ? (
          <img
            src={`/assets/images/${item.img}.png`}
            alt={item.name}
            className="card-img"
          />
        ) : (
          <div className={`card-img-placeholder ${item.placeholder || ''}`}></div>
        )}
      </div>
      <div className="card-body">
        <div className="card-top">
          <span className="card-tag">{item.tag}</span>
          <span className="card-price">₹{item.price}</span>
        </div>
        <h3 className="card-name">{item.name}</h3>
        <p className="card-desc">{item.desc}</p>
        <button
          className="card-btn"
          onClick={() => onAddToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}