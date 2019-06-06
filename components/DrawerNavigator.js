import React, {Component} from 'react';
import { Dimensions} from 'react-native';
import { createDrawerNavigator, createAppContainer} from "react-navigation";
import HomeScreen from './HomeScreen';
import PickColor from './PickColor';
import AddDeleteList from './AddDeleteList';
import DeleteTasks from './DeleteTasks';
import ContentComponent from './DrawerContentComponent';

const MyDrawerNavigator = createDrawerNavigator({
  Home: { screen: HomeScreen },
  'App Color': {screen: PickColor },
  'Add/Delete List' : {screen: AddDeleteList },
  'Delete Tasks': {screen: DeleteTasks },
  // Test: { screen: (props) => <TasksOrder {...props} screenProps={"prop"} tasks={'prop'}/> }
},
{
    initialRouteName: 'Home',
    contentComponent: ContentComponent,
    drawerBackgroundColor: 'transparent',
    //drawerWidth: 300,
    drawerWidth: Dimensions.get('window').width,
    drawerPosition: 'left',
    // contentOptions: {
    //   labelStyle: { color: 'black' },
    //   //itemsContainerStyle: {flex: 1, width: 300, backgroundColor: 'white', borderColor: 'red', borderWidth: 2}
    // },
    // defaultNavigationOptions: {
    //   headerStyle: { backgroundColor: colorPrimary },
    //   title: 'My Chats',
    //   headerLeft: navigation => {
    //     return  <Button title="menu" style={{ paddingLeft: 10 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
    //   },
    //   headerBackTitleVisible: true,
    //   headerVisible: true,
    //   gesturesEnabled: true,
    // }
});

export const AppContainer = createAppContainer(MyDrawerNavigator);