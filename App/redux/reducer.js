import {
  FETCH_DATA,
  DISMISS_VIEW,
  SHOW_MENU,
  TOGGLE_RACKS,
  TOGGLE_CRIMES,
  SHOW_LIST,
  SET_MAP_STYLE,
  RELOAD,
  SET_CAMERA,
  GET_CAMERA
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
  reload: false,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA:
      return Object.assign({}, state, {
        rackShape: action.payload.rackShape,
        crimeShape: action.payload.crimeShape,
        dataParsed: true,
      })
    case SET_CAMERA:
      if(action.payload.location === state.location || action.payload.zoomLevel === state.zoomLevel)
        return Object.assign({}, state, {
          location: [action.payload.location[0] + 0.0000001,action.payload.location[1] + 0.0000001],
          zoomLevel: action.payload.zoomLevel + 0.0000001,
        })
      else 
        return Object.assign({}, state, {
        location: action.payload.location,
        zoomLevel: action.payload.zoomLevel,
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
    case SET_MAP_STYLE:
      return Object.assign({}, state, {
        styleURL: action.payload,
      })
    case RELOAD:
        return Object.assign({}, state, {
          reload: !state.reload,
        })
    default: 
      return state;
  }
}

export default rootReducer = combineReducers({
  reducer:reducer
});