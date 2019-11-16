/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import { Dimensions, StyleSheet, Text, View, } from 'react-native';
import { Heatmap, Marker, PROVIDER_GOOGLE}  from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 40.7359,
        longitude: -73.9911,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
    }

    this.renderMarker = this.renderMarker.bind(this);
    this.renderCluster = this.renderCluster.bind(this);
  }

  //renders pins
  renderMarker(pin) {
    return (
      <Marker coordinate={pin.location} key={pin.id} tracksViewChanges={false}/>
    )
  }

  //renders cluster
  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate,
      clusterId = cluster.clusterId

    return (
      <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress} tracksViewChanges={false}>
        <View style={styles.clusterContainer}>
          <Text style={styles.clusterText}>
            {pointCount}
          </Text>
        </View>
      </Marker>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <ClusteredMapView
          style={styles.map}
          initialRegion={this.state.region}
          data={this.props.markerData}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          provider={PROVIDER_GOOGLE} 
          minZoom={10}
          animateClusters={false}
        >
          <Heatmap
            points={this.props.crimeData}
            radius={100}
            opacity={1}
            gradient={{
              colors: ["#ffc302", "#ff8f00", "#ff5b00", "#ff0505"],
              startPoints: [0.01, 0.02, 0.3, 0.4],
              colorMapSize: 256
            }}
          ></Heatmap>
        </ClusteredMapView>
      </View>
    );
  }
};

var { height, width } = Dimensions.get('window');

//Map style
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: (9 * height / 10),
    width: width,
  },
  clusterContainer: {
    width: 35,
    height: 35,
    padding: 6,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
