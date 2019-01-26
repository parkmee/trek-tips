import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
// import NavBar from "./components/NavBar/NavBar"; <--no such file or folder or component
import RecommendationTile from './components/RecommendationTile/RecommendationTile';
import NavBar from './components/NavBar/NavBar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggleSaved = this.toggleSaved.bind(this);
    this.toggleVisited = this.toggleVisited.bind(this);

    this.state = {
      recommendations: [
        {
          recommendationId: 1,
          imgUrl: "https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg",
          description: "Gary's House",
          rating: "4",
          price: "2",
          isSaved: false,
          wasVisited: false
        },
        {
          recommendationId: 2,
          imgUrl: "https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg",
          description: "Brintz's House",
          rating: "5",
          price: "4",
          isSaved: false,
          wasVisited: false
        },
        {
          recommendationId: 3,
          imgUrl: "https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg",
          description: "Dalton's House",
          rating: "3",
          price: "3",
          isSaved: false,
          wasVisited: false
        },
        {
          recommendationId: 4,
          imgUrl: "https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg",
          description: "Meeyoung's House",
          rating: "4.5",
          price: "5",
          isSaved: false,
          wasVisited: false
        }
    ]}

  }

  recommendationList() {
    return this.state.recommendations.map((recommendation) => {
      return (
        <RecommendationTile
          key={recommendation.recommendationId}
          imgUrl={recommendation.imgUrl}
          description={recommendation.description}
          rating={recommendation.rating}
          isSaved={recommendation.isSaved}
          price={recommendation.price}
          wasVisited={recommendation.wasVisited}
        />
      )
    })
  }

  toggleSaved(recommendation) {
    alert("saved icon pressed" + recommendation.description);
    if (recommendation.isSaved) {
      recommendation.isSaved = false;
    } else {
      recommendation.isSaved = true;
    }
  }

  toggleVisited (recommendation) {
      alert("visited icon pressed" + recommendation.description);
      if (recommendation.wasVisited) {
        recommendation.wasVisited = false;
      } else {
        recommendation.wasVisited = true;
      }
  }

  render() {
    return (
      <View>
        <NavBar />
        <ScrollView contentContainer={styles.contentContainer}>
          {this.recommendationList()}
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1'
 }
});
