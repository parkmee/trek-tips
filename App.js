import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

// import API from './utils/API';

class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Trek Tips</Text>
        <Text style={styles.instructions}>Our goal is for you to have the best possible travel experience.</Text>
        <Text style={styles.instructions}>To get started, please login...</Text>
        <Button
          title="Login"
          color="#FF1589"
          onPress={() => {
            this.props.navigation.navigate('Home', {
              user_id: 23,
              otherParam: 'User Name'
            })
          }}/>
      </View>
    )
  }
}

class HomeScreen extends Component {
  render() {

    const {navigation} = this.props;
    const user_id = navigation.getParam('user_id', 'NO ID');
    const otherParam = navigation.getParam('otherParam', 'Default Param Value');

    return (
      <View style={styles.container}>
        <Button
          title="Logout"
          color="#C3272B"
          onPress={() => this.props.navigation.navigate('Login')}/>
        <Text>Home Screen</Text>
        <Text>User ID: {JSON.stringify(user_id)}</Text>
        <Text>Welcome to Trek Tips {JSON.stringify(otherParam)}!</Text>
        <TouchableOpacity
          style={styles.continue}
          onPress={() => {
            this.props.navigation.navigate('Recommendations', {
              locationSearch: 'Atlanta, Georgia'
            })
          }}
        >
          <Text style={styles.continueText}>Go to Recommendations Screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class RecommendationsScreen extends Component {
  render() {

    const {navigation} = this.props;
    const locationSearch = navigation.getParam('locationSearch', 'No Search Requested');
    console.log(locationSearch);

    return (
      <View style={styles.container}>
        <Button
          title="Logout"
          onPress={() => this.props.navigation.navigate('Login')}/>
        <Text>Recommendations Screen</Text>
        <Text>Showing Results for: {locationSearch}</Text>
        <Button
          title="See More Recommendations"
          onPress={() => this.props.navigation.push('Recommendations')}/>
        <TouchableOpacity
          style={styles.continue}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.continueText}>Go Back</Text>
        </TouchableOpacity>
        <Button
          title="Return to Home"
          onPress={() => this.props.navigation.navigate('Home')}/>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
    Login: {
      screen: LoginScreen
    },
    Home: {
      screen: HomeScreen
    },
    Recommendations: {
      screen: RecommendationsScreen
    }
  },
  {
    initialRouteName: 'Login'
  });

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer/>
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
  login: {
    backgroundColor: '#0DF242',
    borderRadius: 5
  },
  loginText: {
    color: '#FF7900',
    fontWeight: '600',
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
  },
  continue: {
    marginTop: 5,
    backgroundColor: '#FF7900',
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
