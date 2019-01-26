import React, { Component } from 'react';
import { Text, Image, View, StyleSheet} from 'react-native';
import FontAwesome, { Icons, parseIconFromClassName} from 'react-native-fontawesome';

class RecommendationTile extends Component {
    constructor(props) {
        super(props);
    }

    toggleSaved() {
        alert("saved icon pressed" + this.props.description);

        // TODO: put code here to do axios put to update isSaved

    }

    toggleVisited () {
        alert("visited icon pressed" + this.props.description);

        // TODO: put code here to do axios put to update wasVisited

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
                    source={{uri: this.props.imgUrl}}
                />
                <Text style={styles.rating}>
                    {this.props.rating}
                </Text>
                <FontAwesome style={this.props.isSaved ? styles.savedIconTrue : styles.savedIconFalse}
                    onPress={this.toggleSaved}>
                    {heartIcon}
                </FontAwesome>
                <FontAwesome style={this.props.wasVisited ? styles.wasVisitedIconTrue : styles.wasVisitedIconFalse}
                    onPress={this.toggleVisited}>
                    {checkIcon}
                </FontAwesome>
                <Text style={styles.price}> 
                    - {this.props.price}
                </Text>
                <Text style={styles.description}>
                    {this.props.description}
                </Text>
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
        color: "white",
    },
    savedIcon: {
        top: -170,
        left: 105,
        fontSize: 32,
        textAlign: 'left',
        color: 'red',
    },
    savedIconTrue: {
        top: -170,
        left: 105,
        fontSize: 32,
        textAlign: 'left',
        color: 'red',
    },
    savedIconFalse: {
        top: -170,
        left: 105,
        fontSize: 32,
        textAlign: 'left',
        color: 'grey',
    },
    wasVisitedIcon: {
        top: -200,
        left: 65,
        fontSize: 32,
        textAlign: 'left',
        color: '#333333',
    },
    wasVisitedIconTrue: {
        top: -200,
        left: 65,
        fontSize: 32,
        textAlign: 'left',
        color: 'green',
    },
    wasVisitedIconFalse: {
        top: -200,
        left: 65,
        fontSize: 32,
        textAlign: 'left',
        color: 'grey',
    },
    price: {
        top: -118,
        left: 30,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'white',
    },
    rating: {
        top: -30,
        left: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
  });

export default RecommendationTile;