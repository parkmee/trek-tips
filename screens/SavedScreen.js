import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';

export default class SavedScreen extends Component {
  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: params.locationSearch ? params.locationSearch : 'A Nested Screen',
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
        <Text style={styles.welcome}>{userName}'s Saved Recommendations</Text>
        <Text style={styles.instructions}>Insert sorting option here...</Text>
        <View
          style={styles.content}
        />
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continue}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.continueText}>Go Back</Text>
          </TouchableOpacity>
          <Text style={styles.pageNum}>Page {pageNumber}</Text>
          <TouchableOpacity
            style={styles.continue}
            onPress={() => {
              this.props.navigation.push('Recommendations', {
                pageNumber: ++pageNumber,
                locationSearch: locationSearch
              })
            }}
          >
            <Text style={styles.continueText}>More</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

// StyleSheet
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
  content: {
    flex: 1
  },
  continue: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FF1589',
    borderRadius: 5
  },
  pageNum: {
    color: '#F5FCFF'
  },
  continueText: {
    color: '#F5FCFF',
    fontWeight: '600',
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF1589'
  }
});