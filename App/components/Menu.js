import React from 'react';
import {View, Switch, Text, StyleSheet, Dimensions, Animated, TouchableOpacity, TextInput, Button} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {setCamera, toggleRacks, toggleCrimes, setMapStyle, reload} from '../redux/actions';
import Dropdown, { MenuItem, MenuDivider } from 'react-native-material-menu';
import DateTimePicker from '@react-native-community/datetimepicker';

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: new Animated.Value(-(.75*width)),
      text: "",
      address: '',
      zipCode: '',
      date: new Date(),
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
      Animated.timing(this.state.x, {
        toValue: 0,
        duration: 150,
      }).start();
    else
      Animated.timing(this.state.x, {
        toValue: -(.75*width),
        duration: 150,
      }).start();
  };

  setCenter = (position) => {
    this.props.setCamera({
      location: [position.coords.longitude,position.coords.latitude],
      zoomLevel: 17
    })
  }

  useUserLocation = () => {
    Geolocation.getCurrentPosition(this.setCenter);
  }

  setStyle = (payload) => {
    this.props.setMapStyle(payload);
    this.hideMenu();
    this.props.reload();
  }

  setAddress = (newAddress) => {
    this.setState({address: newAddress});
  }

  setZipCode = (newZipCode) => {
    this.setState({zipCode: newZipCode});
  }

  submitButton = () => {
    let address = this.state.address+this.state.zipCode;
    let date = (this.state.date.getMonth() + 1) + "/" + this.state.date.getDate() + "/" + this.state.date.getFullYear();
    let url = "https://locksmart.herokuapp.com/newcrime?address=" + address + "&date=" + date;
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    .then((response) => response.text())
    .then(text => console.log(text))
    .catch((error) =>{
        console.error(error);
    }) 
    
  }

  setDate = (event,newDate) => {
    this.setState({date: newDate});
  }

  render() {
    this.slide();
    return (
      <Animated.View 
        style={[styles.menu, {
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
            <Text style={styles.switchTitle}>Map Style</Text>
            <Dropdown
              ref={this.setMenuRef}
              button={<Text onPress={this.showMenu} style={styles.dropdown}>{this.props.styleURL}</Text>}
            >
              <MenuItem key={"Default"} onPress={()=>this.setStyle("Default")}>Default</MenuItem>
              <MenuDivider />
              <MenuItem key={"Light"} onPress={()=>this.setStyle("Light")}>Light</MenuItem>
              <MenuDivider />
              <MenuItem key={"Dark"} onPress={()=>this.setStyle("Dark")}>Dark</MenuItem>
              <MenuDivider />
              <MenuItem key={"Satellite"} onPress={()=>this.setStyle("Satellite")}>Satellite</MenuItem>
            </Dropdown>
          </View>
          <View style={styles.setting}>
            <TouchableOpacity activeOpacity={0.5} style={styles.userLocationButton} onPress={() => this.useUserLocation()}>
              <Text style={{color:'#3f72af', textAlign:'center', fontSize:20}}>Use Current Location</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report</Text>
          <View style={styles.report}>
            <TextInput textContentType={'fullStreetAddress'} placeholder={'Address'} style={styles.field} onChangeText={this.setAddress}/>
            <TextInput textContentType={'postalCode'} placeholder={'ZipCode'} style={styles.field} onChangeText={this.state.setZipCode}/>
            <View>
              <DateTimePicker mode={'date'} value={this.state.date} onChange={this.setDate}/>
            </View>
            <Button title={'Submit'} style={styles.submitButton} onPress={this.submitButton}></Button>
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
    paddingVertical:'15%',
    width: .75*width,
    flexDirection:'row',
    alignItems:'center',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#5f6769',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },  
  section: {
    alignContent:'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 30,
    paddingVertical: 10,
    paddingLeft: 30,
    color: 'black',
    fontWeight: 'bold',
  },  
  setting: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom:20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  switchTitle: {
    fontSize:20,
    paddingVertical: 10,
  },
  switch: {
  },
  userLocationButton: {
    width:'100%',
  },
  dropdown: {
    alignSelf: 'center',
    paddingVertical: 5,
    fontSize: 20,
    padding: 30,
    backgroundColor: '#e5dfdf',
    opacity: 0.8,
  },
  report: {
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom:20,
    paddingHorizontal: 30,
  },
  field: {
    height: 30,
    width: '100%',
    borderWidth: 1,
    marginTop: 20,
  },
})

const mapStateToProps = state => ({
  showRacks: state.reducer.showRacks,
  showCrimes: state.reducer.showCrimes,
  showMenu: state.reducer.showMenu,
  styleURL: state.reducer.styleURL,
  location: state.reducer.location,
});

const mapDispatchToProps = dispatch => {
  return{
    setCamera: (payload) => dispatch(setCamera(payload)),
    setMapStyle: (payload) => dispatch(setMapStyle(payload)),
    toggleCrimes: () => dispatch(toggleCrimes()),
    toggleRacks: () => dispatch(toggleRacks()),
    reload: () => dispatch(reload()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu);