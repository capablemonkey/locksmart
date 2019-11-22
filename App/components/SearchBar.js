import React from 'react';
import {Dimensions, Image, View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, TouchableHighlight} from 'react-native';
import { GOOGLE_API_KEY } from 'react-native-dotenv'
import {connect} from 'react-redux';
import {showList,setCenter,setZoom} from '../redux/actions' 

class SearchBar extends React.Component {
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
        this.onFocus = this.onFocus.bind(this);
    }
    searchLocation = (text) => {
        this.setState({
            searchField: text,
        });
        this.props.updateShowList(false);
    }

    searchSubmit = async () => {
        if(this.state.searchField === '') return;
        let query = this.state.searchField.replace(' ',('+'))
        await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=${GOOGLE_API_KEY}&query=${query}&location=40.7128,-74.0060`)
        .then(response => response.json())
        .then((responseJson)=> {
            this.setState({
                locationList: responseJson.results,
            });
            this.props.updateShowList(true);
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
        this.setCenter(geometry);
        this.searchBar.clear();
        this.setState({
            locationList: [],
            searchField: '',
        });
        this.props.updateShowList(false);
    }

    clearSearch = () => {
        this.searchBar.clear();
        this.setState({
            locationList: [],
            searchField: '',
        });
        this.props.updateShowList(false);
    }

    setCenter = (position) => {
        if(position.coordinates)
          this.props.setCenter(position.coordinates)
        else if(position.coords) {
          this.props.setCenter([position.coords.longitude,position.coords.latitude])
          this.props.setZoom(17)
        }
      }

    renderListItems = ({item}) => (
        <TouchableHighlight key={item.name} onPress={()=>this.setLocation(item.geometry.location)}>
            <View style={styles.listItem}>
                <Image
                    style={{alignSelf:'center', width: 25, height: 25}}
                    source={{uri: item.icon}}
                />
                <View style={{height: 50, width: 300}}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.address}>{item.formatted_address}</Text>
                </View>
            </View>
        </TouchableHighlight>
        
    );
    
    onFocus = () => {
        if (Array.isArray(this.state.locationList) && this.state.locationList.length) {
            this.props.updateShowList(true);
        }
    }

    render() {
        return(
            <View style={styles.searchArea}>
                <View style={styles.searchBar}>
                    <Text>&#x1f50d;</Text>
                    <TextInput  
                        placeholder={"Search for a place or address"} 
                        onChangeText={this.searchLocation}
                        onFocus={this.onFocus}
                        returnKeyType='search' 
                        onSubmitEditing={this.searchSubmit}
                        ref={ref => this.searchBar = ref}
                        style={styles.searchBox}>
                    </TextInput>
                    <TouchableOpacity onPress={this.clearSearch}><Text>&#10006;</Text></TouchableOpacity>
                </View>
                {
                    this.props.showList && <FlatList
                    bounces={false}
                    overScrollMode={'never'}
                    keyboardDismissMode={'on-drag'}
                    data={this.state.locationList}
                    renderItem={this.renderListItems}
                    style={styles.ItemList}/>
                }
            </View>
        )
    }
}

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
    searchArea: {
        height: 0.04 * height,
        position: 'absolute',
        top: '10%',
        left: '7%',
        width: '90%',
        zIndex: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    searchBar:{
        height: '100%', 
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: '90%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBox: {
        height: '100%',
        flex: 1,
    },
    ItemList:{
        position:"absolute",
        width: '90%',
        top: '100%',
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

const mapStateToProps = state => ({
    showList: state.reducer.showList
})

const mapDispatchToProps = dispatch => {
    return {
        updateShowList: (payload) => dispatch(showList(payload)),
        setCenter: (payload) => dispatch(setCenter(payload)),
        setZoom: (payload) => dispatch(setZoom(payload))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)