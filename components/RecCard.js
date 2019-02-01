import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Card, Text, Title, Button } from 'react-native-paper';
import FontAwesome, { Icons, IconTypes, parseIconFromClassName} from 'react-native-fontawesome';

class RecCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasVisited: this.props.wasVisited,
      isSaved: this.props.isSaved
    }
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
    alert("visited button clicked");
    if (this.state.wasVisited === "true") {
      this.setState({wasVisited: "false"});
    } else {
      this.setState({wasVisited: "true"});
    }

    // TODO: axios call to update the property in mongoose
  }

  toggleSaved () {
    alert("saved button clicked");
    if (this.state.isSaved === "true") {
      this.setState({isSaved: "false"});
    } else {
      this.setState({isSaved: "true"});
    }

    // TODO: axios call to update the property in mongoose
  }

  render() {
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
          <Text
            style={this.state.isSaved === "true" ? styles.isSavedTrue : styles.isSavedFalse}
            onPress={this.toggleSaved.bind(this)}
          >
            <FontAwesome type={IconTypes.FAS}>{Icons.heart}</FontAwesome>
          </Text>
          <Text
            style={this.state.wasVisited === "true" ? styles.wasVisitedTrue : styles.wasVisitedFalse}
            onPress={this.toggleVisited.bind(this)}
          >
            <FontAwesome type={IconTypes.FAS}>{Icons.bookmark}</FontAwesome>
          </Text>
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
    color: "green",
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