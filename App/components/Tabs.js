
import React from 'react';
import { Button, Dimensions, Text, Image, View, StyleSheet } from 'react-native';

const TabBar = () => {
    return (
        <View style={styles.tabBar}>
            <View title={'map'} style={styles.tab}>
                <Image style={styles.image} source={require('../assets/map.png')} />
                <Text>Map</Text>
            </View>
            <View title={'Report'} style={styles.tab}>
                <Image style={styles.image} source={require('../assets/clipboard.png')} />
                <Text>Report</Text>
            </View>
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
        height: 35,
        width: 35
    },

});

export default TabBar;