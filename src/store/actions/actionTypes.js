// ─── Product Action Types ───────────────────────────────────────────────────
// Used by the redux-thunk async action creator in productActions.js
// and handled by productReducer.js

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// ─── Cart Action Types ───────────────────────────────────────────────────────
// Used by the plain action creators in cartActions.js
// and handled by cartReducer.js

export const ADD_TO_CART      = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY  = 'UPDATE_QUANTITY';
export const CLEAR_CART       = 'CLEAR_CART';

// ─── Wishlist Action Types ───────────────────────────────────────────────────
// Used by the plain action creators in wishlistActions.js
// and handled by wishlistReducer.js
// The entire wishlist feature uses connect() — no hooks anywhere.

export const ADD_TO_WISHLIST      = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const CLEAR_WISHLIST       = 'CLEAR_WISHLIST';
export const MOVE_TO_CART         = 'MOVE_TO_CART';
