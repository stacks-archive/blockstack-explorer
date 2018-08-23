import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import AccountsStore from '@stores/accounts';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const finalCreateStore = composeEnhancers(applyMiddleware(thunk))(createStore);

const Reducer = combineReducers({
  accounts: AccountsStore.reducer,
});

export default finalCreateStore(Reducer);
