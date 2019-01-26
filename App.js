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
              userName: 'User Name'
            })
          }}/>
      </View>
    )
  }
}

class HomeScreen extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      title: 'Trek Tips',
      headerRight: (
        <TouchableOpacity
          style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{color: navigationOptions.headerTintColor, marginRight: 10}}>Logout</Text>
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

class RecommendationsScreen extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;
    console.log(params);

    return {
      title: params.locationSearch ? params.locationSearch : 'A Nested Screen',
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
      headerRight: (
        <TouchableOpacity
          style={{backgroundColor: navigationOptions.headerTintColor}}
          onPress={() => navigation.navigate('Home')}
        >
          <Text
            style={{color: navigationOptions.headerStyle.backgroundColor, marginRight: 10}}
          >
            Home
          </Text>
        </TouchableOpacity>
      )
    }
  };

  render() {

    const {navigation} = this.props;
    const locationSearch = navigation.getParam('locationSearch', 'No Search Requested');
    let pageNumber = navigation.getParam('pageNumber', 1);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Recommendations Screen</Text>
        <Text style={styles.instructions}>Showing Results for: {locationSearch}</Text>
        <Button
          title="See More Recommendations"
          color="#0DF242"
          onPress={() => {
            this.props.navigation.push('Recommendations', {
              pageNumber: ++pageNumber
            })
          }}/>
        <TouchableOpacity
          style={styles.continue}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.continueText}>Go Back</Text>
        </TouchableOpacity>
        <Text>Page {pageNumber}</Text>
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
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: { // Style object that wraps the header
        backgroundColor: '#FF1589',
      },
      headerTintColor: '#FFFFFF', // Used to color the back button and the title.
      headerTitleStyle: { // Customize the 'fontFamily', 'fontWeight' and other 'Text' properties
        fontWeight: 'bold',
      },
    },
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
    color: '#FF1589',
    fontWeight: '600',
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
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
