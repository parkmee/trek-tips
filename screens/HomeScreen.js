import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {NavigationEvents} from 'react-navigation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import RecCard from "../components/RecCard"
import SearchBar from '../components/SearchBar';
import API from "../utils/API";

export default class HomeScreen extends Component {

  state = {
    searchLocation: "Atlanta, GA",
    searchCategories: "dessert",
    results: [],
    error: "",
    userPlaces: []
  };

  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    // I am assuming that the user in the params has a places property which
    // is an array
    // this.setState({userPlaces: params.user_places})

    return {
      title: 'Trek Tips',
      headerLeft: (
        <View style={styles.nav}>
          <TouchableOpacity
            style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{
              color: navigationOptions.headerTintColor,
              marginLeft: 15,
            }}>
              <FontAwesome5 name={'sign-out-alt'} style={{fontSize: 20}}/>
            </Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: (
        <View style={styles.nav}>
          <TouchableOpacity
            style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
            onPress={() => navigation.navigate('Preferences', {
                user_id: params.user_id,
                user_name: params.user_name,
                user_preferences: params.user_preferences
              }
            )}
          >
            <Text style={{
              color: navigationOptions.headerTintColor,
              marginRight: 20
            }}>
              <FontAwesome5 name={'sliders-h'} style={{fontSize: 20}}/>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
            onPress={() => navigation.navigate('Saved', {
                user_id: params.user_id,
                user_name: params.user_name,
                user_preferences: params.user_preferences
              }
            )}
          >
            <Text style={{
              color: navigationOptions.headerTintColor,
              marginRight: 15
            }}>
              <FontAwesome5 name={'heart'} style={{fontSize: 20}}/>
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  };

  updateSearchLocation = (searchLocation) => {
    // update the state value searchLocation given the input from the search bar
    this.setState({searchLocation: searchLocation});
  }

  checkPlaceInArray(placeArray, placeId) {
    let saved = placeArray.filter((place) => {
      if (place.place_id === placeId) {
        return place;
      }
    });
    if (saved.length > 0) {
      return "true"
    } else {
      return "false"
    }
  }

  getRecommendations = () => {
    // trigger the YELP api search (via the server) when the user submits
    // the search from the search bar
    let errors = "";

    // following for testing only
    let userId = "5c5a407ced8b3c0a9ed9ee25";
    let searchResults = [];
    const {params} = this.props.navigation.state;

    API.searchYelp(params.user_id, this.state.searchLocation, "")
    //API.searchYelp(userId, this.state.searchLocation, "")
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        searchResults = res.data;
        console.log("searchResults: ", searchResults);
        //this.setState({results: res.data.businesses, error: ""});
        this.setState({results: searchResults, error: errors});
      })
      .catch(err => this.setState({error: err.message}));
  }

  render() {
    const {params} = this.props.navigation.state;
    console.log(params);
    //console.log("params: ", params);

    // Body Content
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getRecommendations()}    // remove this if we don't want default loading
        />
        <SearchBar
          searchLocation={this.state.searchLocation}
          updateSearchLocation={this.updateSearchLocation}
          searchAction={this.getRecommendations}
        />
        <ScrollView style={styles.recCard}>
          {this.state.results.map(recommendation => {
            console.log(recommendation);

            return (
              <RecCard
                key={recommendation.place.id}
                id={recommendation.place.id}
                imgUrl={recommendation.place.image_url}
                description={recommendation.place.name}
                rating={recommendation.place.rating}
                price={recommendation.place.price}
                isSaved={recommendation.isSaved}
                hasVisited={recommendation.hasVisited}
                placeData={recommendation.place}
                userId={params.user_id}
                rerender={this.getRecommendations}
                toDetails={() => this.props.navigation.navigate('Details', {
                  coordinates: recommendation.place.coordinates,
                  phone: recommendation.place.display_phone,
                  address: recommendation.place.location,
                  name: recommendation.place.name,
                  image: recommendation.place.image_url,
                  url: recommendation.place.url,
                  rating: recommendation.place.rating,
                  other: recommendation.place.phone
                })}
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
  recCard: {
    width: "100%"
  },
  nav: {
    flexDirection: 'row'
  },
  search: {
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#333333'
  },
  scrollView: {
    flexDirection: "column",
    width: '100%'
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