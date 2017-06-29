import thunk from 'redux-thunk';
import rootReducer from './root_reducer';
import { applyMiddleware, createStore } from 'redux';

const _defaultState: object = {};

const configureStore = (preloadedState = _defaultState) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk),
  )
);

export default configureStore;
