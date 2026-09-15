// ─── Cart Reducer ─────────────────────────────────────────────────────────────
//
// Manages the cart state: { items: [] }
// Each item in the array is the product object with an added `quantity` field:
//   { id, title, price, thumbnail, category, rating, quantity }
//
// Also exports a selector: isInCart(state, productId) → boolean
// A selector is a plain function that derives data from the Redux state.

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
  MOVE_TO_CART,
} from '../actions/actionTypes';

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // Prevent duplicates — if the item already exists, return unchanged state
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) return state;

      // Spread the product and attach quantity: 1 as the starting value
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case REMOVE_FROM_CART:
      // Filter out the item whose id matches the payload (productId)
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      // If quantity drops to 0 or below, remove the item entirely
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== productId),
        };
      }
      // Otherwise update the quantity for the matching item
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      };
    }

    case CLEAR_CART:
      // Reset items to an empty array
      return { ...state, items: [] };

    case MOVE_TO_CART: {
      // A product is being moved from the wishlist into the cart.
      // The wishlistReducer removes it; this reducer adds it — both react to the
      // same dispatched action, demonstrating multi-reducer action handling.
      const alreadyInCart = state.items.some((item) => item.id === action.payload.id);
      if (alreadyInCart) return state;
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    default:
      return state;
  }
};

// ─── Selector ─────────────────────────────────────────────────────────────────
// Concept: Selector — a function that reads a slice of Redux state.
// Used in mapStateToProps (ProductCard) to derive the `inCart` boolean.
export const isInCart = (state, productId) =>
  state.cart.items.some((item) => item.id === productId);

export default cartReducer;
