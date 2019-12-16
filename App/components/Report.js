import React, {Component} from 'react';
import { Dimensions,
Text,
Image, 
View, 
StyleSheet,
ScrollView, 
TextInput,
Button,} from 'react-native';
import SearchBar from './SearchBar';

import DateTimePicker from '@react-native-community/datetimepicker';

export default class ReportPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            vinNumber: '',
            address: '',
            zipCode: '',
            date: new Date(),
        };
        this.setDate = this.setDate.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.setZipCode = this.setZipCode.bind(this);
        //this.submitButton = this.submitButton.bind(this);
    }

    setDate(event,newDate) {
        this.setState({date: newDate});
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

        .then((response) => console.log(response.status))
        .catch((error) =>{
            console.error(error);
        }) 
        

    }

    setAddress = (newAddress) => {
        this.setState({address: newAddress});
    }

    setZipCode = (newZipCode) => {
        this.setState({zipCode: newZipCode});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.page}>
                    <Text style={styles.header}>Report Page</Text>
                    <View style={styles.form}>
                        <Text style={styles.fieldName}>Name</Text>
                        <View style={styles.nameField}>
                            <TextInput textContentType={'givenName'} placeholder={'First Name'} style={[styles.field, {flex: 1}]}/>
                            <TextInput textContentType={'familyName'} placeholder={'Last Name'} style={[styles.field, {flex: 1}]}/>
                        </View>
                        <Text style={styles.fieldName}>VIN Number</Text>
                        <TextInput placeholder={'VIN number'} style={styles.field}/>
                        <Text style={styles.fieldName}>Incident Location</Text>
                        <View style={styles.nameField}>
                            <TextInput textContentType={'fullStreetAddress'} placeholder={'Address'} style={[styles.field, {flex:3}]} onChangeText={this.setAddress}/>
                            <TextInput textContentType={'postalCode'} placeholder={'ZipCode'} style={[styles.field, {flex:1}]} onChangeText={this.state.setZipCode}/>
                        </View>
                        <Text style={styles.fieldName}>Incident Date</Text>
                        <View>
                            <DateTimePicker mode={'date'} value={this.state.date} onChange={this.setDate}/>
                        </View>
                        <Button title={'Submit'} style={styles.submitButton} onPress={this.submitButton}></Button>
                    </View>
                </View>
            </View>
        );
    }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
    },
    page: {
        height: (9*height/10),
        width: width,
        backgroundColor: '#1c77ac',
    },
    header: {
        marginTop: height/15,
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 20,
        color: '#FFFFFF'
    },
    form: {
        borderRadius: 20,
        marginLeft: 30,
        marginRight:30,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    fieldName: {
        padding: 5,
        fontSize: 15,
    },
    nameField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    field: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 10,
        padding: 10,
    },
    submitButton: {
        padding: 20,
        borderRadius: 3
    }
});