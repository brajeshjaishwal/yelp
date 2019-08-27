import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
//import logger from 'redux-logger';
import * as search from './searchService';

export default function configureStore() {
  const reducers = {
    search: search.reducer,
  };

  const middleware = [
    thunk,
    //logger,
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const rootReducer = combineReducers({
    ...reducers
  });

  return createStore(
    rootReducer,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
