import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Card, Text, Title, Button } from 'react-native-paper';
import FontAwesome, { Icons, IconTypes, parseIconFromClassName} from 'react-native-fontawesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

class RecCard extends Component {
  constructor(props) {
    super(props);
  }

  static priceString(price) {
    let priceString;
    switch (price) {
      case "$":
        priceString = "   $";
        break;
      case "$$":
        priceString = "  $$";
        break;
      case "$$$$":
        priceString = " $$$";
        break;
      case "$$$$":
        priceString = "$$$$";
        break;
      default:
        priceString = " N/A";
        break;
    }
    return priceString;
  }

  toggleVisited() {
    if (this.props.wasVisited === "true") {
      this.props.userPlaceWasVisitedFalse(this.props.id);
    } else {
      this.props.userPlaceWasVisitedTrue(this.props.id);
    }

    
  }

  toggleSaved () {
    if (this.props.isSaved === "true") {
      console.log("isSaved == true");
      this.props.userPlaceSavedFalse(this.props.id);
    } else {
      this.props.userPlaceSavedTrue(this.props.id);
    }
  }

  savedIconTrue () {
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
    return (
      <FontAwesome5 name={'heart'} 
        style={styles.isSavedFalse}
        onPress={this.toggleSaved.bind(this)}
      />
    )
  }

  wasVisitedIconTrue () {
    return (
      <Text
        style={styles.isSavedTrue}
        onPress={this.toggleVisited.bind(this)}
      >
        <FontAwesome type={IconTypes.FAS}>{Icons.bookmark}</FontAwesome>
      </Text>
    )
  }

  wasVisitedIconFalse () {
    return (
      <FontAwesome5 name={'bookmark'} 
        style={styles.isSavedFalse}
        onPress={this.toggleVisited.bind(this)}
      />
    )
  }

  render() {
    console.log(this.props.description + " : isSaved?: " + this.props.isSaved);
    return (
      <Card style={styles.recCard}>
        <Card.Content>
          <Title>{this.props.description}</Title>
          <Card.Cover
            source={{ uri: this.props.imgUrl}}
            style={styles.imgStyle}/>
        </Card.Content>
        <Card.Actions>
          <Text style={styles.legend}>
            {this.props.rating} - {RecCard.priceString(this.props.price)}
          </Text>
          {this.props.isSaved === "true" ? this.savedIconTrue() : this.savedIconFalse()}
          {this.props.wasVisited === "true" ? this.wasVisitedIconTrue() : this.wasVisitedIconFalse()}
        </Card.Actions>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  imgStyle: {
    paddingHorizontal: 3,
  },
  legend: {
    flex: 1,
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
  recCard: {
    marginBottom: 5
  },
});


export default RecCard;