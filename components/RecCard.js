import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Card, Text, Title} from 'react-native-paper';
import FontAwesome, {Icons, IconTypes, parseIconFromClassName} from 'react-native-fontawesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import API from "../utils/API";

class RecCard extends Component {

  // toggleVisited = () => {
  //   /*
  //     when visited icon is pushed
  //     update the database to reflect the changed value
  //     and then update state to change the icon
  //   */
  //   if (this.props.hasVisited === true) {
  //     console.log("setting hasVisited to false");
  //     this.props.removeUserVisitedPlace(this.props.userId, this.props.id);
  //   } else {
  //     console.log("setting isSaved to true");
  //     this.props.addUserVisitedPlace(this.props.userId, this.props.placeData);
  //   }
  // };

  // toggleSaved = () => {
  //   /*
  //    when saved icon is pushed
  //    update the database to reflect the changed value
  //    and then update state to change the icon
  //  */
  //   if (this.props.isSaved === true) {
  //     console.log("setting isSaved to false");
  //     this.props.removeUserSavedPlace(this.props.userId, this.props.id);
  //   } else {
  //     console.log("setting isSaved to true");
  //     this.props.addUserSavedPlace(this.props.userId, this.props.placeData);
  //   }
  // };

  savedIconTrue = () => {
    /*
      render the icon which indicate place is saved
    */
    return (
      <TouchableOpacity
        onPress={this.props.removeUserSavedPlace}
      >
        <FontAwesome type={IconTypes.FAS} style={styles.isSavedTrue}>{Icons.heart}</FontAwesome>
      </TouchableOpacity>
    )
  };

  savedIconFalse = () => {
    /*
      render the icon which indicate place is NOT saved
    */
    return (
      <TouchableOpacity
        onPress={this.props.addUserSavedPlace}
      >
        <FontAwesome5 name={'heart'} style={styles.isSavedFalse}/>
      </TouchableOpacity>
    )
  };

  wasVisitedIconTrue = () => {
    /*
      render the icon which indicate place was visited
    */
    return (
      <TouchableOpacity
        onPress={this.props.removeUserVisitedPlace}
      >
        <FontAwesome type={IconTypes.FAS} style={styles.wasVisitedTrue}>{Icons.bookmark}</FontAwesome>
      </TouchableOpacity>
    )
  };

  wasVisitedIconFalse = () => {
    /*
      render the icon which indicate place was NOT visited
    */
    return (
      <TouchableOpacity
        onPress={this.props.addUserVisitedPlace}
      >
        <FontAwesome5 name={'bookmark'} style={styles.wasVisitedFalse}/>
      </TouchableOpacity>
    )
  };

  // static navigationOptions = ({navigation, navigationOptions}) => {
  //     const {params} = navigation.state;
  // }

  render() {
    return (
      <Card style={styles.recCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>{this.props.description}</Title>
        </Card.Content>
        <TouchableOpacity
          onPress={this.props.toDetails}
        >
          <Card.Cover
            source={{uri: this.props.imgUrl}}
          />
        </TouchableOpacity>
        <Card.Actions>
          <Text style={styles.legend}>
            {this.props.rating} - {this.props.price ? this.props.price : "N/A"}
          </Text>
          {this.props.isSaved === true ? this.savedIconTrue() : this.savedIconFalse()}
          {this.props.hasVisited === true ? this.wasVisitedIconTrue() : this.wasVisitedIconFalse()}
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