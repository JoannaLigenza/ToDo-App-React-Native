import React, {Component} from 'react';
import {Text, View, } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import AppNavigator from '../App';

export default class EditTask extends Component {

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Text>
            Editing Task...
        </Text>

      </View>
    );
  }
}


