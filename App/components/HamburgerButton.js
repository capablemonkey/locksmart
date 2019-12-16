import React from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import {showMenu} from '../redux/actions'


const hamburgerButton = (props) => {

  updateShowMenu = () => {
    props.showMenu();
  }
  
  return(
    <TouchableOpacity activeOpacity={1} style={styles.hamburgerMenu} onPress={this.updateShowMenu}>
      <Text style={styles.menuButton} allowFontScaling={true}>&#x2630;</Text>
    </TouchableOpacity>
  );
  
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  hamburgerMenu: {
    height: 0.045 * height,
    position: 'absolute',
    top: '10%',
    width: '10%',
    zIndex: 10,
    alignSelf:'flex-start'

  },
  menuButton: {
    fontSize: 45,
    alignSelf:'center'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    showMenu: () => dispatch(showMenu()),
  }
}


export default connect(null,mapDispatchToProps)(hamburgerButton);