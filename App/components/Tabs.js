
import React from 'react';
import { TouchableOpacity, Dimensions, Text, Image, View, StyleSheet } from 'react-native';

const TabBar = (props) => {
    return (    
        <View style={styles.tabBar}>
          <TouchableOpacity
            title={'Map'}
            style={styles.tab}
            onPress={() => props.setPage('map')}>
            <View>
              <Image style={styles.image} source={require('../assets/map.png')} />
              <Text>Map</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            title={'Report'}
            style={styles.tab}
            onPress={() => props.setPage('report')}
            >
            <Image style={styles.image} source={require('../assets/clipboard.png')} />
            <Text>Report</Text>
          </TouchableOpacity>
        </View>
    );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    tabBar: {
        alignItems: 'center',
        flexDirection: 'row',
        height: (height / 10),
        width: width,
        position: 'absolute',
        bottom: 0,
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FBF5F5',
  
      },
      tab: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
      },
      image: {
        height: 32,
        width: 32
      },
});

export default TabBar;