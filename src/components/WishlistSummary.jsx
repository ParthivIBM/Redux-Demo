// ─── WishlistSummary ──────────────────────────────────────────────────────────
//
// The sidebar panel on WishlistPage — shows item count, total value, and a
// "Clear Wishlist" button.
//
// ─── connect() pattern vs hooks ───────────────────────────────────────────────
//
// CartSummary (hooks version) does this:
//   const cartItems = useSelector(state => state.cart.items);
//   const dispatch  = useDispatch();
//   dispatch(clearCart());
//
// WishlistSummary (connect version) does this instead:
//   mapStateToProps  reads state.wishlist.items → injected as `wishlistItems` prop
//   mapDispatchToProps binds clearWishlist      → injected as `clearWishlist` prop
//   connect(mapStateToProps, mapDispatchToProps)(WishlistSummary)
//
// The component itself receives plain props — it has zero awareness of Redux.

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearWishlist } from '../store/actions/wishlistActions';

// ── mapStateToProps ───────────────────────────────────────────────────────────
// Reads the wishlist slice and computes the values this component needs.
// The component will re-render whenever state.wishlist.items changes.
const mapStateToProps = (state) => {
  const items = state.wishlist.items;
  const itemCount = items.length;
  const total = items
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  return { wishlistItems: items, itemCount, total };
};

// ── mapDispatchToProps ────────────────────────────────────────────────────────
// Object shorthand: connect wraps clearWishlist in dispatch for us.
const mapDispatchToProps = {
  clearWishlist,
};

// ── Component ─────────────────────────────────────────────────────────────────
// Props received:
//   wishlistItems  — from mapStateToProps  (array of wishlisted products)
//   itemCount      — from mapStateToProps  (derived count)
//   total          — from mapStateToProps  (derived total price string)
//   clearWishlist  — from mapDispatchToProps (bound dispatch)
const WishlistSummary = ({ wishlistItems, itemCount, total, clearWishlist }) => {
  return (
    <div className="order-summary">
      <h2 className="order-summary-title">Wishlist Summary</h2>

      <div className="order-summary-row">
        <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        <span>${total}</span>
      </div>

      <div className="order-summary-divider" />

      <div className="order-summary-row order-summary-total">
        <span>Total Value</span>
        <span>${total}</span>
      </div>

      <Link to="/" className="continue-shopping-link">
        ← Continue Shopping
      </Link>

      {wishlistItems.length > 0 && (
        <button className="clear-cart-btn" onClick={clearWishlist}>
          Clear Wishlist
        </button>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistSummary);
