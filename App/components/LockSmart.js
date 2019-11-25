/**
 *
 * @format
 * @flow
 */

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';

import {connect} from 'react-redux';
import {fetchData} from '../redux/actions.js';

import Map from './Map';
import Menu from './Menu';

class LockSmart extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" />
          {this.props.reload && <Map/>}
          <Menu/>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  reload: !state.reducer.reload,
})

const mapDispatchToProps = dispatch => {
  return {
     fetchData: () => dispatch(fetchData()),
  }
}

//Map style
const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    ...StyleSheet.absoluteFillObject,
  },
});


export default connect(mapStateToProps,mapDispatchToProps)(LockSmart);