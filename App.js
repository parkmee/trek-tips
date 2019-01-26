import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// import API from './utils/API';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null
    };

    // this.handleLogin = this.handleLogin.bind(this);
    // this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin = () => {
    console.log('Logging In');
    this.setState({userName: 'Test'}, () => console.log('userName: ', this.state.userName))
  };

  handleLogout = () => {
    console.log('Logging Out');
    this.setState({userName: null}, () => console.log('userName: ', this.state.userName))
  };

  render() {
    let loggedIn = this.state.userName !== null;
    // console.log(loggedIn);
    // console.log(this.props);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Trek Tips</Text>
        <Text style={styles.instructions}>Our goal is for you to have the best possible travel experience.</Text>
        <Text style={styles.instructions}>To get started, please login...</Text>
        <TouchableOpacity
          style={styles.login}
          onPress={loggedIn ? this.handleLogout : this.handleLogin}
        >
          <Text style={styles.loginText}>{loggedIn ? 'Logout' : 'Login'}</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

/*const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login'
    }
  }
});*/

// export default createAppContainer(AppNavigator);
export default LoginScreen;

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
  }
});
