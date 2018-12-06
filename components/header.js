import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


export default class Header extends Component {
  render() {
    return (
      <View style={styles.component1}>
        <Text style={styles.welcome}>Welcome Asska!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component1: {
    // flex: 1,
   // justifyContent: 'flex-start',
    //alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'red',
    height: 50,
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
});
