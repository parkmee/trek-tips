import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      title: 'Trek Tips',
      headerRight: (
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
      )
    }
  };

  render() {

    const {navigation} = this.props;
    const user_id = navigation.getParam('user_id', 'NO ID');
    const userName = navigation.getParam('userName', 'Default Param Value');

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Home Screen</Text>
        <Text style={styles.instructions}>User ID: {JSON.stringify(user_id)}</Text>
        <Text style={styles.instructions}>Welcome to Trek Tips {userName}!</Text>
        <TouchableOpacity
          style={styles.continue}
          onPress={() => {
            this.props.navigation.navigate('Recommendations', {
              locationSearch: 'Atlanta, Georgia',
              pageNumber: 1
            })
          }}
        >
          <Text style={styles.continueText}>Go to Recommendations Screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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