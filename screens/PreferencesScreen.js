import React, {Component} from 'react';
import {NavigationEvents} from 'react-navigation'
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import ParentCard from '../components/ParentCard';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import API from "../utils/API";

const placeholderParents = [
  {
    id: '1',
    title: 'Restaurants',
  }, {
    id: '2',
    title: 'Nightlife',
  }, {
    id: '3',
    title: 'Food',
  }, {
    id: '4',
    title: 'Food',
  }, {
    id: '5',
    title: 'Religious',
  }, {
    id: '6',
    title: 'Events',
  }, {
    id: '7',
    title: 'Outdoors',
  }, {
    id: '8',
    title: 'Arts & Culture',
  }, {
    id: '9',
    title: 'Sports',
  },
];
const colorArray = [
  '#B500A9',
  '#',
  '#',
  '#',
  '#',
  '#',
  '#',
  '#',
  '#',
  '#',
  '#',
  '#',
  '#',
];

export default class PreferencesScreen extends Component {

  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;
    console.log(params);
    return {
      title: 'Preferences',
      headerLeft: (
        <TouchableOpacity
          style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
          onPress={() => navigation.navigate('Home', {
            user_id: params.user_id,
            userName: params.userName
          })}
        >
          <Text style={{
            color: navigationOptions.headerTintColor,
            marginLeft: 15
          }}>
            <FontAwesome5 name={'home'} style={{fontSize: 20}}/>
          </Text>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
          onPress={navigation.getParam('_savePreferences')}
        >
          <Text style={{
            color: navigationOptions.headerTintColor,
            marginRight: 15
          }}>
            <FontAwesome5 name={'save'} style={{fontSize: 20}}/>
          </Text>
        </TouchableOpacity>
      )
    }
  };

  getUserPreferences = () => {
    // This is to allow the Save Button in the Navigation bar to interact with the screen
    // method to save preferences
    this.props.navigation.setParams({_savePreferences: this.savePreferences});

    const {navigation} = this.props;
    const {params} = navigation.state;
    const user_id = params.user_id;
    const userName = params.userName;

    console.log('query database for user preferences');
    console.log('query database for parent aliases');
    this.setState({
      user_id: user_id,
      userName: userName,
      preferences: []
    }, () => console.log(this.state))
    // trigger the YELP api search (via the server) when the screen loads
    /*const {navigation} = this.props;
    const user_id = navigation.getParam('user_id', 'NO ID');*/

    /*API.findUserById(user_id)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({results: res.data.message, error: ""});
        console.log(this.state.results);
      })
      .catch(err => {
        this.setState({error: err.message});
        console.log(this.state.error);
      });*/
  };

  savePreferences = () => {
    console.log('Save User Preferences to Database...')
  };

  render() {

    // Body Content
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getUserPreferences()}
        />
        {placeholderParents.map(category => (

          <ParentCard
            key={category.id}
            title={category.title}
            color="#B500A9"
            handlePress={() => this.props.navigation.navigate('Categories', {
              user_id: this.state.user_id,
              userName: this.state.userName,
              preferences: this.state.preferences,
              pageTitle: category.title,
              childPrefId: category.id
            })}
          />
        ))}
      </View>

    )
  }
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
  },

});