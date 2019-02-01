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
      headerLeft: null
    }
  };

  componentWillMount() {
    // trigger the YELP api search (via the server) when the screen loads
    API.searchYelp(this.state.searchLocation, "")
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.businesses, error: "" });
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
    // trigger the YELP api search (via the server) when the user submits
    // the search from the search bar
    API.searchYelp(this.state.searchLocation, "")
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.businesses, error: "" });
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

          {this.state.results.map(reccomendation => {
            return (
              <RecCard
                key={reccomendation.id}
                imgUrl={reccomendation.image_url}
                description={reccomendation.name}
                rating={reccomendation.rating}
                price={reccomendation.price}
                isSaved="false"
                wasVisited="false"
              />
            )
          })}
          
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