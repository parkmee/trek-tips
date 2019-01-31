import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RecCard from "../components/RecCard"
import { ScrollView } from 'react-native-gesture-handler';
import SearchBar from '../components/SearchBar';
import API from "../utils/API";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      searchLocation: "Atlanta, GA",
      searchCategories: "dessert",
      results: [],
      error: ""
    }
  }
  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      title: 'Trek Tips',
    }
  };

  componentWillMount() {
    API.searchYelp(this.state.searchLocation)
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

  updateSearchLocation(searchLocation) {
    // update the state value searchLocation given the input from the search bar
    this.setState({searchLocation: searchLocation});
  }

  getRecommendations(event){
    API.searchYelp(this.state.searchLocation, this.state.searchCategories)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
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
        onPress={() => navigation.navigate('Preferences', {
            user_id: navigation.getParam('user_id', 'NO ID'),
            userName: navigation.getParam('userName', 'Default Param Value')
          }
        )}
      >
        <Text style={{
          color: "black",
          marginLeft: 10
        }}>
          Preferences
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.filter}
          onPress={() => navigation.navigate('Saved', {
              userName: navigation.getParam('userName', 'Default Param Value')
            }
          )}
        >
          <Text style={{
            color: "black",
            marginRight: 10
          }}>
            Saved
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.filter}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{
              color: "black",
              marginRight: 10
            }}>
              Logout
            </Text>
          </TouchableOpacity>
      </View>
        <SearchBar 
          searchLocation={this.state.searchLocation} 
          updateSearchLocation={this.updateSearchLocation.bind(this)} 
          searchAction={this.getRecommendations.bind(this)}
        />
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
    backgroundColor: '#B1A296'
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