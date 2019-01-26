import React, { Component } from 'react';
import { Text, Image, View, StyleSheet} from 'react-native';
import FontAwesome, { Icons, parseIconFromClassName} from 'react-native-fontawesome';

class RecommendationTile extends Component {
  constructor(props) {
    super(props);
    console.log("imgUrl: ", this.imgUrl);

    this.state = {
      isSaved: props.isSaved,
      wasVisited: props.wasVisited,
      imgUrl: props.imgUrl,
      rating: props.rating,
      price: this.priceString(props.price),
      description: props.description
    };
  }

  priceString(price) {
    let priceString;
    switch (price) {
      case "1":
        priceString = "$";
        break;
      case "2":
        priceString = "$$";
        break;
      case "3":
        priceString = "$$$";
        break;
      case "":
        priceString = "$$$$";
        break;
      default:
        priceString = "";
        break;
    }
    return priceString;
  }

  render() {
    const heartIcon = parseIconFromClassName('fa fa-heart');
    const checkIcon = parseIconFromClassName('fa fa-check');
    return (
      <View>
        <Image
          style={styles.imgStyle}
          source={{uri: this.state.imgUrl}}
        />
        <Text style={styles.rating}>{this.state.rating}</Text>
        <FontAwesome style={styles.savedIcon}>{heartIcon}</FontAwesome>
        <FontAwesome style={styles.wasVisitedIcon}>{checkIcon}</FontAwesome>
        <Text style={styles.price}>- {this.state.price}</Text>
        <Text style={styles.description}>{this.state.description}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgStyle: {
    width: 150,
    height: 150
  },
  description: {
    top: -164,
    left: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: "red",
  },
  savedIcon: {
    top: -170,
    left: 105,
    fontSize: 32,
    textAlign: 'left',
    color: 'red',
  },
  wasVisitedIcon: {
    top: -200,
    left: 65,
    fontSize: 32,
    textAlign: 'left',
    color: '#333333',
  },
  price: {
    top: -118,
    left: 30,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'red',
  },
  rating: {
    top: -30,
    left: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default RecommendationTile;