/**
 *
 * @format
 * @flow
 */

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  StatusBar,
  View,
  Dimensions,
} from 'react-native';

import TabBar from './components/Tabs';
import Map from './components/Map';
import Report from './components/Report';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'map',
      crimeShape: {},
      rackShape: {},
      dataParsed: false,
    }
    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    /*
      Data format
      {
        location: {
          latitude: 23123123,
          longitude: 321312
        },
        key: 2132
      }
    */
  
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
        this.setState({
          rackShape: data[0],
          crimeShape: data[1],
          dataParsed: true,
        })
      })

  }

  setPage = (page) => {
    this.setState({
      page,
    })
  }

  render() {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        {
          this.state.page === 'map' && this.state.dataParsed &&
            <Map
              crimeShape={this.state.crimeShape}
              rackShape={this.state.rackShape}/>
        }
        {
          this.state.page === 'report' &&
          <Report/>
        }
        <TabBar setPage={this.setPage}/>
      </View>
    );
  }
};

const { height, width } = Dimensions.get('window');

//Map style
const styles = StyleSheet.create({
    screen: {
      flexDirection: 'column',
      ...StyleSheet.absoluteFillObject,
    },
    tabBar: {
      alignItems: 'center',
      flexDirection: 'row',
      height: (height / 10),
      width: width,
      position: 'absolute',
      bottom: 0,
      alignContent: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#FBF5F5',

    },
    tab: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
    },
    image: {
      height: 32,
      width: 32
    },
  });

export default App;