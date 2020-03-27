import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as Auth from '../actions/Users';

export function configureStore() {
  let store = createStore(reducers, {}, applyMiddleware(thunk));
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(logger, thunk)));
  }
  store.dispatch(Auth.logInUseOldJWT(localStorage.getItem('Authorization')));
  return store;
}
