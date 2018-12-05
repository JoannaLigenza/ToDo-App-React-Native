import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


export default class Footer extends Component {
  render() {
    return (
      <View style={styles.component3}>
        <Text style={styles.welcome}>Footer!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component3: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: 'red'
  },

});
