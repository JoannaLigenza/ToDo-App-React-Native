import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Header from './components/header';
import Main from './components/Main';
import Footer from './components/Footer';
import EditTask from './components/EditTask';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'yellow',
    flexDirection: 'column',
    //justifyContent: 'space-between',
  },
  MenuButton: {
    marginLeft: 15,
  }
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state= { 
            tasks: [
            {key: '1', text: 'Zrobić pranie', isChecked: false},
            {key: '2', text: 'Kupić zakupy', isChecked: true},
            {key: '3', text: 'Pokodować jutro', isChecked: false},
            {key: '4', text: 'Tralalala', isChecked: false},
            {key: '5', text: 'John', isChecked: false},
            {key: '6', text: 'Jillian', isChecked: false},
            {key: '7', text: 'I coś jeszcze', isChecked: false},
            
            ] }
  }
  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Home', 
    headerLeft: (
        <Button
          onPress={() => navigation.navigate('TaskEdit')}
          title="X"
          color="white"
          style={styles.MenuButton}
        />),
    }
  };
  handleInput = (key) => {
    const newState = this.state.tasks.map( task => {
      if(task.key === key) {
        task.isChecked = !task.isChecked
        return task
      }
      return task
    })
    this.setState({ tasks: newState })
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <Header /> */}
        <Main tasks={this.state.tasks} handleInput={this.handleInput} editTask={() => {this.props.navigation.navigate('TaskEdit')}} />
        <Button title="Press" onPress={() => {this.props.navigation.navigate('TaskEdit')}}></Button>
        <Footer />
      </View>
    );
  }
}

class TaskEdit extends Component {
  static navigationOptions = {
    title: 'Edit Task',
  };
  render() {
    return (
      <View style={styles.container}>
        <EditTask />
        <Button title="Home" onPress={() => {this.props.navigation.goBack()}}></Button>
        <Button title="Home" onPress={() => {this.props.navigation.navigate('Tesst')}}></Button>
      </View>
    );
  }
}

class Tessting extends Component {
  render() {
    return (
      <View style={styles.container}>
        <EditTask />
        <Text>
          Let's see what we have here...
        </Text>
      </View>
    );
  }
}

const Navi = createStackNavigator(
  {
    Home: HomeScreen,
    TaskEdit: TaskEdit,
    Tesst: Tessting,
  },
  {
    initialRouteName: 'Home',     // Main Site
    defaultNavigationOptions: {   // Header style
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    mode: 'card',
    //headerMode: 'none',
    
    // navigationOptions: params => ({
    //   gesturesEnabled: true,
    //   gesturesDirection: 'inverted',
    // }),
    
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const width = layout.initWidth;
        console.log("index ", index)

        return {
          opacity: position.interpolate({
            inputRange: [ index, index + 1],
            outputRange: [1, 1],                    // [1, 0] opacity is from 1 to 0
          }),
          transform: [{
            translateX: position.interpolate({
              inputRange: [index - 1, index],       // index means, that transform is working for every screen (screnn index: 0, 1, 2 ... 50)
              outputRange: [width, 0],              // [-width, 0] - slide is moving from left, [width, 0] - slide is moving from right
              // inputRange: [index - 1, index, index + 1],
              // outputRange: [-width, 0, width]    // or [width, 0, 0]
            }),
          }]
        };
      },
    }),
  },
);

const AppContainer = createAppContainer(Navi);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}




