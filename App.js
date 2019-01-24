/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import TtScrollView from "./components/TtScrollView/TtScrollView";
import RecommendationTile from "./components/RecommendationTile/RecommendationTile";

import Auth0 from 'react-native-auth0';
import {DOMAIN, CLIENT_ID} from 'react-native-dotenv';
import API from './utils/API';


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
        wasVisited: false
      };

    /*this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);*/
  }

  handleLogin = () => {

  };

  handleLogout = () => {

  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Trek Tips!</Text>
        <Text style={styles.instructions}>To get started, please login...</Text>
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
});
