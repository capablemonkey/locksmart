import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const middleWare = [thunk];
const store = createStore(reducer, applyMiddleware(...middleWare));

export default store;