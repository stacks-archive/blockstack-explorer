import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// import AppsStore from '@stores/apps';
// import UserStore from '@stores/user';

export default (data) => {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const finalCreateStore = composeEnhancers(applyMiddleware(thunk))(createStore);

  const Reducer = combineReducers({
    // apps: AppsStore.makeReducer(data),
  });

  return finalCreateStore(Reducer);
};
