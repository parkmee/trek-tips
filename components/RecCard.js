import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Title, Button } from 'react-native-paper';

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
    const savedButtonColor = this.state.isSaved === "true" ? "green" : "grey";
    const visitedButtonColor = this.state.wasVisited === "true" ? "green" : "grey";

    return (
      <Card>
        <Card.Content>
          <Title>{this.props.description}</Title>
          <Card.Cover
            source={{ uri: this.props.imgUrl}}
            style={styles.imgStyle}/>
        </Card.Content>
        <Card.Actions>
          <Text>
            {this.props.rating} - {RecCard.priceString(this.props.price)}
          </Text>
          <Button
            color={savedButtonColor}
            onPress={this.toggleSaved.bind(this)}>
            Saved
          </Button>
          <Button
            color={visitedButtonColor}
            onPress={this.toggleVisited.bind(this)}>
            Visited
          </Button>
        </Card.Actions>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  imgStyle: {
    width: 300,
    height: 150
  },
  btnPanel: {
    alignContent: "stretch"
  },
  btnSavedTrue: {
    color: "green"
  },
  btnSavedFalse: {
    color: "grey"
  },
  btnVisitedTrue: {
    color: "green"
  },
  btnVisitedFalse: {
    color: "grey"
  },
});


export default RecCard;