// ─── Redux Store ──────────────────────────────────────────────────────────────
//
// Concept: Store — the single source of truth for all application state.
// Created once with createStore() and exported so <Provider> can receive it.
//
// Concept: Middleware — enhancers that sit between dispatching an action and
// the reducer receiving it. redux-thunk lets action creators return functions
// (for async work) instead of plain objects.
//
// applyMiddleware(thunk) is passed as the second argument to createStore().
//
// Note: Redux v5 exports legacy_createStore for the classic API (same behaviour,
// avoids the deprecation console warning). redux-thunk v3 uses a named export.

import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';

// createStore(reducer, enhancer)
// applyMiddleware wraps dispatch so thunk functions are intercepted and called
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
