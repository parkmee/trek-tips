import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class CategoriesScreen extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;
    console.log(params);

    return {
      title: params.pageTitle,
      headerRight: (
        <TouchableOpacity
          style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
          onPress={navigation.getParam('_savePreferences')}
        >
          <Text style={{
            color: navigationOptions.headerTintColor,
            marginRight: 15
          }}>
            <FontAwesome5 name={'save'} style={{fontSize: 20}}/>
          </Text>
        </TouchableOpacity>
      )
    }
  };

  getChildCategories = () => {
    this.props.navigation.setParams({_savePreferences: this.savePreferences});
    const {params} = this.props.navigation.state;

    console.log(`query database for child categories with id: ${params.childPrefId}`);
  };

  savePreferences = () => {
    const {params} = this.props.navigation.state;
    console.log(`Save User Preferences to Database... where id = ${params.user_id}`)
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