/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const data = require('./SampleData/racks.json');

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ClusteredMapView from 'react-native-maps-super-cluster';

import MapView, { 
  PROVIDER_GOOGLE,
  Marker,
  Callout,
} from 'react-native-maps';

//Map
const App = () => {

  let mapData = [];

  function convertData(){
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
    data.map(value => {
      let location = {
        longitude: value.longitude,
        latitude: value.latitude
      }
      mapData.push({location:location});
    })
  }


  //renders pins
  function renderMarker(pin) {
    return (
      <Marker coordinate={pin.location} />
    )
  }

  //renders cluster
  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
          coordinate = cluster.coordinate,
          clusterId = cluster.clusterId

    return (
      <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
        <View style={styles.clusterContainer}>
          <Text style={styles.clusterText}>
            {pointCount}
          </Text>
        </View>
      </Marker>
    )
  }

  //inital location
  const INIT_REGION = {
    latitude: 40.7678,
    longitude: -73.9645,
    latitudeDelta: 0.15,
    longitudeDelta: 0.121,
  }

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView> 
        <View style={styles.container}>
          {convertData()}
          <ClusteredMapView
            style={styles.map}
            initialRegion = {INIT_REGION}
            data={mapData}
            renderMarker = {renderMarker}
            renderCluster={renderCluster}
            minZoom = {5}
            animateClusters = {false}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

//Map style
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 1000,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  clusterContainer: {
    width: 30,
    height: 30,
    padding: 6,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default App;
