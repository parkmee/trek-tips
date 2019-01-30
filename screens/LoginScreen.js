import React, {Component} from 'react';
import {Button, View, SafeAreaView, Modal, Text, StyleSheet} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Auth0 from 'react-native-auth0';
import API from '../utils/API';
import {DOMAIN, CLIENT_ID} from 'react-native-dotenv';

// console.log(DOMAIN, CLIENT_ID);

/* const auth0 = new Auth0({
  domain: DOMAIN,
  clientId: CLIENT_ID
}); */


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      newUser: true,
      userName: null,
      user_id: null,
    };

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin = () => {

    this.setState({
      userName: 'DB_NAME',
      user_id: 'DB_ID'
    }, () => console.log('userName', this.state.userName))

    /*auth0.webAuth
      .authorize({
        scope: 'openid profile email',
        audience: `https://${DOMAIN}/userinfo`
      })
      .then(credentials => {
        console.log(credentials);

        API.getUser(credentials.accessToken)
          .then(res => {
            console.log(res.data);
            this.setState({
              userName: res.data.name,
              user_id: res.data.sub
            }, () => {
              console.log(this.state.userName);
              console.log(this.state.user_id)
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))*/
  };

  changeModalVisibility = (modalVisible = false) => {
    this.setState({modalVisible})
  };

  render() {
    let loggedIn = this.state.userName !== null;
    console.log(loggedIn);

    // Body Content
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.setState({
              userName: null,
              user_id: null
            })
          }}
        />
        <Text style={styles.welcome}>Trek Tips</Text>
        <Text style={styles.instructions}>Our goal is for you to have the best possible travel experience.</Text>
        <Text style={styles.instructions}>To get started, please login...</Text>
        {loggedIn
          ? <Button
            title="Continue"
            color="#FF1589"
            onPress={() => {
              this.state.newUser
                ? this.changeModalVisibility(true)
                : this.props.navigation.navigate('Home', {
                  user_id: this.state.user_id,
                  userName: this.state.userName
                })
            }}/>
          : <Button
            title="Login"
            color="#FF1589"
            onPress={this.handleLogin}/>
        }
        <Modal
          visible={this.state.modalVisible}
          animationType="fade"
          onRequestClose={() => {
          }}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalBody}>
              <Text style={styles.instructions}>
                Would you like to set your preferences?
              </Text>
              <View style={styles.modalButton}>
                <Button
                  style={styles.modalButton}
                  title="Set Preferences"
                  color="#FF1589"
                  onPress={() => {
                    this.changeModalVisibility(false);
                    this.props.navigation.navigate('Preferences', {
                      user_id: this.state.user_id,
                      userName: this.state.userName
                    })
                  }}
                />
              </View>
              <View style={styles.modalButton}>
                <Button
                  title="Not Right Now"
                  color="#FF1589"
                  onPress={() => {
                    this.changeModalVisibility(false);
                    this.props.navigation.navigate('Home', {
                      user_id: this.state.user_id,
                      userName: this.state.userName
                    })
                  }}
                />
              </View>
            </View>
          </SafeAreaView>

        </Modal>
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBody: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    padding: 20,
    borderRadius: 5,
  },
  modalButton: {
    margin: 10
  }
});