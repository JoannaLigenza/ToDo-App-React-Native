import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colorPrimary, colorSecondary} from "./styles/commonStyles";


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
    //alignSelf: 'stretch',
    height: 50,
    backgroundColor: colorPrimary,
  },

});
