// ─── Product Reducer ─────────────────────────────────────────────────────────
//
// Concept: Reducer — a pure function (state, action) => newState.
// It must never mutate state directly; always return a new object.
//
// This reducer manages the async product-fetch lifecycle:
//   loading  — true while the API call is in flight
//   items    — the array of products returned by the API
//   error    — an error message string if the call failed

import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  items: [],
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      // API call started — show a loading indicator
      return { ...state, loading: true, error: null };

    case FETCH_PRODUCTS_SUCCESS:
      // API call succeeded — store the products and stop loading
      return { ...state, loading: false, items: action.payload };

    case FETCH_PRODUCTS_FAILURE:
      // API call failed — store the error message and stop loading
      return { ...state, loading: false, error: action.payload };

    default:
      // All unknown actions return state unchanged
      return state;
  }
};

export default productReducer;
