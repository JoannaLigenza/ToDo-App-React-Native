import React, {Component, PureComponent} from 'react';
import {StyleSheet, View,Image,} from 'react-native';
import { DrawerActions, } from "react-navigation";
import { background } from "./styles/commonStyles";
import StackNavigator from './StackNavigator';

export default class HomeScreen extends PureComponent {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home', 
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <View>
          <View style={styles.menu}></View>
          <View style={styles.menu}></View>
          <View style={styles.menu}></View>
        </View>
      ),
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Header /> */}
        <StackNavigator openDraw={()=> { this.props.navigation.dispatch(DrawerActions.openDrawer())}}
                  lists={this.props.screenProps.lists} primaryColor={this.props.screenProps.primaryColor}
                  deletedList={this.props.screenProps.deletedList} deletedTasks={this.props.screenProps.deletedTasks}/>      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    width: 20,
    height: 2,
    backgroundColor: '#111',
    margin: 2,
    borderRadius: 3,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: background,
    flexDirection: 'column',
  },
});