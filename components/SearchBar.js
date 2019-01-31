import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //var updatesearchLocation = this.props.updatesearchLocation;
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          label='Search City, State or Zip'   
          value={this.props.searchLocation}       // this is from the parent prop searchLocation
          onChangeText = {this.props.updateSearchLocation}  // update parent state for location                 
          onSubmitEditing = {this.props.searchAction}       // call yelp API to query  
          style={styles.searchInput}
        />      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    height: 50,
    alignItems: 'stretch',
  },
  searchInput: {
    flex: 1,
    height: 45,
    width: 330,
    fontSize: 22
  },
});

export default SearchBar;