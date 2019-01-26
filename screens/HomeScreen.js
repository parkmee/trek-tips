import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import RecCard from "../components/RecCard"
import { ScrollView } from 'react-native-gesture-handler';
import SearchBar from '../components/SearchBar';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "Atlanta, GA"
    }
  }
  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      title: 'Trek Tips',
      headerLeft: null,
      headerRight: (
        <View style={styles.nav}>
          <TouchableOpacity
            style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
            onPress={() => navigation.navigate('Saved', {
                userName: navigation.getParam('userName', 'Default Param Value')
              }
            )}
          >
            <Text style={{
              color: navigationOptions.headerTintColor,
              marginRight: 10
            }}>
              Saved
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
            onPress={() => navigation.navigate('Preferences', {
                user_id: navigation.getParam('user_id', 'NO ID'),
                userName: navigation.getParam('userName', 'Default Param Value')
              }
            )}
          >
            <Text style={{
              color: navigationOptions.headerTintColor,
              marginRight: 10
            }}>
              Preferences
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{
              color: navigationOptions.headerTintColor,
              marginRight: 10
            }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  };

  render() {

    const {navigation} = this.props;
    const user_id = navigation.getParam('user_id', 'NO ID');
    const userName = navigation.getParam('userName', 'Default Param Value');

    // Body Content
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Home Screen</Text>
        <Text style={styles.instructions}>User ID: {JSON.stringify(user_id)}</Text>
        <Text style={styles.instructions}>Welcome to Trek Tips {userName}!</Text>

        <SearchBar searchTerm={this.state.searchTerm} />
        <ScrollView>
          <RecCard
            imgUrl="https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg"
            description="Gary's House"
            rating="4"
            price="4"
            isSaved="false"
            wasVisited="true"
          />
          <RecCard
            imgUrl="https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg"
            description="Steve's House"
            rating="4"
            price="2"
            isSaved="true"
            wasVisited="true"
          />
          <RecCard
            imgUrl="https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg"
            description="Mike's House"
            rating="1"
            price="1"
            isSaved="false"
            wasVisited="true"
          />
          <RecCard
            imgUrl="https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg"
            description="Mary's House"
            rating="2"
            price="3"
            isSaved="false"
            wasVisited="true"
          />
        </ScrollView>
      </View>
    )
  }
}

// StyleSheet
const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row'
  },
  search: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  scrollView: {
    flexDirection: "column"
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