// ─── ProductCard ──────────────────────────────────────────────────────────────
//
// Concept: connect() — the legacy HOC (Higher Order Component) from react-redux
// that connects a class or function component to the Redux store.
//
// Concept: mapStateToProps — a function that maps Redux state to component props.
// It receives (state, ownProps) — the second argument `ownProps` lets us use
// the component's own props (the product id) to derive state-derived props.
//
// Concept: mapDispatchToProps — an object (or function) that maps dispatch calls
// to component props. Each key becomes a prop that calls dispatch internally.
//
// Concept: ownProps — the props passed *directly* to the component by its parent
// (in this case `product` from ProductList). They are accessible in both
// mapStateToProps and mapDispatchToProps.

import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../store/actions/cartActions';
import { addToWishlist } from '../store/actions/wishlistActions';
import { isInCart } from '../store/reducers/cartReducer';
import { isInWishlist } from '../store/reducers/wishlistReducer';

// ── mapStateToProps ───────────────────────────────────────────────────────────
// Uses ownProps.product.id to check both the cart and the wishlist slices.
// Returns two derived booleans that drive the button states below.
const mapStateToProps = (state, ownProps) => ({
  inCart:     isInCart(state, ownProps.product.id),
  inWishlist: isInWishlist(state, ownProps.product.id),
});

// ── mapDispatchToProps ────────────────────────────────────────────────────────
// Object shorthand: both action creators are wrapped in dispatch by connect().
// props.addToCart(product)     → dispatch(addToCart(product))
// props.addToWishlist(product) → dispatch(addToWishlist(product))
const mapDispatchToProps = {
  addToCart,
  addToWishlist,
};

// ── Helper: render star rating ────────────────────────────────────────────────
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < full ? 'star filled' : 'star'}>★</span>
  ));
  return (
    <div className="star-rating">
      {stars}
      <span className="rating-value">{rating}</span>
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────
// Props received:
//   product        — from parent (ownProps)
//   inCart         — from mapStateToProps
//   inWishlist     — from mapStateToProps
//   addToCart      — from mapDispatchToProps (bound dispatch)
//   addToWishlist  — from mapDispatchToProps (bound dispatch)
const ProductCard = ({ product, inCart, inWishlist, addToCart, addToWishlist }) => {
  const { title, price, thumbnail, category, rating } = product;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <span className="category-badge">{category.toUpperCase()}</span>
        <img src={thumbnail} alt={title} className="product-image" />

        {/* Wishlist heart — top-right corner of the image */}
        <button
          className={`wishlist-heart-btn ${inWishlist ? 'wishlisted' : ''}`}
          onClick={() => addToWishlist(product)}
          disabled={inWishlist}
          aria-label={inWishlist ? 'In wishlist' : 'Add to wishlist'}
          title={inWishlist ? 'Already in wishlist' : 'Add to wishlist'}
        >
          {inWishlist ? '♥' : '♡'}
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <StarRating rating={typeof rating === 'object' ? rating.rate : rating} />
        <p className="product-price">${price.toFixed(2)}</p>

        {inCart ? (
          <button className="add-to-cart-btn in-cart-btn" disabled>
            In Cart
          </button>
        ) : (
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
