import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { DrawerActions, } from "react-navigation";
import MainArea from './Main';

export default class HomeScreen extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state= { 
  //           lists: ['Default', 'Private', 'Work'],    // read from data base
  //           }
  // }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home', 
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../world.png')}
          //style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    }
  };


  render() {
    console.log("props homescreen",  this.props)
    return (
      <View style={styles.container}>
        {/* <Header /> */}
        <MainArea openDraw={()=> { this.props.navigation.dispatch(DrawerActions.openDrawer())}}
                  lists={this.props.screenProps.lists} primaryColor={this.props.screenProps.primaryColor} />
        {/* <Button title="Press" onPress={() => {this.props.navigation.dispatch(DrawerActions.openDrawer())}}></Button> */}       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
    flexDirection: 'column',
    //justifyContent: 'space-between',
  },
});