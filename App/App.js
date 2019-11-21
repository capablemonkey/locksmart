/**
 *
 * @format
 * @flow
 */

import React from 'react';

import LockSmart from './components/LockSmart';
//import your Provider
import { Provider } from 'react-redux';
//import your store
import store from './redux/store';

export default App = () => {
  return(
    <Provider store={store}>
      <LockSmart/>
    </Provider>
  )
}