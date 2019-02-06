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
    alias: 'restaurants',
  }, {
    id: '2',
    title: 'Nightlife',
    alias: 'nightlife',
  }, {
    id: '3',
    title: 'Food',
    alias: 'food',
  }, {
    id: '4',
    title: 'Parks',
    alias: 'parks',
  }, {
    id: '5',
    title: 'Religious',
    alias: 'religiousorgs',
  }, {
    id: '6',
    title: 'Active Life',
    alias: 'active'
  }, {
    id: '7',
    title: 'Shopping',
    alias: 'shopping',
  }, {
    id: '8',
    title: 'Arts & Entertainment',
    alias: 'arts',
  }, {
    id: '9',
    title: 'Hotels & Travel',
    alias: 'hotelstravel'
  },
];
const colorArray = [
  '#5E35B1',
  '#B500A9',
  '#F44336',
  '#FFC107',
  '#673AB7',
  '#E91E63',
  '#2196F3',
  '#FF9800',
  '#009688',
  '#00BCD4',
  '#4CDF50',
  '#CDDC39',
  '#FF5722',
  '#01579B',
  '#00796B'
];

const randomArrayItem = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex]
};

// console.log(colorArray.length);

export default class PreferencesScreen extends Component {
  state = {
    user_id: null,
    user_name: null,
    user_preferences: [],
    parentCategories: placeholderParents
  };

  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: 'Preferences',
      headerLeft: (
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

  savePreferences = () => {
    const {params} = this.props.navigation.state;
    console.log(`Save ${params.user_preferences} to Database... where id = ${params.user_id}`)
    // console.log(`Save ${this.state.user_preferences} to Database... where id = ${this.state.user_id}`)
  };

  getParentCategories = () => {
    // This is to allow the Save Button in the Navigation bar to interact with the screen
    // method to save preferences
    this.props.navigation.setParams({_savePreferences: this.savePreferences});

    const {params} = this.props.navigation.state;

    console.log('query database for parent aliases');
    this.setState({
      user_id: params.user_id,
      user_name: params.user_name,
      user_preferences: params.user_preferences
    }, () => console.log(this.state))

  };

  render() {

    // Body Content
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getParentCategories()}
        />
        {this.state.parentCategories.map(category => (

          <ParentCard
            key={category.id}
            title={category.title}
            color={colorArray[category.id]}
            handlePress={() => this.props.navigation.navigate('Categories', {
              user_id: this.state.user_id,
              user_name: this.state.user_name,
              user_preferences: this.state.user_preferences,
              pageTitle: category.title,
              childPrefAlias: category.alias
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