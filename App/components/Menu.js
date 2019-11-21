import React from 'react';
import {View, Switch, Text, StyleSheet, Dimensions, Button, Animated} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {setCenter, setZoom, toggleRacks, toggleCrimes} from '../redux/actions';

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: new Animated.Value(-(.75*width))
    }
  }

  slide = () => {
    if(this.props.showMenu)
      Animated.spring(this.state.x, {
        toValue: 0,
      }).start();
    else
    Animated.spring(this.state.x, {
      toValue: -(.75*width),
    }).start();
  };

  setCenter = (position) => {
    if(position.coordinates)
      this.props.setCenter(position.coordinates)
    else if(position.coords) {
      this.props.setCenter([position.coords.longitude,position.coords.latitude])
      this.props.setZoom(17)
    }
  }

  useUserLocation = () => {
    Geolocation.getCurrentPosition(this.setCenter);
  }

  render() {
    this.slide();
    return (
      <Animated.View style={styles.menu} style={[styles.menu, {
        transform: [
          {
            translateX: this.state.x
          }
        ]
      }]}>
        <Text style={styles.title}>LockSmart</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.setting}>
            <View>
              <Text style={styles.switchTitle}>Racks</Text>
              <Text style={styles.switchTitle}>Crimes</Text>
            </View>
            <View >
              <Switch style={styles.switch} title="Toggle Racks" value={this.props.showRacks} onValueChange={() => this.props.toggleRacks()}></Switch>
              <Switch style={styles.switch} title="Toggle Crimes" value={this.props.showCrimes} onValueChange={() => this.props.toggleCrimes()}></Switch>
            </View>
          </View>
          <Button style={styles.userLocationButton} title={"Use Current Location"} onPress={() => this.useUserLocation()}></Button>

        </View>
      </Animated.View>
    )
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    position:'absolute',
    left: 0,
    height: height,
    width: .75*width,
    backgroundColor: 'white',
    zIndex: 15,
    alignContent: 'center',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flexDirection:'column',
  },
  title: {
    paddingTop:'20%',
    width: .75*width,
    paddingBottom: '10%',
    backgroundColor: '#3e64ff',
    flexDirection:'row',
    alignItems:'center',
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center',
    fontSize: 40,
  },  
  section: {
    width: '100%',
    height: '70%',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlign:'center',
    borderBottomWidth: 5,
    borderBottomColor: 'black',
  },
  setting: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
  },
  switchTitle: {
    fontSize:20,
    paddingBottom:20,
    paddingRight: 30
  },
  switch: {
    paddingBottom:50
  },
  userLocationButton: {
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: 'black',
    padding: 10,
    color:'white',
    backgroundColor: '#337ab7',
    alignSelf:'center',
    width:'100%',
  }
})

const mapStateToProps = state => ({
  showRacks: state.reducer.showRacks,
  showCrimes: state.reducer.showCrimes,
  showMenu: state.reducer.showMenu,
});

const mapDispatchToProps = dispatch => {
  return{
    setCenter: (payload) => dispatch(setCenter(payload)),
    setZoom: (payload) => dispatch(setZoom(payload)),
    toggleCrimes: () => dispatch(toggleCrimes()),
    toggleRacks: () => dispatch(toggleRacks())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu);