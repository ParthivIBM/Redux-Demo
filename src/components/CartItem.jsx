// ─── CartItem ─────────────────────────────────────────────────────────────────
//
// Renders a single item row in the cart page.
//
// Concept: useDispatch — used here to dispatch removeFromCart and updateQuantity
// directly from the component, without going through connect().
// This contrasts with ProductCard which uses the connect() pattern.

import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/actions/cartActions';

const CartItem = ({ item }) => {
  // useDispatch returns the store's dispatch function
  const dispatch = useDispatch();

  const { id, title, price, thumbnail, quantity } = item;
  const lineTotal = (price * quantity).toFixed(2);

  const handleDecrease = () => {
    // updateQuantity with quantity - 1; the reducer removes the item if it hits 0
    dispatch(updateQuantity(id, quantity - 1));
  };

  const handleIncrease = () => {
    dispatch(updateQuantity(id, quantity + 1));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image-wrapper">
        <img src={thumbnail} alt={title} className="cart-item-image" />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-title">{title}</h3>
        <p className="cart-item-unit-price">${price.toFixed(2)} each</p>

        <div className="quantity-stepper">
          <button className="qty-btn" onClick={handleDecrease}>−</button>
          <span className="qty-value">{quantity}</span>
          <button className="qty-btn" onClick={handleIncrease}>+</button>
        </div>
      </div>

      <div className="cart-item-right">
        <span className="cart-item-total">${lineTotal}</span>
        <button className="remove-btn" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
