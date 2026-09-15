// ─── CartSummary ──────────────────────────────────────────────────────────────
//
// The "Order Summary" sidebar on the cart page.
//
// Concept: useSelector — reads cart items from Redux state and derives totals.
// Concept: useDispatch — dispatches clearCart when needed (wired to the component).
// Both hooks are used here, complementing the connect() pattern in ProductCard.

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../store/actions/cartActions';

const CartSummary = () => {
  // useSelector derives the data we need from the Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Compute subtotal from items (price × quantity for each)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="order-summary">
      <h2 className="order-summary-title">Order Summary</h2>

      <div className="order-summary-row">
        <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
        <span>${subtotal}</span>
      </div>

      <div className="order-summary-divider" />

      <div className="order-summary-row order-summary-total">
        <span>Total</span>
        <span>${subtotal}</span>
      </div>

      {/* Proceed to Checkout — placeholder */}
      <button className="checkout-btn" disabled>
        Proceed to Checkout
      </button>

      <Link to="/" className="continue-shopping-link">
        ← Continue Shopping
      </Link>

      {/* Clear cart — dispatches clearCart action */}
      {cartItems.length > 0 && (
        <button className="clear-cart-btn" onClick={handleClearCart}>
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default CartSummary;
