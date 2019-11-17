/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import { Dimensions, StyleSheet, Text, View, Button, Switch } from 'react-native';

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
          <MapboxGL.MapView style={styles.map} logoEnabled={false}>
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
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    1,
                    9,
                    3,
                    12,
                    15,
                    22,
                    150
                  ],
                  heatmapWeight: 1.0,
                  heatmapOpacity: 0.6,
                  heatmapIntensity: [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    0.1,
                    12,
                    0.3,
                    22,
                    1.0
                  ],
                  heatmapColor: [
                    "interpolate",
                    ["linear"],
                    ["heatmap-density"],
                    0,
                    "hsla(65, 100%, 50%, 0)",
                    0.1,
                    "hsla(52, 73%, 57%, 0.97)",
                    0.3,
                    "hsl(29, 100%, 50%)",
                    0.5,
                    "hsl(21, 100%, 50%)",
                    1,
                    "hsl(0, 97%, 63%)"
                  ],
                }}
              />
            </MapboxGL.ShapeSource>

            <MapboxGL.UserLocation />

            <MapboxGL.ShapeSource
              id="racks"
              shape={this.racksShape()}
            >
              <MapboxGL.CircleLayer
                id="racks"
                sourceID="racks"
                style={{
                  circleRadius: [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    10,
                    1,
                    15,
                    3,
                    22,
                    10
                  ],
                  circleColor: "hsl(129, 69%, 40%)",
                  visibility: this.state.showRacks ? 'visible' : 'none',
                }}
               />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>

          <View style={{zIndex: 10, width: 110, left: 10, top: -100, backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 10, padding: 5 }}>
            <View style={{flexDirection: 'row'}}>
              <Switch title="Toggle Racks" value={this.state.showRacks} onChange={()=> this.setState({showRacks: !this.state.showRacks})}></Switch>
              <Text>Racks</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Switch title="Toggle Crimes" value={this.state.showCrimes} onChange={()=> this.setState({showCrimes: !this.state.showCrimes})}></Switch>
              <Text>Crimes</Text>
            </View>
          </View>
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
