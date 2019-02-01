import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import API from "../utils/API";

export default class PreferencesScreen extends Component {
  constructor(props) {
    super(props);
  }

  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;
    return {
      title: 'Preferences',
      headerLeft: (<TouchableOpacity
        style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
        onPress={() => navigation.navigate('Home', {
          user_id: params.user_id,
          userName: params.userName
        })}
      >
        <Text style={{
          color: navigationOptions.headerTintColor,
          marginLeft: 10
        }}>
          Home
        </Text>
      </TouchableOpacity>
    )
    }
  };

  componentWillMount() {
    // trigger the YELP api search (via the server) when the screen loads
    const {navigation} = this.props;
    const user_id = navigation.getParam('user_id', 'NO ID');

    API.findUserById(user_id)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
        console.log(this.state.results);
      })
      .catch(err => {
        this.setState({ error: err.message });
        console.log(this.state.error);
      });
  }

  render() {

    const {navigation} = this.props;
    const user_id = navigation.getParam('user_id', 'NO ID');
    const userName = navigation.getParam('userName', 'Default Param Value');

    // Body Content
    return (
      <View style={styles.container}>
      <View style={styles.filterBar}>
      <TouchableOpacity
          style={styles.filter}
          onPress={() => console.log('Saved!')}
        >
          <Text style={{
            color: "black"
          }}>
            Save Preferences
          </Text>
        </TouchableOpacity>
      </View>
        <Text style={styles.welcome}>{userName}</Text>
        <Text style={styles.instructions}>^ Probably unnecessary, but left it as a stand in...</Text>
        <Text style={styles.instructions}>User ID: {JSON.stringify(user_id)}</Text>
        <View style={styles.content}>
          <Text style={styles.instructions}>Stuff goes here....</Text>
        </View>
      </View>
    )
  }
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  filterBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF'
  },
  filter: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#F5FCFF',
    borderRadius: 5
  },
});