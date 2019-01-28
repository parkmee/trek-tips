import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';

export default class PreferencesScreen extends Component {
  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;
    return {
      title: 'Preferences',
      headerLeft: (<TouchableOpacity
          style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
          onPress={() => navigation.navigate('Home', {
            user_id: params.user_id,
            userName: params.userName
          })}
        >
          <Text style={{
            color: navigationOptions.headerTintColor,
            marginLeft: 10
          }}>
            Home
          </Text>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
          onPress={() => console.log('Saved!')}
        >
          <Text style={{
            color: navigationOptions.headerTintColor,
            marginRight: 10
          }}>
            Save Preferences
          </Text>
        </TouchableOpacity>
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
        <Text style={styles.welcome}>{userName}</Text>
        <Text style={styles.instructions}>^ Probably unnecessary, but left it as a stand in...</Text>
        <Text style={styles.instructions}>User ID: {JSON.stringify(user_id)}</Text>
        <View style={styles.content}>
          <Text style={styles.instructions}>Stuff goes here....</Text>
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  }
});