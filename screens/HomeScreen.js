import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';

export default class HomeScreen extends Component {
  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      title: 'Trek Tips',
      headerLeft: null,
      headerRight: (
        <View style={styles.nav}>
          <TouchableOpacity
            style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
            onPress={() => navigation.navigate('Saved', {
                userName: navigation.getParam('userName', 'Default Param Value')
              }
            )}
          >
            <Text style={{
              color: navigationOptions.headerTintColor,
              marginRight: 10
            }}>
              Saved
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
            onPress={() => navigation.navigate('Preferences', {
                user_id: navigation.getParam('user_id', 'NO ID'),
                userName: navigation.getParam('userName', 'Default Param Value')
              }
            )}
          >
            <Text style={{
              color: navigationOptions.headerTintColor,
              marginRight: 10
            }}>
              Preferences
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{
              color: navigationOptions.headerTintColor,
              marginRight: 10
            }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  };

  render() {

    const {navigation} = this.props;
    const user_id = navigation.getParam('user_id', 'NO ID');
    const userName = navigation.getParam('userName', 'Default Param Value');

    // Body Content
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Home Screen</Text>
        <Text style={styles.instructions}>User ID: {JSON.stringify(user_id)}</Text>
        <Text style={styles.instructions}>Welcome to Trek Tips {userName}!</Text>
      </View>
    )
  }
}

// StyleSheet
const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    margin: 10,
    color: '#FF1589'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  continue: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FF1589',
    borderRadius: 5
  },
  continueText: {
    color: '#0DF242',
    fontWeight: '600',
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
  }
});