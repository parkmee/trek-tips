import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RecCard from "../components/RecCard"

export default class SavedScreen extends Component {
  // Header Options
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: `${params.userName}'s Saved Tips`,
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    }
  };

  render() {
    // const {navigation} = this.props;
    // const userName = navigation.getParam('userName', 'Default Value');

    // Body Content
    return (
      <View style={styles.container}>
        <View style={styles.filterBar}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => console.log('View All')}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => console.log('View Saved')}
          >
            <Text style={styles.filterText}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => console.log('View Visited')}
          >
            <Text style={styles.filterText}>Visited</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <ScrollView>
            <RecCard
              imgUrl="https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg"
              description="Gary's House"
              rating="4"
              price="4"
              isSaved="false"
              wasVisited="true"
            />
            <RecCard
              imgUrl="https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg"
              description="Steve's House"
              rating="4"
              price="2"
              isSaved="true"
              wasVisited="true"
            />
            <RecCard
              imgUrl="https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg"
              description="Mike's House"
              rating="1"
              price="1"
              isSaved="false"
              wasVisited="true"
            />
            <RecCard
              imgUrl="https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_640.jpg"
              description="Mary's House"
              rating="2"
              price="3"
              isSaved="false"
              wasVisited="true"
            />
          </ScrollView>
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
    backgroundColor: '#F5FCFF'
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
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#F5FCFF',
    borderRadius: 5
  },
  filterText: {
    color: '#FF1589',
    fontWeight: '600',
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