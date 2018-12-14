import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state= { modalVisible: true }
  }
  
  render() {
    return (
      <View style={{marginTop: 22}}>
        <View>
          <Text>Hello World!</Text>

          <TouchableHighlight
            onPress={this.props.goBack}>
            <Text>Go Back</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}