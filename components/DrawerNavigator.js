import React, {Component} from 'react';
import { createDrawerNavigator, createAppContainer} from "react-navigation";
import HomeScreen from './HomeScreen';
import PickColor from './PickColor';
import AddDeleteList from './AddDeleteList';

const MyDrawerNavigator = createDrawerNavigator({
  Home: { screen: HomeScreen },
  'App Color': {screen: PickColor },
  'Add/Delete List' : {screen: AddDeleteList },
  // Test: { screen: (props) => <TasksOrder {...props} screenProps={"prop"} tasks={'prop'}/> }
},
{
    initialRouteName: 'Home',
    //contentComponent: HomeScreen,
    drawerWidth: 300,
    drawerPosition: 'left',
    navigationOptions: {
      //headerStyle: { backgroundColor: colorPrimary },
      //title: 'My Chats'
      headerLeft: navigation => {
        return  <Button title="menu" style={{ paddingLeft: 10 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      },
      headerBackTitleVisible: true,
      headerVisible: true,
      gesturesEnabled: true,
    }
});

export const AppContainer = createAppContainer(MyDrawerNavigator);