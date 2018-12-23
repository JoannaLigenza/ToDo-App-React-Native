import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Animated, UIManager,} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {colorPrimary, colorSecondary, background} from "./styles/commonStyles";
import EditTask from './EditTask';
import MenuScreen from './MenuScreen';
import Header from './header';
import Footer from './Footer';
import AddTask from './AddTask';
import ListItem from './ListItem';


export default class TasksOrder extends Component {
  constructor(props) {
    super(props);
    this.state= { 
            tasks: [], 
    };
  }
  static navigationOptions = ({ navigation, screenProps }) => {
    return { 
      header: null,
    }
  };

    componentDidMount() {
        getTasks = (tasks) => {
            this.setState({tasks: tasks})
        }
    }

  

  render() {
    console.log("this.props", this.props)
    return (
      <View>
          <Text>dsfsdfsdfsdfdsf</Text>
      </View>
    );
  }
}

// const StackNavigator = createStackNavigator(
//   {    
//     Home: Main,
//     EditTask: EditTask,
//     MenuScreen: MenuScreen,
//     AddTask: AddTask,
//   },
//   {
//     initialRouteName: 'Home',
//     defaultNavigationOptions: {   // Header style
//       headerStyle: { backgroundColor: colorPrimary, height: 55, shadowRadius: 0, },
//       headerTintColor: '#fff',
//       headerTitleStyle: { fontWeight: 'bold' },
//     },
//     transitionConfig: () => ({
//       transitionSpec: {
//         duration: 500,
//       },
//       screenInterpolator: sceneProps => {
//       const { position, layout, scene } = sceneProps
//       const index = scene.index
//       const width = layout.initWidth

//       const slideFromRight = { 
//         opacity: position.interpolate({
//               inputRange: [ index, index + 1],
//               outputRange: [1, 1], 
//             }),
//         transform: [{ 
//           translateX: position.interpolate({
//               inputRange: [index - 1, index, index + 1],
//               outputRange: [width, 0, -20],
//             })
//       }] }
//         return slideFromRight
//       },
//     }),
//   }
// );

//const AppContainer = createAppContainer(StackNavigator);

// export default class MainArea extends React.Component {
//   render() {
//     return <AppContainer screenProps={{openDraw: this.props.openDraw, lists: this.props.lists}}/>;
//   }
// }

const styles = StyleSheet.create({
  component2: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: background,
  },
  addButton: {
    //borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width: 80,
    height: 80,
    backgroundColor:'#fec538',
    margin: 0,
    padding: 0,
    elevation: 6,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 50,
  },
});
