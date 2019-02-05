import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import RecCard from "../components/RecCard"
import {ScrollView} from 'react-native-gesture-handler';
import SearchBar from '../components/SearchBar';
import API from "../utils/API";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchLocation: "Atlanta, GA",
      searchCategories: "dessert",
      results: [],
      error: "",
      userPlaces: []
    }
  }

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

  componentWillMount() {
    // trigger the YELP api search (via the server) when the screen loads
    API.searchYelp(this.state.searchLocation, "")
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({results: res.data.businesses, error: ""});
        console.log(this.state.results);
      })
      .catch(err => {
        this.setState({error: err.message});
        console.log(this.state.error);
      });
  }

  updateSearchLocation(searchLocation) {
    // update the state value searchLocation given the input from the search bar
    this.setState({searchLocation: searchLocation});
  }

  userPlaceSavedFalse(yelpId) {
    // remove the yelpID to the user's Saved Places
    console.log("userPlaceSavedFalse");

    let newPlaces = [...this.state.userPlaces];   // clone places
    let places = newPlaces.filter((place) => {
       if (place.place_id === yelpId) {
          place.isSaved = false;
          if (place.isSaved !== true && place.wasVisited !== true) {
            console.log("at least one is true...")
            return place;
          }
        }
    });
    this.setState({userPlaces: places},() => {console.log("this.state.userPlaces: ", this.state.userPlaces)});
  }

  userPlaceSavedTrue(yelpId) {
    // add the yelpID to the user's Saved Places
    console.log("userPlaceSavedTrue");

    // assumes that the user is accessible in the params and has an
    // attribute called places which has a yelpId
    let newPlaces = [...this.state.userPlaces];   // clone places
    let placeFound = false;
    let places = newPlaces.filter((place) => {
       if (place.place_id === yelpId) {
          placeFound = true;
          place.isSaved = true
        }

        return place;
    });
    if (placeFound === false) {
      places.push(
        { isSaved: true,
          wasVisited: false, 
          place_id: yelpId});
    }
    this.setState({userPlaces: places},() => {console.log("this.state.userPlaces: ", this.state.userPlaces)});
  }

  userPlaceWasVisitedFalse(yelpId) {
    // remove the yelpID to the user's visited Places
    console.log("userPlaceWasVisitedFalse...");
    
    // assumes that the user is accessible in the params and has an
    // attribute called places which has a yelpId
    let newPlaces = [...this.state.userPlaces];    // clone places
    let places = newPlaces.filter((place) => {
      if (place.place_id === yelpId) {
        place.wasVisited = false;
      }
      return place;
    });

    this.setState({userPlaces: places},() => {console.log("this.state.userPlaces: ", this.state.userPlaces)});
  }

  userPlaceWasVisitedTrue(yelpId) {
    // add the yelpID to the user's visited Places
    console.log("userPlaceWasVisitedTrue...");

    // assumes that the user is accessible in the params and has an
    // attribute called places which has a yelpId
    let newPlaces = [...this.state.userPlaces];
    let placeFound = false;
    let places = newPlaces.filter((place) => {
       if (place.place_id === yelpId) {
          placeFound = true;
        }

        return place;
    });
    if (placeFound === false) {
      places.push(
        { isSaved: false,
          wasVisited: true, 
          place_id: yelpId});
    }
    this.setState({userPlaces: places},() => {console.log("this.state.userPlaces: ", this.state.userPlaces)});
  
  }

  getRecommendations(event) {
    // trigger the YELP api search (via the server) when the user submits
    // the search from the search bar
    API.searchYelp(this.state.searchLocation, "")
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({results: res.data.businesses, error: ""});
      })
      .catch(err => this.setState({error: err.message}));
  }

  render() {
    const {params} = this.props.navigation.state;
    console.log(params);

    // Body Content
    return (
      <View style={styles.container}>
        <SearchBar
          searchLocation={this.state.searchLocation}
          updateSearchLocation={this.updateSearchLocation.bind(this)}
          searchAction={this.getRecommendations.bind(this)}
        />
        <ScrollView>
          {this.state.results.map(recommendation => {
            recommendation.isSaved="false";
            recommendation.wasVisited="false";
            return (
              <RecCard
                key={recommendation.id}
                id={recommendation.id}
                imgUrl={recommendation.image_url}
                description={recommendation.name}
                rating={recommendation.rating}
                price={recommendation.price}
                isSaved={recommendation.isSaved}
                wasVisited={recommendation.wasVisited}
                userPlaceSavedFalse={this.userPlaceSavedFalse.bind(this)}
                userPlaceSavedTrue={this.userPlaceSavedTrue.bind(this)}
                userPlaceWasVisitedFalse={this.userPlaceWasVisitedFalse.bind(this)}
                userPlaceWasVisitedTrue={this.userPlaceWasVisitedTrue.bind(this)}
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