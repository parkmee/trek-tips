import React, {Component} from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      user_id: null,
    };

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin = () => {
    console.log('Logging In');
    this.setState({
      userName: 'DB_NAME',
      user_id: 'DB_ID'
    }, () => console.log('userName', this.state.userName))
  };

  render() {
    let loggedIn = this.state.userName !== null;
    console.log(loggedIn);

    // Body Content
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Trek Tips</Text>
        <Text style={styles.instructions}>Our goal is for you to have the best possible travel experience.</Text>
        <Text style={styles.instructions}>To get started, please login...</Text>
        {loggedIn
          ? <Button
            title="Continue"
            color="#FF1589"
            onPress={() => {
              this.props.navigation.navigate('Home', {
                user_id: this.state.user_id,
                userName: this.state.userName
              })
            }}/>
          : <Button
            title="Login"
            color="#FF1589"
            onPress={this.handleLogin}/>
        }
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
  }
});