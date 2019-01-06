import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { createDrawerNavigator, createStackNavigator, createAppContainer, DrawerActions, createSwitchNavigator } from "react-navigation";
import {colorPrimary, colorSecondary} from "./components/styles/commonStyles";
import MainArea from './components/Main';
import HomeScreen from './components/HomeScreen';
import PickColor from './components/PickColor';
import AddDeleteList from './components/AddDeleteList';



const MyDrawerNavigator = createDrawerNavigator({
  Home: { screen: HomeScreen },
  'App Color': {screen: PickColor },
  'Add/Delete List' : {screen: AddDeleteList },
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
  constructor(props) {
    super(props);
    this.state= { 
            lists: ['Default', 'Private', 'Work'],    // read from data base
            primaryColor: colorPrimary,
            deletedList: '',
            }
  }

  setLists = (lists) => {
    this.setState({ lists: lists})
  }

  setPrimaryColor = (color) => {
    this.setState({ primaryColor: color})
  }

  setDeletedList = (list) => {
    console.log('deleted list', list)
    this.setState({ deletedList: list});
  }

  render() {
    return <AppContainer screenProps={{ lists: this.state.lists, setLists: this.setLists, 
        primaryColor: this.state.primaryColor, setPrimaryColor: this.setPrimaryColor,
        deletedList: this.state.deletedList, setDeletedList: this.setDeletedList }} />;
  }
}




