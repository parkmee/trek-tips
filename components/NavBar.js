import React, { Component } from 'react';
import { Text,TextInput, Image, View, StyleSheet} from 'react-native';
import FontAwesome, { Icons, parseIconFromClassName} from 'react-native-fontawesome';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const searchIcon = parseIconFromClassName('fas fa-search');
    return (
      <View>
        <View style={styles.navbar}>
          <TextInput style={styles.searchInput}
                     placeholder="Search Location"
          />
        </View>
        <View style={styles.navigation}>
          <Text style={styles.recText}>Recommendations</Text>
          <Text></Text>
          <Text stylse={styles.historyText}>History</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    fontSize: 22
  },
  navbar: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: "grey",
    alignItems:'center',
    justifyContent:'center'
  },
  navigation: {
    flexDirection: 'row',
    height: 20,
    backgroundColor: "grey",
    alignItems:'center',
    justifyContent:'center'
  },
  searchIcon: {
    fontSize: 32,
    textAlign: 'right',
    color: '#333333',
  },
  recText: {
    flexDirection: 'row',
    fontSize: 14,
    textAlign: 'left',
    color: '#333333',
  },
  historyText: {
    flexDirection: 'row',
    fontSize: 14,
    textAlign: 'right',
    color: '#333333',
  },
});

export default NavBar;