import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default class Footer extends Component {
  render() {
    return (
      <View style={[styles.component, {backgroundColor: this.props.primaryColor }]}>
        {/* <Text style={styles.welcome}>Footer!</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
  },

});
