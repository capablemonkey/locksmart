import React, {Component} from 'react';
import { Dimensions,
Text,
Image, 
View, 
StyleSheet,
ScrollView, 
TextInput,
Button,} from 'react-native';

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
    }

    setDate(event,newDate) {
        this.setState({date: newDate});
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
                            <TextInput textContentType={'fullStreetAddress'} placeholder={'Address'} style={[styles.field, {flex:3}]}/>
                            <TextInput textContentType={'postalCode'} placeholder={'ZipCode'} style={[styles.field, {flex:1}]}/>
                        </View>
                        <Text style={styles.fieldName}>Incident Date</Text>
                        <View>
                            <DateTimePicker mode={'date'} value={this.state.date} onChange={this.setDate}/>
                        </View>
                        <Button title={'Submit'} style={styles.submitButton}></Button>
                    </View>
                </View>
            </View>
        );
    }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
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