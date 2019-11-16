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
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import TabBar from './components/Tabs';
import Map from './components/Map';
import Report from './components/Report';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'map',
      crimes: [],
      racks: [],
    }
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
  
    fetch("https://locksmart.herokuapp.com/racks")
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          racks: responseJson,
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
  
      fetch("https://locksmart.herokuapp.com/crimes")
      .then(response => response.json())
      .then((responseJson)=> {
        const validatedCrimes = [];
        responseJson.forEach(element => {
          if(element.location.latitude !== null && element.location.longitude !== null)
            validatedCrimes.push(element.location);
          /*
          else console.log(element.complaint_number);
          */
        });
        this.setState({
          crimes: validatedCrimes,
        });
      })
      .catch(error=>console.log(error)) //to catch the errors if any

  }


  render() {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        {
          this.state.page === 'map' &&
            <Map
              crimes={this.state.crimes}
              racks={this.state.racks}/>
        }
        {
          this.state.page === 'report' &&
          <Report/>
        }

        <View style={styles.tabBar}>
          <TouchableOpacity
            title={'Map'}
            style={styles.tab}
            onPress={() => {this.setState({page: 'map'})}}>
            <View>
              <Image style={styles.image} source={require('./assets/map.png')} />
              <Text>Map</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            title={'Report'}
            style={styles.tab}
            onPress={() => {this.setState({page: 'report'})}}
            >
            <Image style={styles.image} source={require('./assets/clipboard.png')} />
            <Text>Report</Text>
          </TouchableOpacity>
        </View>
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