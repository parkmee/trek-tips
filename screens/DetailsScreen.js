import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, Linking} from 'react-native';

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
        <Text style={styles.instructions}>
          {params.address.display_address.join(' ')}
        </Text>
        <Text style={styles.instructions}>
          Latitude: {params.coordinates.latitude}
        </Text>
        <Text style={styles.instructions}>
          Longitude: {params.coordinates.longitude}
        </Text>
        <TouchableOpacity
          onPress={() => this.handleCall(params.other)}
        >
          <Text style={styles.phoneNumber}>
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
  phoneNumber: {
    textAlign: 'center',
    color: '#B500A9',
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '600'
  },

});