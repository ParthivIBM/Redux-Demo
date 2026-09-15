// ─── Cart Action Creators ────────────────────────────────────────────────────
//
// These are plain (synchronous) action creators.
// Each returns an action object with a `type` and a `payload`.
//
// Concept: Action  — a plain object { type, payload } describing what happened
// Concept: Action Creator — a function that returns an action object
// Concept: Action Payload — the data carried by the action (e.g. the product)

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
} from './actionTypes';

// Payload: the full product object (id, title, price, thumbnail, etc.)
// The reducer will add it to the cart with quantity: 1
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

// Payload: just the product id — enough to find and remove it from the array
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

// Payload: productId + new quantity value
export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity },
});

// No payload needed — clears the entire cart array
export const clearCart = () => ({
  type: CLEAR_CART,
});
