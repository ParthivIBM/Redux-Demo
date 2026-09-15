// ─── Wishlist Reducer ─────────────────────────────────────────────────────────
//
// Manages wishlist state: { items: [] }
// Each item is the plain product object — no quantity field, unlike the cart.
//
// Also handles the MOVE_TO_CART action: it removes the product from the
// wishlist side. The cartReducer handles the same action to ADD it to the cart.
// This demonstrates that a single dispatched action can update multiple
// independent slices of state simultaneously.
//
// Exports a selector: isInWishlist(state, productId) → boolean
// Used in ProductCard's mapStateToProps (via connect) to derive the inWishlist prop.

import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST,
  MOVE_TO_CART,
} from '../actions/actionTypes';

const initialState = {
  items: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST: {
      // Prevent duplicates — return unchanged state if already wishlisted
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) return state;
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case CLEAR_WISHLIST:
      return { ...state, items: [] };

    case MOVE_TO_CART:
      // Remove from wishlist — cartReducer will simultaneously add it to the cart
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

// ─── Selector ─────────────────────────────────────────────────────────────────
// Used inside mapStateToProps in ProductCard and WishlistItem.
// Receives the full Redux state (not just the wishlist slice) because
// mapStateToProps always receives the root state.
export const isInWishlist = (state, productId) =>
  state.wishlist.items.some((item) => item.id === productId);

export default wishlistReducer;
