/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Dimensions, StyleSheet, View, Keyboard } from 'react-native';

import MapboxGL from "@react-native-mapbox-gl/maps";
import SearchBar from './SearchBar';
import HamburgerButton from './HamburgerButton';
import {setCenter, setZoom, dismissView} from '../redux/actions';

MapboxGL.setAccessToken("pk.eyJ1IjoiY2FwYWJsZW1vbmtleSIsImEiOiJjazMweGkwNGIwMzhwM2RwYmsxNmlsb2kzIn0.Ejr0e9n32Z0slM0eWKlFKw");

class Map extends Component {
  constructor(props) {
    super(props);
  }

  setCenter = (position) => {
    if(position.coordinates)
      this.props.setCenter(position.coordinates)
    else if(position.coords) {
      this.props.setCenter([position.coords.longitude,position.coords.latitude])
      this.props.zoomLevel(17)
    }
  }

  handleUnhandledTouches = () => {
    Keyboard.dismiss();
    this.props.dismissView();
    return false;
  }

  render() {
    return (
      <View style={styles.page} onStartShouldSetResponder={this.handleUnhandledTouches}>
        <View style={styles.container}>
          <HamburgerButton />
          <SearchBar/>
          <MapboxGL.MapView style={styles.map} logoEnabled={false} onRegionDidChange={(e) => this.setCenter(e.geometry)}>
            <MapboxGL.Camera
              zoomLevel={this.props.zoomLevel}
              centerCoordinate={this.props.location}
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
                  visibility: this.props.showCrimes&&this.props.dataParsed ? 'visible' : 'none',
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
                  visibility: this.props.showRacks&&this.props.dataParsed ? 'visible' : 'none',
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

const mapStateToProps = state => ({
  showCrimes: state.reducer.showCrimes,
  showRacks: state.reducer.showRacks,
  location: state.reducer.location,
  zoomLevel: state.reducer.zoomLevel,
  dataParsed: state.reducer.dataParsed,
  crimeShape: state.reducer.crimeShape,
  rackShape: state.reducer.rackShape,
})

const mapDispatchToProps = dispatch => {
  return {
    setCenter: (payload) => dispatch(setCenter(payload)),
    setZoom: (payload) => dispatch(setZoom(payload)),
    dismissView: () => dispatch(dismissView()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Map)
