import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';

class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.inputWrapper}>
                <TextInput
                    label='Search City, State or Zip'
                    value={this.props.city}
                    onChangeText={text => this.props.searchTerm = text}
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
        backgroundColor: '#FF1589',
    },
    searchInput: {
        flex: 1,
        height: 45,
        width: 300,
        fontSize: 22
    },
  });

export default SearchBar;