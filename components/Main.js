import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


export default class Main extends Component {
  render() {
    return (
      <View style={styles.component2}>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component2: {
    // flex: 5,
    //justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderColor: 'blue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
