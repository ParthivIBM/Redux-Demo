// ─── Entry Point ──────────────────────────────────────────────────────────────
//
// Concept: Provider — a React component from react-redux that makes the Redux
// store available to every component in the tree via React context.
// Without <Provider>, no component can call useSelector/useDispatch or connect().
//
// The store is imported from store.js and passed as the `store` prop.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Provider wraps the entire app so any component can access the store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
