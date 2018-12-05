/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import Header from './components/header';
import Main from './components/Main';
import Footer from './components/Footer';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <Main />
        </ScrollView>
        
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    flexDirection: 'column',
    //justifyContent: 'space-between',
  }
});
