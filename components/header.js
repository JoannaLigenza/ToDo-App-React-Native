import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity,} from 'react-native';


export default class Header extends Component {
  render() {
    return (
      <View style={[styles.component1, {backgroundColor: this.props.primaryColor }]}>
        <View style={styles.component2}>
            <TouchableOpacity activeOpacity={1} onPress={()=> {this.props.openDraw()}} style={styles.touchableButton}>
              <Image source={require('../img/world.png')} />
            </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 55,
    elevation: 4,
  },
  component2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  touchableButton: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});
