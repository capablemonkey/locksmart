import React from 'react';
import {View, Switch, Text, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {setCenter, setZoom, toggleRacks, toggleCrimes} from '../redux/actions';


class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: new Animated.Value(-(.75*width)),
      text: "",
    }
  }

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

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

  setStyle = (payload) => {
    this.props.setMapStyle(payload);
    this.hideMenu();
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
            <Text style={styles.switchTitle}>Display Racks</Text>
            <Switch style={styles.switch} title="Toggle Racks" value={this.props.showRacks} onValueChange={() => this.props.toggleRacks()}></Switch>   
          </View>
          <View style={styles.setting}>
            <Text style={styles.switchTitle}>Display Crimes</Text>
            <Switch style={styles.switch} title="Toggle Crimes" value={this.props.showCrimes} onValueChange={() => this.props.toggleCrimes()}></Switch>
          </View>
          <View style={styles.setting}>
            <TouchableOpacity activeOpacity={0.5} style={styles.userLocationButton} onPress={() => this.useUserLocation()}>
              <Text style={{color:'#3f72af', textAlign:'center', fontSize:20}}>Use Current Location</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor:'white',
    zIndex: 15,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  
    elevation: 5
  },
  title: {
    paddingTop:'20%',
    width: .75*width,
    paddingBottom: '5%',
    flexDirection:'row',
    alignItems:'center',
    fontWeight: 'bold',
    color: 'black',
    textAlign:'center',
    fontSize: 40,
  },  
  section: {
  },
  sectionTitle: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 10,
    color: 'white',
  },  
  setting: {
    flexDirection: 'row',
    width: '70%',
    alignItems:'center',
    justifyContent:'space-between',
    paddingBottom:20,
    marginLeft: 30,
  },
  switchTitle: {
    fontSize:20,
  },
  switch: {
  },
  userLocationButton: {
    alignSelf:'center',
    width:'100%',
    alignItems: 'center',
    justifyContent:'center'
  }
})

const mapStateToProps = state => ({
  showRacks: state.reducer.showRacks,
  showCrimes: state.reducer.showCrimes,
  showMenu: state.reducer.showMenu,
  styleURL: state.reducer.styleURL,
});

const mapDispatchToProps = dispatch => {
  return{
    setCenter: (payload) => dispatch(setCenter(payload)),
    setZoom: (payload) => dispatch(setZoom(payload)),
    toggleCrimes: () => dispatch(toggleCrimes()),
    toggleRacks: () => dispatch(toggleRacks()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu);