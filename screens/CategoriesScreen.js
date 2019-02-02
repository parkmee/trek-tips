import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationEvents} from 'react-navigation';

export default class CategoriesScreen extends Component {
  static navigationOptions = ({})

  render() {

    const {navigation} = this.props;
    const {params} = navigation.state;
    const user_id = params.user_id;
    const userName = params.userName;

    return (
      <div style={styles.container}>
        <p>Children go here...</p>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});