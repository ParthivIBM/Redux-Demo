// ─── Wishlist Action Creators ─────────────────────────────────────────────────
//
// Plain (synchronous) action creators for the wishlist.
// Identical pattern to cartActions.js — each returns { type, payload }.
//
// The entire wishlist feature is deliberately written using connect() /
// mapStateToProps / mapDispatchToProps with NO hooks, so you can compare
// the two styles side-by-side across the same codebase.
//
// Concept recap:
//   Action       — plain object { type, payload }
//   Action Creator — function that returns an action object
//   Action Payload — the data the reducer needs to update state

import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST,
  MOVE_TO_CART,
} from './actionTypes';

// Add a product to the wishlist.
// Payload: the full product object (reducer stores it with no quantity — wishlists
// track desired items, not quantities).
export const addToWishlist = (product) => ({
  type: ADD_TO_WISHLIST,
  payload: product,
});

// Remove one product from the wishlist by id.
// Payload: just the id — enough to filter it out.
export const removeFromWishlist = (productId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: productId,
});

// Clear the entire wishlist in one action.
// No payload needed.
export const clearWishlist = () => ({
  type: CLEAR_WISHLIST,
});

// Move a product from the wishlist into the cart.
// Payload: the full product object.
// The wishlistReducer removes it; the cartReducer adds it (via ADD_TO_CART).
// Both reducers listen to this single action type — demonstrating that one
// dispatched action can be handled by multiple reducers simultaneously.
export const moveToCart = (product) => ({
  type: MOVE_TO_CART,
  payload: product,
});
