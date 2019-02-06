import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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

export default class CategoriesScreen extends Component {
  state = {
    user_id: null,
    user_name: null,
    user_preferences: [],
    results: []
  };

  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: params.pageTitle,
      headerLeft: (
        <TouchableOpacity
          style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
          onPress={navigation.getParam('_updateParamPreferencesAndExit')}
        >
          <Text style={{
            color: navigationOptions.headerTintColor,
            marginLeft: 15
          }}>
            <FontAwesome5 name={'arrow-left'} style={{fontSize: 20}}/>
          </Text>
        </TouchableOpacity>
      ),
    }
  };

  updateParamPreferencesAndExit = () => {
    this.props.navigation.navigate('Preferences', {
      user_id: this.state.user_id,
      user_name: this.state.user_name,
      user_preferences: this.state.user_preferences
    })
  };

  getChildCategories = () => {
    this.props.navigation.setParams({_updateParamPreferencesAndExit: this.updateParamPreferencesAndExit});

    const {params} = this.props.navigation.state;
    console.log(`query database for child categories with id: ${params.childPrefId}`);

    this.setState({
      user_id: params.user_id,
      user_name: params.user_name,
      user_preferences: params.user_preferences
    }, () => console.log(this.state))
  };


  render() {

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getChildCategories()}
          onDidFocus={() => console.log('did focus')}
          onWillBlur={() => console.log('will blur')}
          onDidBlur={() => console.log('did blur')}
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