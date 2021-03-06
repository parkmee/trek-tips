import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SavedScreen from './screens/SavedScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import DetailsScreen from './screens/DetailsScreen';

const AppNavigator = createStackNavigator({
    Login: {
      screen: LoginScreen
    },
    Home: {
      screen: HomeScreen
    },
    Preferences: {
      screen: PreferencesScreen
    },
    Categories: {
      screen: CategoriesScreen
    },
    Saved: {
      screen: SavedScreen
    },
    Details: {
      screen: DetailsScreen
    }
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: { // Style object that wraps the header
        backgroundColor: '#B500A9',
      },
      headerTintColor: '#FFFFFF', // Used to color the back button and the title.
      headerTitleStyle: { // Customize the 'fontFamily', 'fontWeight' and other 'Text' properties
        fontWeight: 'bold',
      },
      headerBackTitle: 'Home' // added this to make it say home on the back button,
                              // if not here its inconsistent in how it labels the back button
    },
  });

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer/>
  }
}
