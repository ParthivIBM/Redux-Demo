// ─── WishlistItem ─────────────────────────────────────────────────────────────
//
// Renders one row on the WishlistPage. The wishlist has no quantity — items are
// either wishlisted or not. The row shows the product image, title, price, and
// two action buttons: "Move to Cart" and "Remove".
//
// ─── connect() pattern vs hooks ───────────────────────────────────────────────
//
// CartItem (hooks version) does this:
//   const dispatch = useDispatch();
//   dispatch(removeFromCart(id));
//
// WishlistItem (connect version) does this instead:
//   mapDispatchToProps = { removeFromWishlist, moveToCart }
//   connect(null, mapDispatchToProps)(WishlistItem)
//
// The component never calls dispatch directly — connect() injects
// `removeFromWishlist` and `moveToCart` as bound props.
// When you call props.removeFromWishlist(id), connect internally calls
// dispatch(removeFromWishlist(id)) for you.
//
// mapStateToProps is null here because this component only needs actions,
// not state — the item data arrives as an ownProp from WishlistPage.

import React from 'react';
import { connect } from 'react-redux';
import { removeFromWishlist, moveToCart } from '../store/actions/wishlistActions';

// ── mapStateToProps ───────────────────────────────────────────────────────────
// null — this component reads nothing from the Redux store.
// All data it needs (the item) comes via ownProps from the parent.

// ── mapDispatchToProps ────────────────────────────────────────────────────────
// Object shorthand: connect() wraps each action creator in dispatch automatically.
// props.removeFromWishlist(id)  →  dispatch(removeFromWishlist(id))
// props.moveToCart(product)     →  dispatch(moveToCart(product))
//   moveToCart dispatches MOVE_TO_CART which is handled by BOTH:
//     • wishlistReducer: removes the product from wishlist.items
//     • cartReducer:     adds the product to cart.items with quantity: 1
const mapDispatchToProps = {
  removeFromWishlist,
  moveToCart,
};

// ── Component ─────────────────────────────────────────────────────────────────
// Props received:
//   item                — ownProp from WishlistPage (the product object)
//   removeFromWishlist  — from mapDispatchToProps (bound dispatch)
//   moveToCart          — from mapDispatchToProps (bound dispatch)
const WishlistItem = ({ item, removeFromWishlist, moveToCart }) => {
  const { id, title, price, thumbnail } = item;

  return (
    <div className="cart-item">
      <div className="cart-item-image-wrapper">
        <img src={thumbnail} alt={title} className="cart-item-image" />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-title">{title}</h3>
        <p className="cart-item-unit-price">${price.toFixed(2)}</p>

        {/* Move to Cart — dispatches MOVE_TO_CART, handled by both reducers */}
        <button
          className="move-to-cart-btn"
          onClick={() => moveToCart(item)}
        >
          Move to Cart
        </button>
      </div>

      <div className="cart-item-right">
        <span className="cart-item-total">${price.toFixed(2)}</span>
        <button
          className="remove-btn"
          onClick={() => removeFromWishlist(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(WishlistItem);
