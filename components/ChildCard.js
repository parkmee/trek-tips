import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const ParentCard = props => {
  return (
    <View
      style={{
        backgroundColor: props.color,
        width: '50%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity
        style={styles.view}
        onPress={props.handlePress}
      >
        <View style={styles.view}>
          <Text style={styles.text}>
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#F5FCFF',
    fontWeight: '500',
    fontSize: 18
  }
});

export default ParentCard;