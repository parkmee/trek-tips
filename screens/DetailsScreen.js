import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, Linking} from 'react-native';

import openMap from 'react-native-open-maps';

export default class DetailsScreen extends Component {

  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: params.name,
      /*headerLeft: (
        <TouchableOpacity
          style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
          onPress={() => navigation.navigate('Home', {
            user_id: params.user_id,
            user_name: params.user_name,
            user_preferences: params.user_preferences
          })}
        >
          <Text style={{
            color: navigationOptions.headerTintColor,
            marginLeft: 15
          }}>
            <FontAwesome5 name={'home'} style={{fontSize: 20}}/>
          </Text>
        </TouchableOpacity>
      )*/
    }
  };

  handleCall = (number) => {
    const url = `tel:${number}`;
    Linking.openURL(url)
  };

  handleAddress = (lat, long) => {
    openMap({latitude: lat, longitude: long})
  };

  render() {
    const {params} = this.props.navigation.state;
    console.log(params);
    console.log(params.address.display_address.join(' '));

    /*let url = "https://www.google.com/maps/place/";
    url += this.props.location.address1 + ", ";
    url += this.props.location.city + ", ";
    url += this.props.location.state + " ";
    url += this.props.location.zip_code;
    var replacedUrl = url.split(' ').join('+')*/
    // Body Content
    return (
      <View style={styles.container}>
        <Image source={{uri: params.image}}
               style={styles.image}
        />
        <TouchableOpacity
          onPress={() => this.handleAddress(params.coordinates.latitude, params.coordinates.longitude)}
        >
          <Text style={styles.touch}>
            {params.address.display_address.join(' ')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>
          Latitude: {params.coordinates.latitude}
        </Text>
        <Text style={styles.instructions}>
          Longitude: {params.coordinates.longitude}
        </Text>
        <Text style={styles.instructions}>
          {params.rating}
        </Text>
        <TouchableOpacity
          onPress={() => this.handleCall(params.other)}
        >
          <Text style={styles.touch}>
            {params.phone}
          </Text>
        </TouchableOpacity>
      </View>

    )
  }
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  image: {
    width: '100%',
    height: '50%'
  },
  welcome: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    margin: 10,
    color: '#B500A9'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '600'
  },
  touch: {
    textAlign: 'center',
    color: '#B500A9',
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '600'
  },

});