// ─── Navbar ───────────────────────────────────────────────────────────────────
//
// Demonstrates BOTH Redux connection styles side by side:
//
//   Cart count    — read via useSelector (hooks style)
//   Wishlist count — read via connect() / mapStateToProps (class/HOC style)
//
// The Navbar component itself is split:
//   • The inner NavbarComponent is a plain function that receives everything as props.
//   • connect() wraps it to inject wishlistCount from the store.
//   • useSelector inside the wrapper still reads cartCount the hooks way.
//
// This makes the contrast explicit: same store, same data, two patterns.

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// ── mapStateToProps for Navbar ────────────────────────────────────────────────
// Reads the wishlist slice and derives the count.
// This is the connect() way to read state — no hooks needed.
const mapStateToProps = (state) => ({
  wishlistCount: state.wishlist.items.length,
});

// ── Inner component ───────────────────────────────────────────────────────────
// Receives wishlistCount from connect() as a prop.
// Reads cartCount itself via useSelector to show the contrast.
const NavbarComponent = ({ wishlistCount }) => {
  // Hooks style — cart count comes from useSelector
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // useDispatch is available here for any future navbar-level actions
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">LOGO</span>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>

      <div className="navbar-right">
        <div className="navbar-search">
          <input type="text" placeholder="Search for products..." readOnly />
          <span className="search-icon">🔍</span>
        </div>

        {/* Wishlist icon — connect() injected wishlistCount, links to /wishlist */}
        <Link to="/wishlist" className="navbar-cart-link" aria-label="Wishlist">
          <div className="navbar-cart-icon">
            ♡
            {wishlistCount > 0 && (
              <span className="cart-badge wishlist-badge">{wishlistCount}</span>
            )}
          </div>
        </Link>

        {/* Cart icon — useSelector-derived cartCount */}
        <Link to="/cart" className="navbar-cart-link">
          <div className="navbar-cart-icon">
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </div>
        </Link>

        <span className="navbar-user">Hi, parthiv</span>
        <button className="navbar-text-btn">Orders</button>
        <button className="navbar-text-btn">Logout</button>
      </div>
    </nav>
  );
};

// connect(mapStateToProps) wraps NavbarComponent and injects wishlistCount as a prop.
// CartCount is still read by useSelector inside the component — both patterns coexist.
export default connect(mapStateToProps)(NavbarComponent);
