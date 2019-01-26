import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';

export default class SavedScreen extends Component {
  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: `${params.userName}'s Saved Tips`,
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
      /*headerRight: (
        <TouchableOpacity
          style={{backgroundColor: navigationOptions.headerTintColor}}
          onPress={() => navigation.navigate('Home')}
        >
          <Text
            style={{
              color: navigationOptions.headerStyle.backgroundColor,
              marginRight: 10
            }}>
            Home
          </Text>
        </TouchableOpacity>
      )*/
    }
  };

  render() {

    const {navigation} = this.props;
    const userName = navigation.getParam('userName', 'Default Value');

    // Body Content
    return (
      <View style={styles.container}>
        <View style={styles.filterBar}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => console.log('View All')}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => console.log('View Saved')}
          >
            <Text style={styles.filterText}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => console.log('View Visited')}
          >
            <Text style={styles.filterText}>Visited</Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.content}
        />
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
    flex: 1
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
  filterText: {
    color: '#FF1589',
    fontWeight: '600',
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
  }
});