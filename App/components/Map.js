/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import { Dimensions, StyleSheet, Text, View, } from 'react-native';

import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("PUT YOUR TOKEN HERE");

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
  }

  crimeShape() {
    const features = this.props.crimeData.map((c) => {
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point", 
          "coordinates": [parseFloat(c.longitude), parseFloat(c.latitude)]
        }
      }
    });

    console.log(features[0])

    return {
      "type": "FeatureCollection",
      "features": features
    }
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              zoomLevel={10}
              centerCoordinate={[-73.9911, 40.7359]}
            />

            <MapboxGL.ShapeSource
              id="earthquakes"
              shape={this.crimeShape()}
            >
              <MapboxGL.HeatmapLayer
                id="earthquakes"
                sourceID="earthquakes"
                style={{
                  heatmapRadius: 10,
                  heatmapWeight: 1.0,
                  heatmapOpacity: 0.8,
                  heatmapIntensity: 1.0,
                  heatmapColor: [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0,
                    'rgba(33,102,172,0)',
                    0.2,
                    'rgb(103,169,207)',
                    0.4,
                    'rgb(209,229,240)',
                    0.6,
                    'rgb(253,219,199)',
                    0.8,
                    'rgb(239,138,98)',
                    1,
                    'rgb(178,24,43)',
                  ],
                }}
              />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
};

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: height,
    width: width,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  }
});
