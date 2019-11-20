import React from 'react';
import {Dimensions, Image, View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { GOOGLE_API_KEY } from 'react-native-dotenv'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: '',
            locationList: [],
        }
        this.searchLocation = this.searchLocation.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.setLocation = this.setLocation.bind(this);
    }
    searchLocation = (text) => {
        this.setState({
            searchField: text
        })
    }

    searchSubmit = async () => {
        let query = this.state.searchField.replace(' ',('+'))
        await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=${GOOGLE_API_KEY}&query=${query}&location=40.7128,-74.0060`)
        .then(response => response.json())
        .then((responseJson)=> {
            this.setState({
            locationList: responseJson.results,
            })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    setLocation = (location) => {
        let geometry = {
            coords: {
                longitude: location.lng,
                latitude: location.lat
            }
        };
        this.props.setLocation(geometry);
        this.searchBar.clear();
        this.setState({
            locationList: []
        });
    }

    renderListItems = ({item}) => (
        <TouchableOpacity style={styles.listItem} key={item.name} onPress={()=>this.setLocation(item.geometry.location)}>
            <Image
                style={{alignSelf:'center', width: 25, height: 25}}
                source={{uri: item.icon}}
            />
            <View style={{height: 50, width: 300}}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.address}>{item.formatted_address}</Text>
            </View>
        </TouchableOpacity>
        
    );

    render() {
        return(
            <View style={styles.searchArea}>
                <View style={styles.searchBar}>
                    <Text style={{borderRightWidth:1, borderRightColor:'black'}}>&#x1f50d;</Text>
                    <TextInput  
                        placeholder={"Search for a place or address"} 
                        onChangeText={this.searchLocation} 
                        returnKeyType='search' 
                        onSubmitEditing={this.searchSubmit}
                        ref={ref => this.searchBar = ref}>
                    </TextInput>
                </View>
                <FlatList
                    data={this.state.locationList}
                    renderItem={this.renderListItems}
                    style={styles.ItemList}
                />
            </View>
        )
    }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    searchArea: {
        height: '50%',
        position: 'absolute',
        top: '10%',
        marginLeft: '5%',
        marginRight: '5%',
        width: '90%',
        zIndex: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    searchBar:{
        height: '8%', 
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: '90%',
        backgroundColor: 'white',
        shadowRadius: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ItemList:{
        width: '90%',
        height: height/2,
    },
    listItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderTopColor: 'black',
        borderTopWidth: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 2,
        alignContent: 'flex-start',
        justifyContent: 'flex-start'
    },
    address: {
        flexWrap: 'wrap'
    }
})