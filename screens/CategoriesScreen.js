import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationEvents} from 'react-navigation';

export default class CategoriesScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    console.log(params);

    return {
      title: params.pageTitle
    }
  };

  getChildCategories = () => {
    const {navigation} = this.props;
    const {params} = navigation.state;

    console.log(`query database for child categories with id: ${params.childPrefId}`);
  };

  render() {

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getChildCategories()}
        />

        <Text>Children go here...</Text>
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
  }
});