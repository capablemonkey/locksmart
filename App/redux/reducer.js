import {
  FETCH_DATA,
  SET_CENTER,
  SET_ZOOM,
  DISMISS_VIEW,
  SHOW_MENU,
  TOGGLE_RACKS,
  TOGGLE_CRIMES,
  SHOW_LIST,
} from './actions';

import {combineReducers} from 'redux';

const initialState = {
  crimeShape: {},
  rackShape: {},
  showRacks: true,
  showCrimes: true,
  dataParsed: false,
  showMenu: false,
  showList: false,
  location: [-73.9911, 40.7359],
  zoomLevel: 10,
  styleURL: "Default",
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA:
      return Object.assign({}, state, {
        rackShape: action.payload.rackShape,
        crimeShape: action.payload.crimeShape,
        dataParsed: true,
      })
    case SET_CENTER:
      return Object.assign({}, state, {
        location: action.payload
      })
    case SET_ZOOM:
      return Object.assign({}, state, {
        zoomLevel: action.payload
      })
    case DISMISS_VIEW:
      return Object.assign({}, state, {
        showList: false,
        showMenu: false,
      })
    case SHOW_MENU:
      return Object.assign({}, state, {
        showMenu: true,
      })
    case TOGGLE_RACKS: 
      return Object.assign({}, state, {
        showRacks: !state.showRacks
      })
    case TOGGLE_CRIMES:
      return Object.assign({}, state, {
        showCrimes: !state.showCrimes
      })
    case SHOW_LIST: 
      return Object.assign({}, state, {
        showList: action.payload
      })
    default: 
      return state;
  }
}

export default rootReducer = combineReducers({
  reducer:reducer
});