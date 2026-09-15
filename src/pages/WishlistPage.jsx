// ─── WishlistPage ─────────────────────────────────────────────────────────────
//
// The page-level container for the wishlist.
//
// ─── connect() pattern vs hooks ───────────────────────────────────────────────
//
// CartPage (hooks version) does this:
//   const cartItems  = useSelector(state => state.cart.items);
//   const totalItems = cartItems.reduce(...);
//
// WishlistPage (connect version) does this instead:
//   mapStateToProps reads state.wishlist.items and derives totalItems.
//   Both are injected as props — the component body is pure of Redux.
//
// There is no mapDispatchToProps here because this page dispatches nothing
// directly — all dispatching is delegated to WishlistItem and WishlistSummary.

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WishlistItem from '../components/WishlistItem';
import WishlistSummary from '../components/WishlistSummary';

// ── mapStateToProps ───────────────────────────────────────────────────────────
// Derives everything this page needs from the wishlist slice of state.
// connect() will call this every time state.wishlist changes and re-render
// the component with fresh props automatically.
const mapStateToProps = (state) => ({
  wishlistItems: state.wishlist.items,
  totalItems:    state.wishlist.items.length,
});

// ── Component ─────────────────────────────────────────────────────────────────
// Props received:
//   wishlistItems  — from mapStateToProps (the wishlisted products array)
//   totalItems     — from mapStateToProps (item count for the heading)
const WishlistPage = ({ wishlistItems, totalItems }) => {
  if (wishlistItems.length === 0) {
    return (
      <main className="page-container">
        <div className="empty-cart">
          <h2>Your wishlist is empty</h2>
          <Link to="/" className="continue-shopping-link">
            ← Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <h1 className="cart-page-title">
        Your Wishlist{' '}
        <span className="cart-page-count">
          ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </span>
      </h1>

      <div className="cart-layout">
        {/* Left column — wishlist item rows */}
        <div className="cart-items-list">
          {wishlistItems.map((item) => (
            // item is passed as ownProps — WishlistItem's mapDispatchToProps
            // uses it to know which product id to act on
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>

        {/* Right sidebar — WishlistSummary reads state itself via its own connect() */}
        <aside className="cart-sidebar">
          <WishlistSummary />
        </aside>
      </div>
    </main>
  );
};

export default connect(mapStateToProps)(WishlistPage);
