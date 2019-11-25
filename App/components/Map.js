/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import {Dimensions, StyleSheet, Text, View, TouchableOpacity, Switch, Keyboard } from 'react-native';

import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from '@react-native-community/geolocation';
import SearchBar from './SearchBar';


MapboxGL.setAccessToken("pk.eyJ1IjoiY2FwYWJsZW1vbmtleSIsImEiOiJjazMweGkwNGIwMzhwM2RwYmsxNmlsb2kzIn0.Ejr0e9n32Z0slM0eWKlFKw");

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCrimes: true,
      showRacks: true ,
      location: [-73.9911, 40.7359],
      zoomLevel: 10,
      showList: false,
    };
  }

  updateShowList = (value) => {
    this.setState({
      showList: value,
    })
  }

  setCenter = (position) => {
    if(position.coordinates)
      this.setState({
        location: position.coordinates,
      })
    else if(position.coords)
      this.setState({
        location: [position.coords.longitude,position.coords.latitude],
        zoomLevel: 17,
      })
  }

  useUserLocation = () => {
    Geolocation.getCurrentPosition(this.setCenter);
  }

  handleUnhandledTouches = () => {
    Keyboard.dismiss();
    this.updateShowList(false);
    return false;
  }

  render() {
    return (
      <View style={styles.page} onStartShouldSetResponder={this.handleUnhandledTouches}>
        <View style={styles.container}>
          <SearchBar setLocation={this.setCenter} showList={this.state.showList} updateShowList={this.updateShowList}/>
          <MapboxGL.MapView style={styles.map} logoEnabled={false} onRegionDidChange={(e) => this.setCenter(e.geometry)}>
            <MapboxGL.Camera
              zoomLevel={this.state.zoomLevel}
              centerCoordinate={this.state.location}
              ref={ref => this.camera = ref}
              animationDuration={0}
            />

            <MapboxGL.ShapeSource
              id="crimes"
              shape={this.props.crimeShape}
            >
              <MapboxGL.HeatmapLayer
                id="crimes"
                sourceID="crimes"
                style={{
                  visibility: this.state.showCrimes&&this.props.dataParsed ? 'visible' : 'none',
                  heatmapRadius: [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    1,
                    9,
                    3,
                    12,
                    10,
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
              shape={this.props.rackShape}
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
                  visibility: this.state.showRacks&&this.props.dataParsed ? 'visible' : 'none',
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
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity title="User Location" onPress={this.useUserLocation}><Text> Use Current Location</Text></TouchableOpacity>
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
