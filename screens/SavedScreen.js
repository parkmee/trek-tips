import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {NavigationEvents} from 'react-navigation'
import RecCard from "../components/RecCard";
import API from "../utils/API";

export default class SavedScreen extends Component {

  state = {
    searchLocation: "Atlanta, GA",
    searchCategories: "dessert",
    results: [],
    error: "",
    filter: 'ALL'
  };

  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: `${params.user_name}'s Saved Tips`,
      headerLeft: (<TouchableOpacity
          style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
          onPress={() => navigation.navigate('Home', {
            user_id: params.user_id,
            user_name: params.user_name
          })}
        >
          <Text style={{
            color: navigationOptions.headerTintColor,
            marginLeft: 10
          }}>
            <FontAwesome5 name={'home'} style={{fontSize: 20}}/>
          </Text>
        </TouchableOpacity>
      )
    }
  };

  showAll = () => {
    // get all user places entries for display on the UI
    const {params} = this.props.navigation.state;

    API.getAllUserPlaces(params.user_id)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({results: res.data, error: "", filter: 'ALL'});
      })
      .catch(err => {
        this.setState({error: err.message});
        console.log(this.state.error);
      });
  };

  showSaved = () => {
    // get all saved entries for display on the UI
    const {params} = this.props.navigation.state;

    API.getUserSavedPlaces(params.user_id)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({results: res.data, error: "", filter: 'SAVED'});
      })
      .catch(err => {
        this.setState({error: err.message});
        console.log(this.state.error);
      });
  };

  showVisited = () => {
    // get all saved entries for display on the UI
    const {params} = this.props.navigation.state;

    API.getUserVisitedPlaces(params.user_id)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({results: res.data, error: "", filter: 'VISITED'});
      })
      .catch(err => {
        this.setState({error: err.message});
        console.log(this.state.error);
      });
  };

  addUserSavedPlace = (userId, placeData) => {
    API.addUserSavedPlace(userId, placeData)
    .then(res => {
      if (res.data.status === "error") {
        throw new Error(res.data.message);
      }
      this.rerender();
    })
    .catch(err => {
      this.setState({error: err.message});
      console.log(this.state.error);
    });
  }

  removeUserSavedPlace = (userId, placeId) => {
    API.removeUserSavedPlace(userId, placeId)
    .then(res => {
      if (res.data.status === "error") {
        throw new Error(res.data.message);
      }
      this.rerender();
    })
    .catch(err => {
      this.setState({error: err.message});
      console.log(this.state.error);
    });
  }

  addUserVisitedPlace = (userId, placeData) => {
    API.addUserVisitedPlace(userId, placeData)
    .then(res => {
      if (res.data.status === "error") {
        throw new Error(res.data.message);
      }
      this.rerender();
    })
    .catch(err => {
      this.setState({error: err.message});
      console.log(this.state.error);
    });
  }

  removeUserVisitedPlace = (userId, placeId) => {
    API.removeUserVisitedPlace(userId, placeId)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.rerender();
      })
      .catch(err => {
        this.setState({error: err.message});
        console.log(this.state.error);
      });
  }

  rerender() {
    switch (this.state.filter) {
      case "ALL":
        this.showAll();
        break;
      case "SAVED":
        this.showSaved();
        break;
      case "VISITED":
        this.showVisited();
        break;
      default:
        this.showAll();
        break;
    }
  }

  render() {
    const {params} = this.props.navigation.state;
    //console.log(params);

    // Body Content
    return (
      <View style={styles.container}>
      <NavigationEvents
          onWillFocus={() => this.showAll()}    // remove this if we don't want default loading
        />
        <View style={styles.content}>      
          <ScrollView style={styles.recCard}>
            {this.state.results.map(recommendation => {
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
                  recommendationData={recommendation.place}
                  userId={params.user_id}
                  addUserSavedPlace = {() => this.addUserSavedPlace(params.user_id, recommendation.place)}
                  removeUserSavedPlace = {() => this.removeUserSavedPlace(params.user_id, recommendation.place.id)}
                  addUserVisitedPlace = {() => this.addUserVisitedPlace(params.user_id, recommendation.place)}
                  removeUserVisitedPlace = {() => this.removeUserVisitedPlace(params.user_id, recommendation.place.id)}
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
        <View style={styles.filterBar}>
          <TouchableOpacity
            style={styles.filter}
            onPress={this.showAll}
          >
            <Text style={this.state.filter === 'ALL'
              ? styles.filterActiveText
              : styles.filterText}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={this.showSaved}
          >
            <Text style={this.state.filter === 'SAVED'
              ? styles.filterActiveText
              : styles.filterText}
            >
              Saved
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={this.showVisited}
          >
            <Text style={this.state.filter === 'VISITED'
              ? styles.filterActiveText
              : styles.filterText}
            >
              Visited
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

// StyleSheet
const styles = StyleSheet.create({
  recCard: {
    width: "100%"
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#333333'
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
    width: "100%"
  },
  filterBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF'
  },
  filter: {
    color: "black",
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#F5FCFF',
    borderRadius: 5
  },
  filterText: {
    color: 'black',
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
  },
  filterActiveText: {
    color: '#B500A9',
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
  }
});