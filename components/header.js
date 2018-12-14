import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';


export default class Header extends Component {
  render() {
    return (
      <View style={styles.component1}>
        <TouchableOpacity onPress={()=> {this.props.openDraw()}} style={styles.touchableButton}>
          <Image
            style={styles.headerButton}
            source={require('../world.png')}
          />
        </TouchableOpacity>
        {/* <Button title="Press" onPress={()=> {console.log("presniety")}}></Button> */}
        <Text style={styles.welcome}>Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component1: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //alignSelf: 'stretch',
    //alignItems: 'center',
    backgroundColor: 'red',
    height: 56,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    fontWeight: 'bold',
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'yellow',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  touchableButton: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerButton: {

  }
});
