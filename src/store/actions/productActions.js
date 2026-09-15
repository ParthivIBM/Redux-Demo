// ─── Product Async Action Creator (Thunk) ───────────────────────────────────
//
// Concept: Redux Thunk middleware — instead of returning a plain action object,
// a thunk action creator returns a *function* that receives `dispatch` as an
// argument. This lets us run async code (API calls) and dispatch multiple
// actions over time (request → success/failure).

import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from './actionTypes';
import { fetchProductsApi } from '../../api/productsApi';

// fetchProducts is a thunk: it returns a function instead of a plain object.
// redux-thunk intercepts it and calls it with (dispatch, getState).
export const fetchProducts = () => async (dispatch) => {
  // 1. Notify the store that a request has started (sets loading: true)
  dispatch({ type: FETCH_PRODUCTS_REQUEST });

  try {
    // 2. Call the API layer — all fetch logic lives in productsApi.js
    const products = await fetchProductsApi();

    // 3. Dispatch success with the products array as the payload
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    // 4. Dispatch failure with the error message as the payload
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};
