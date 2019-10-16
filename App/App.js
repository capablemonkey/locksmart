/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import { StyleSheet, StatusBar, Text, View} from 'react-native';
import {Heatmap, Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const data = require('./SampleData/racks.json');
const crime = require('./SampleData/crime.json');

const App = () => {

  let mapData = [];
  let crimeData = [];

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

    crime.map(value => {
      let data = {
        longitude: value.longitude,
        latitude: value.latitude,
        weight: 1,
      }
      crimeData.push(data);
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
    latitude: 40.85858397000004,
    longitude: -73.90869606999998,
    latitudeDelta: 0.15,
    longitudeDelta: 0.121,
  }
  /*
  */

  return (
    <View>
      <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          {convertData()}         
            <ClusteredMapView
            style={styles.map}
            initialRegion = {INIT_REGION}
            data={mapData}
            renderMarker = {renderMarker}
            renderCluster={renderCluster}
            minZoom = {10}
            animateClusters = {false}
          >
            <Heatmap
              points={crimeData}
              radius={20}
              opacity={1}
              gradient={{
                  colors: ["#fff600","#ffc302", "#ff8f00", "#ff5b00", "#ff0505"],
                  startPoints: [0.05, 0.10, 0.20, 0.40, 1],
                  colorMapSize: 500
              }}
          ></Heatmap>
          </ClusteredMapView>
        </View>
    </View>
  );
};

//Map style
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
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
