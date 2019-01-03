import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { DrawerActions, } from "react-navigation";
import {colorPrimary} from "./styles/commonStyles";
import MainArea from './Main';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state= { 
            lists: ['Default', 'Private', 'Work'] ,
            }
  }
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
      const primaryColor = this.props.navigation.getParam('primaryColor') || '#fec538';
      console.log("propsyyyyyyyy ", primaryColor)
    return (
      <View style={styles.container}>
        {/* <Header /> */}
        <MainArea openDraw={()=> { this.props.navigation.dispatch(DrawerActions.openDrawer())}}
                  lists={this.state.lists} primaryColor={primaryColor} />
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