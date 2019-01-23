import React, { Component } from 'react';
import { Text, Image, View, StyleSheet} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

class RecommendationTile extends Component {
    constructor(props) {
        super(props);
        console.log("imgUrl: ", this.imgUrl);

        this.state = {
            isSaved: props.isSaved,
            wasVisited: props.wasVisited,
            imgUrl: props.imgUrl,
            rating: props.rating,
            price: props.price,
            rating: props.rating,
            description: props.description
        };
    }
    render() {
        return (
            <View>
                <FontAwesome style={{fontSize: 32}}>{Icons.chevronLeft}</FontAwesome>
                <Text style={styles.isSaved}>{this.state.isSaved}</Text>
                <Text style={styles.wasVisited}>{this.state.wasVisited}</Text>
                <Image
                    style={styles.imgStyle}
                    source={{uri: this.state.imgUrl}}
                />
                <Text style={styles.rating}>{this.state.rating}</Text>
                <Text style={styles.price}>{this.state.price}</Text>
                <Text style={styles.description}>{this.state.description}</Text>
          </View>
        )
     }
}

const styles = StyleSheet.create({
    imgStyle: {
      width: 125,
      height: 125
    },
    description: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    isSaved: {
      textAlign: 'right',
      color: 'red',
      marginBottom: 5,
    },
    wasVisited: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    rating: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    price: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
  });

export default RecommendationTile;