import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';
import {ThemeColor, colorPrimary, colorSecondary, kolorowy} from "./styles/commonStyles";


export default class Header extends Component {
  render() {
    console.log("header props ", this.props)
    return (
      <View style={[styles.component1, {backgroundColor: this.props.primaryColor }]}>
      {/* <View style={[styles.component1, {backgroundColor: ThemeColor.background[kolorowy]}]}> */}
        <View style={styles.component2}>
            <TouchableOpacity activeOpacity={1} onPress={()=> {this.props.openDraw()}} style={styles.touchableButton}>
              <Image
                style={styles.headerButton}
                source={require('../world.png')}
              />
            </TouchableOpacity>
            {/* <Button title="Press" onPress={()=> {console.log("presniety")}}></Button> */}
            <Text style={styles.headerText}>Home</Text>
        </View>
        
        <TouchableOpacity activeOpacity={1} onPress={()=> {this.props.getTaskFilter('','','')}} >
            <Text style={styles.headerText}>All Tasks</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component1: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //alignSelf: 'stretch',
    //alignItems: 'center',
    //backgroundColor: ThemeColor.background[kolorowy],
    height: 55,
    // shadowOffset: { width: 10, height: 10,  },
    // shadowColor: 'black',
    // shadowOpacity: 1,
    // shadowRadius: 0,
    elevation: 4,
  },
  component2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    fontWeight: 'bold',
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'yellow',
  },
  touchableButton: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
