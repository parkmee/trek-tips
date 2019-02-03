import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const ParentCard = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: props.color,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity
        style={styles.view}
        onPress={props.handlePress}
      >
        <View>
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
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#F5FCFF',
    fontWeight: '500',
    fontSize: 24
  }
});

export default ParentCard;