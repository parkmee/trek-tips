import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';

export default class PreferencesScreen extends Component {
  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;
    return {
      title: 'Preferences',
    }
  };

  render() {

    const {navigation} = this.props;
    const user_id = navigation.getParam('user_id', 'NO ID');
    const userName = navigation.getParam('userName', 'Default Param Value');

    // Body Content
    return (
      <View style={styles.container}>
      <View style={styles.filterBar}>
      <TouchableOpacity
          style={styles.filter}
          onPress={() => console.log('Saved!')}
        >
          <Text style={{
            color: "black"
          }}>
            Save Preferences
          </Text>
        </TouchableOpacity>
      </View>
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
  },
  filterBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF'
  },
  filter: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#F5FCFF',
    borderRadius: 5
  },
});