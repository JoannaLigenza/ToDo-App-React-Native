import React, {Component, PureComponent} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import EditTask from './EditTask';
import AddTask from './AddTask';
import Main from './Main';

const MyStackNavigator = createStackNavigator(
  {    
    Home: Main,
    EditTask: EditTask,
    AddTask: AddTask,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {   // Header style
      headerStyle: { height: 55, shadowRadius: 0, },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 500,
      },
      screenInterpolator: sceneProps => {
      const { position, layout, scene } = sceneProps
      const index = scene.index
      const width = layout.initWidth

      const slideFromRight = { 
        opacity: position.interpolate({
              inputRange: [ index, index + 1],
              outputRange: [1, 1], 
            }),
        transform: [{ 
          translateX: position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [width, 0, -20],
            })
      }] }
        return slideFromRight
      },
    }),
  }
);

const AppContainer = createAppContainer(MyStackNavigator);

export default class StackNavigator extends React.Component {
  render() {
    //console.log('show me props ', this.props)
    return <AppContainer screenProps={{openDraw: this.props.openDraw, lists: this.props.lists, primaryColor: this.props.primaryColor, 
            deletedList: this.props.deletedList }} />;
  }
}