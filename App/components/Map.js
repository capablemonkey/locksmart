/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import { Dimensions, StyleSheet, Text, View, Button } from 'react-native';

import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("pk.eyJ1IjoiY2FwYWJsZW1vbmtleSIsImEiOiJjazMweGkwNGIwMzhwM2RwYmsxNmlsb2kzIn0.Ejr0e9n32Z0slM0eWKlFKw");

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCrimes: true,
      showRacks: true
    };
  }

  crimeShape() {
    const features = this.props.crimes.map((c) => {
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point", 
          "coordinates": [parseFloat(c.longitude), parseFloat(c.latitude)]
        }
      }
    });

    // console.log(features[0])

    return {
      "type": "FeatureCollection",
      "features": features
    };
  }

  racksShape() {
    const features = this.props.racks.map((c) => {
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point", 
          "coordinates": [parseFloat(c.location.longitude), parseFloat(c.location.latitude)]
        }
      }
    });

    // console.log(this.props.racks[0])
    // console.log(features[0])

    return {
      "type": "FeatureCollection",
      "features": features
    };
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Button title="Toggle Racks" onPress={()=> this.setState({showRacks: !this.state.showRacks})}></Button>
          <Button title="Toggle Crimes" onPress={()=> this.setState({showCrimes: !this.state.showCrimes})}></Button>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              zoomLevel={10}
              centerCoordinate={[-73.9911, 40.7359]}
            />

            <MapboxGL.ShapeSource
              id="crimes"
              shape={this.crimeShape()}
            >
              <MapboxGL.HeatmapLayer
                id="crimes"
                sourceID="crimes"
                style={{
                  visibility: this.state.showCrimes ? 'visible' : 'none',
                  heatmapRadius: [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10, 10,
                    15, 20
                  ],
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

            <MapboxGL.ShapeSource
              id="racks"
              shape={this.racksShape()}
            >
              <MapboxGL.CircleLayer
                id="racks"
                sourceID="racks"
                style={{
                  circleRadius: 1,
                  visibility: this.state.showRacks ? 'visible' : 'none',
                }}
               />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
};

const { height, width } = Dimensions.get('window');

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
