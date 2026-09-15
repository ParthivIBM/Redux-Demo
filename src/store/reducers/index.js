// ─── Root Reducer ─────────────────────────────────────────────────────────────
//
// Concept: combineReducers — merges multiple reducer functions into a single
// root reducer. Each key in the object becomes a slice of the global state:
//
//   state = {
//     products: { loading, items, error },   ← managed by productReducer
//     cart:     { items },                   ← managed by cartReducer
//     wishlist: { items },                   ← managed by wishlistReducer
//   }
//
// The root reducer is passed to createStore() in store.js.
// Note: adding `wishlist` here is what makes state.wishlist available to every
// mapStateToProps and useSelector in the app.

import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';

const rootReducer = combineReducers({
  products: productReducer,   // state.products
  cart:     cartReducer,      // state.cart
  wishlist: wishlistReducer,  // state.wishlist
});

export default rootReducer;
