import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './Reducers'
const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )); //reducer
export default store;