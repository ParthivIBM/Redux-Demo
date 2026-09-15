// ─── CartPage ─────────────────────────────────────────────────────────────────
//
// Displays all items currently in the cart alongside the Order Summary sidebar.
//
// Concept: useSelector — reads cart.items from the Redux store.
// Renders CartItem for each item (which uses useDispatch internally),
// and CartSummary for the totals panel (also uses useSelector + useDispatch).

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

const CartPage = () => {
  // Read the cart items from Redux state
  const cartItems = useSelector((state) => state.cart.items);

  // Total unique-item count (not quantity sum) for the heading
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <main className="page-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
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
        Your Cart{' '}
        <span className="cart-page-count">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
      </h1>

      <div className="cart-layout">
        {/* Left column: list of cart items */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Right sidebar: order summary */}
        <aside className="cart-sidebar">
          <CartSummary />
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
