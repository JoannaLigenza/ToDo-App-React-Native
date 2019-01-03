import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { createDrawerNavigator, createStackNavigator, createAppContainer, DrawerActions, createSwitchNavigator } from "react-navigation";
import {colorPrimary, colorSecondary} from "./components/styles/commonStyles";
import MainArea from './components/Main';
import HomeScreen from './components/HomeScreen';
import PickColor from './components/PickColor';



const MyDrawerNavigator = createDrawerNavigator({
  Home: { screen: HomeScreen },
  'App Color': {screen: PickColor },
  'Add List' : {screen: (props) => <TasksOrder {...props} screenProps={"prop"} tasks={'prop'}/> },
  Zobacz: { screen: (props) => <TasksOrder {...props} screenProps={"prop"} tasks={'prop'}/> }
},
{
    initialRouteName: 'Home',
    //contentComponent: HomeScreen,
    drawerWidth: 300,
    drawerPosition: 'left',
    navigationOptions: {
      headerStyle: { backgroundColor: colorPrimary },
      //title: 'My Chats'
      headerLeft: navigation => {
        //return <MenuButton navigation={navigation}/> 
         return  <Button title="menu" style={{ paddingLeft: 10 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      },
      headerBackTitleVisible: true,
      headerVisible: true,
      gesturesEnabled: true,
    }
});

const AppContainer = createAppContainer(MyDrawerNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}




