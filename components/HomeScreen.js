import React, {Component} from 'react';
import {StyleSheet, View,Image,} from 'react-native';
import { DrawerActions, } from "react-navigation";
import { background } from "./styles/commonStyles";
import StackNavigator from './StackNavigator';

export default class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home', 
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../img/world.png')}
          //style={{tintColor: tintColor}}
        />
      ),
    }
  };

  render() {
    //console.log("props homescreen",  this.props)
    return (
      <View style={styles.container}>
        {/* <Header /> */}
        <StackNavigator openDraw={()=> { this.props.navigation.dispatch(DrawerActions.openDrawer())}}
                  lists={this.props.screenProps.lists} primaryColor={this.props.screenProps.primaryColor}
                  deletedList={this.props.screenProps.deletedList} />      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: background,
    flexDirection: 'column',
  },
});