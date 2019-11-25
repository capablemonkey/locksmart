

export const FETCH_DATA = 'FETCH_DATA';
export const DISMISS_VIEW = 'DISMISS_VIEW';
export const SHOW_MENU = 'SHOW_MENU';
export const TOGGLE_RACKS = 'TOGGLE_RACKS';
export const TOGGLE_CRIMES = 'TOGGLE_CRIMES';
export const SHOW_LIST = 'SHOW_LIST';
export const SET_MAP_STYLE = "SET_MAP_STYLE";
export const RELOAD = "RELOAD";
export const SET_CAMERA = "SET_CAMERA";

export const fetchData = () => dispatch =>  {
  let getRacks = fetch("https://locksmart.herokuapp.com/racks")
      .then(response => response.json())
      .then((responseJson)=> {
        const features = responseJson.map((c) => {
          return {
            "type": "Feature",
            "geometry": {
              "type": "Point", 
              "coordinates": [parseFloat(c.location.longitude), parseFloat(c.location.latitude)]
            }
          }
        });
    
        // console.log(features[0])
    
        return {
          "type": "FeatureCollection",
          "features": features
        };
      })
      .catch(error=>console.log(error)) //to catch the errors if any
  
      let getCrimes = fetch("https://locksmart.herokuapp.com/crimes")
      .then(response => response.json())
      .then((responseJson)=> {
        let validatedCrimes = [];
        responseJson.forEach(element => {
          if(element.location.latitude !== null && element.location.longitude !== null)
            validatedCrimes.push(element.location);
        });
        const features = validatedCrimes.map((c) => {
          return {
            "type": "Feature",
            "geometry": {
              "type": "Point", 
              "coordinates": [parseFloat(c.longitude), parseFloat(c.latitude)]
            }
          }
        });
        return {
          "type": "FeatureCollection",
          "features": features
        };
 
      })
      .catch(error=>console.log(error)) //to catch the errors if any

      Promise.all([getRacks,getCrimes])
      .then(data => {
        let payload = {
          rackShape: data[0],
          crimeShape: data[1],
          dataParsed: true,
        }
        dispatch({
          type: FETCH_DATA,
          payload
        });
      })
}

export const dismissView = () => dispatch => {
  dispatch({
    type: DISMISS_VIEW,
  })
}

export const showMenu = () => dispatch => {
  dispatch({
    type: SHOW_MENU,
  })
}

export const toggleCrimes = () => dispatch => {
  dispatch({
    type: TOGGLE_CRIMES,
  })
}

export const toggleRacks = () => dispatch => {
  dispatch({
    type: TOGGLE_RACKS,
  })
}

export const showList = (payload) => dispatch => {
  dispatch({
    type: SHOW_LIST,
    payload,
  })
}

export const setMapStyle = (payload) => dispatch => {
  dispatch({
    type: SET_MAP_STYLE,
    payload,
  })
}

export const reload = () => dispatch => {
  dispatch({
    type: RELOAD,
  })
  dispatch({
    type: RELOAD,
  })
}

export const setCamera = (payload) => dispatch => {
  dispatch({
    type: SET_CAMERA,
    payload: {
      location: payload.location,
      zoomLevel: payload.zoomLevel
    }
  })
}
