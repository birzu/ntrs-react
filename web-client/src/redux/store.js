import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middlewares))
);

export default store;
