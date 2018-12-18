import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';
import {colorPrimary, colorSecondary} from "./styles/commonStyles";


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
    backgroundColor: colorPrimary,
    height: 55,
    shadowOffset: { width: 10, height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
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
});
