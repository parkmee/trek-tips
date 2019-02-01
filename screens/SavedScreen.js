import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RecCard from "../components/RecCard";
import API from "../utils/API";

export default class SavedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchLocation: "Atlanta, GA",
      searchCategories: "dessert",
      results: [],
      error: "",
      filter: 'ALL'
    };

    this.showAll = this.showAll.bind(this);
    this.showSaved = this.showSaved.bind(this);
    this.showVisited = this.showVisited.bind(this);
  }

  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: `${params.userName}'s Saved Tips`,
      headerLeft: (<TouchableOpacity
          style={{backgroundColor: navigationOptions.headerStyle.backgroundColor}}
          onPress={() => navigation.navigate('Home', {
            user_id: params.user_id,
            userName: params.userName
          })}
        >
          <Text style={{
            color: navigationOptions.headerTintColor,
            marginLeft: 10
          }}>
            Home
          </Text>
        </TouchableOpacity>
      )
    }
  };

  showAll() {
    console.log('View All');
    this.setState({filter: 'ALL'}, () => console.log(this.state.filter))
  }

  showSaved() {
    console.log('View Saved');
    this.setState({filter: 'SAVED'}, () => console.log(this.state.filter))
  }

  showVisited() {
    console.log('View Visited');
    this.setState({filter: 'VISITED'}, () => console.log(this.state.filter))
  }

  /*  componentWillMount() {
      // trigger the YELP api search (via the server) when the screen loads
      API.searchYelp(this.state.searchLocation, "")
        .then(res => {
          if (res.data.status === "error") {
            throw new Error(res.data.message);
          }
          this.setState({ results: res.data.businesses, error: "" });
          console.log(this.state.results);
        })
        .catch(err => {
          this.setState({ error: err.message });
          console.log(this.state.error);
        });
    }*/

  render() {
    const {navigation} = this.props;
    const userName = navigation.getParam('userName', 'Default Value');

    // Body Content
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ScrollView>
            {this.state.results.map(recommendation => {
              return (
                <RecCard
                  key={recommendation.id}
                  imgUrl={recommendation.image_url}
                  description={recommendation.name}
                  rating={recommendation.rating}
                  price={recommendation.price}
                  isSaved="false"
                  wasVisited="false"
                />
              )
            })}
          </ScrollView>
        </View>
        <View style={styles.filterBar}>
          <TouchableOpacity
            style={style.filter}
            onPress={this.showAll}
          >
            <Text style={this.state.filter === 'ALL'
              ? styles.filterActiveText
              : styles.filterText}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={this.showSaved}
          >
            <Text style={this.state.filter === 'SAVED'
              ? styles.filterActiveText
              : styles.filterText}
            >
              Saved
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={this.showVisited}
          >
            <Text style={this.state.filter === 'VISITED'
              ? styles.filterActiveText
              : styles.filterText}
            >
              Visited
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#B1A296'
  },
  welcome: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    margin: 10,
    color: '#FF1589'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  filterBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF'
  },
  filter: {
    color: "black",
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#F5FCFF',
    borderRadius: 5
  },
  filterText: {
    color: 'black',
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
  },
  filterActiveText: {
    color: '#FF1589',
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  }
});