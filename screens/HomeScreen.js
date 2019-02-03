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
      error: ""
    }
  }

  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: 'Trek Tips',
      headerLeft: (
        <View stlye={styles.nav}>
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
                userName: params.userName
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
                userName: params.userName
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
    // we will need yelpId to update the recommendation object

    // const message = "yelpId: " + yelpId + " isSaved: FALSE";
    // alert(message);
    // console.log(message);
    let newState = Object.assign({}, this.state);
    newState.results.forEach(recommendation => { 
      if (recommendation.id === yelpId) {
        recommendation.isSaved = "false"
      };
    });

    this.setState(newState);
    
    console.log(this.state)
  }

  userPlaceSavedTrue(yelpId) {

    console.log("state: ", this.state);

    let resultCopy = [...this.state.results];
    let newResults = resultCopy.filter((result) => {
      if (result.id === yelpId) {
          result.isSaved = "true";
       }

       return result;
   });

    console.log("newResults: ", newResults);

    this.setState({results: newResults});


    console.log("state: ", this.state);
  }

  userPlaceWasVisitedFalse(yelpId) {
    // we will need yelpId to update the recommendation object

    let newState = Object.assign({}, this.state);
    newState.results.forEach(recommendation => { 
      if (recommendation.id === yelpId) {
        recommendation.wasVisited = "false"
      };
    });
    this.setState(newState);
  }

  userPlaceWasVisitedTrue(yelpId) {
    // we will need yelpId to update the recommendation object

    // const message = "yelpId: " + yelpId + " wasVisited: TRUE";
    // alert(message);
    // console.log(message);
    let newState = Object.assign({}, this.state);
    newState.results.forEach(recommendation => { 
      if (recommendation.id === yelpId) {
        recommendation.wasVisited = "false"
      };
    });
    this.setState(newState);
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
    const {navigation} = this.props;
    const {params} = navigation.state;
    const user_id = params.user_id;
    const userName = params.userName;

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