/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TtScrollView from "./components/TtScrollView/TtScrollView";
import RecommendationTile from "./components/RecommendationTile/RecommendationTile";

import Auth0 from 'react-native-auth0';
import {DOMAIN, CLIENT_ID} from 'react-native-dotenv';
import API from './utils/API';

const auth0 = new Auth0({
  domain: DOMAIN,
  clientId: CLIENT_ID
});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        imgUrl: "https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg",
        description: "Gary's House",
        rating: "4",
        price: "2",
        isSaved: false,
        wasVisited: false,
        userName: null
      };

    /*this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);*/
  }

  handleLogin = () => {
    console.log('Logging In');
    this.setState({userName: 'Test'}, () => console.log('username: ', this.state.userName))
  };

  handleLogout = () => {
    console.log('Logging Out');
    this.setState({userName: null}, () => console.log('username: ', this.state.userName))
  };


  render() {
    let loggedIn = this.state.userName !== null;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Trek Tips!</Text>
        <Text style={styles.instructions}>To get started, please login...</Text>
        <TouchableOpacity
          style={styles.login}
          onClick={loggedIn ? this.handleLogout : this.handleLogin}
        >
          {loggedIn ? 'Logout' : 'Login'}
        </TouchableOpacity>
        <RecommendationTile
          imgUrl={this.state.imgUrl}
          description={this.state.description}
          rating={this.state.rating}
          isSaved={this.state.isSaved}
          wasVisited={this.state.wasVisited}
        />
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  login: {
    color: '#FF7900',
    backgroundColor: '#0DF242',
  }
});
