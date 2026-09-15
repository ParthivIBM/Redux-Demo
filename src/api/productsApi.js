// ─── Products API ─────────────────────────────────────────────────────────────
//
// Encapsulates all HTTP logic for products.
// Keeping API calls in a dedicated file separates concerns:
//   - This file knows *how* to fetch (axios, endpoint, params)
//   - productActions.js knows *when* to fetch and what to dispatch
//
// The thunk in productActions.js imports this function so it never
// contains raw axios/fetch calls itself.

import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

// Fetches the default product list (30 items) and returns the products array.
// Throws on network / HTTP errors so the thunk can catch them.
export const fetchProductsApi = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  // API returns { products: [...], total, skip, limit } — we only need the array
  return response.data.products;
};
