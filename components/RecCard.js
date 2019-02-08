import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, WebView } from 'react-native';
import { Card, Text, Title, Button } from 'react-native-paper';
import FontAwesome, { Icons, IconTypes, parseIconFromClassName} from 'react-native-fontawesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import API from "../utils/API";
import {NavigationEvents} from 'react-navigation';

class RecCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaved: this.props.isSaved,
      hasVisited: this.props.hasVisited
    };
  }

  toggleVisited() {
    /* 
      when visited icon is pushed
      update the database to reflect the changed value
      and then update state to change the icon
    */
    if (this.state.hasVisited === "true") {
      console.log("setting hasVisited to false");
      API.removeUserVisitedPlace(this.props.userId, this.props.id)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({hasVisited: "false"});
      })
      .catch(err => this.setState({error: err.message}));
    } else {
      console.log("setting isSaved to true");
      API.addUserVisitedPlace(this.props.userId, this.props.placeData)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({hasVisited: "true"});
      })
      .catch(err => this.setState({error: err.message}));
    }
  }

  toggleSaved () {
     /* 
      when saved icon is pushed
      update the database to reflect the changed value
      and then update state to change the icon
    */
    if (this.state.isSaved === "true") {
      console.log("setting isSaved to false");
      API.removeUserSavedPlace(this.props.userId, this.props.id)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({isSaved: "false"});
      })
      .catch(err => this.setState({error: err.message}));
    } else {
      console.log("setting isSaved to true");
      API.addUserSavedPlace(this.props.userId, this.props.placeData)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({isSaved: "true"});
      })
      .catch(err => this.setState({error: err.message}));
    }
  }

  savedIconTrue () {
    /* 
      render the icon which indicate place is saved
    */
    return (
      <Text
        style={styles.isSavedTrue}
        onPress={this.toggleSaved.bind(this)}
      >
        <FontAwesome type={IconTypes.FAS}>{Icons.heart}</FontAwesome>
      </Text>
    )
  }

  savedIconFalse () {
    /* 
      render the icon which indicate place is NOT saved
    */
    return (
      <FontAwesome5 name={'heart'} 
        style={styles.isSavedFalse}
        onPress={this.toggleSaved.bind(this)}
      />
    )
  }

  wasVisitedIconTrue () {
    /* 
      render the icon which indicate place was visited
    */
    return (
      <Text
        style={styles.wasVisitedTrue}
        onPress={this.toggleVisited.bind(this)}
      >
        <FontAwesome type={IconTypes.FAS}>{Icons.bookmark}</FontAwesome>
      </Text>
    )
  }

  wasVisitedIconFalse () {
    /* 
      render the icon which indicate place was NOT visited
    */
    return (
      <FontAwesome5 name={'bookmark'} 
        style={styles.wasVisitedFalse}
        onPress={this.toggleVisited.bind(this)}
      />
    )
  }

  static navigationOptions = ({navigation, navigationOptions}) => {
      const {params} = navigation.state;
  }

      



  render() {
    return (
      <Card style={styles.recCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>{this.props.description}</Title>
        </Card.Content>
        <Card.Cover
            style={styles.cardImage}
            source={{ uri: this.props.imgUrl}}
          />
        <Card.Actions>
          <Text style={styles.legend}>
            {this.props.rating} - {this.props.price ? this.props.price :  "N/A"}
          </Text>
          <FontAwesome5 name={'map'} 
            style={styles.mapIt}

            onPress={() => {
              navigationOptions = ({navigation, navigationOptions}) => {
                const {params} = navigation.state;
                navigation.navigate('Map', {
                  recommendationData: this.props.recommendationData
                })
            }
              
            }}
          />
          {this.state.isSaved === true ? this.savedIconTrue() : this.savedIconFalse()}
          {this.state.hasVisited === true ? this.wasVisitedIconTrue() : this.wasVisitedIconFalse()}
        </Card.Actions>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  legend: {
    flex: 1,
  },
  cardImage: {
    width: "100%"
  },
  cardTitle: {
    width: "100%"
  },
  isSavedTrue: {
    color: "red",
    marginLeft: 10,
    fontSize: 24
  },
  isSavedFalse: {
    color: "grey",
    marginLeft: 10,
    fontSize: 24
  },
  wasVisitedTrue: {
    color: "green",
    marginLeft: 10,
    fontSize: 24
  },
  wasVisitedFalse: {
    color: "grey",
    marginLeft: 10,
    fontSize: 24
  },
  mapIt: {
    color: "grey",
    marginLeft: 10,
    fontSize: 24
  },
  recCard: {
    width: "100%",
    marginBottom: 5
  },
});


export default RecCard;