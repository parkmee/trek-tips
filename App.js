import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RecommendationsScreen from './screens/RecommendationsScreen';

<<<<<<< HEAD
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
=======
const AppNavigator = createStackNavigator({
    Login: {
      screen: LoginScreen
    },
    Home: {
      screen: HomeScreen
    },
    Recommendations: {
      screen: RecommendationsScreen
    }
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: { // Style object that wraps the header
        backgroundColor: '#FF1589',
      },
      headerTintColor: '#FFFFFF', // Used to color the back button and the title.
      headerTitleStyle: { // Customize the 'fontFamily', 'fontWeight' and other 'Text' properties
        fontWeight: 'bold',
      },
    },
  });

const AppContainer = createAppContainer(AppNavigator);
>>>>>>> d0cd37bcb1953d7b957148d461328af06dad21e4

export default class App extends Component {
  render() {
    return <AppContainer/>
  }
}
