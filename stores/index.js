import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import AccountsStore from '@stores/accounts';
import { Reducer as AuthReducer } from '@stores/auth';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const finalCreateStore = composeEnhancers(applyMiddleware(thunk))(createStore);

const Reducer = combineReducers({
  accounts: AccountsStore.reducer,
  auth: AuthReducer,
});

export default finalCreateStore(Reducer);
