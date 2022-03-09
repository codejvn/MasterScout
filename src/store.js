import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './Reducers';

import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
	// compose(applyMiddleware(thunk))
); //reducer
export default store;
