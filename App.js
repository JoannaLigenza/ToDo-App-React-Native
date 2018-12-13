import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { createDrawerNavigator, createStackNavigator, createAppContainer, DrawerActions } from "react-navigation";
import Header from './components/header';
import Main from './components/Main';
import Footer from './components/Footer';
import EditTask from './components/EditTask';
import Menu from './components/Menu';
import DrawerNavigator from './components/DrawerNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'yellow',
    flexDirection: 'column',
    //justifyContent: 'space-between',
  },
  menu: {
    flex: 1,
    width: 100,
    backgroundColor: 'yellow',
  },
  MenuButton: {
    marginLeft: 15,
  }
});

class MenuButton extends Component {
  render() {
    //console.log("this.props ", this.props)
    return (
 <View>
    <TouchableOpacity onPress={() => {this.props.navigation.navigate('MyDrawerNavigator') } }>
      <Text>Klik</Text>
    </TouchableOpacity>
    </View> )
  }
  
}

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
            {key: '8', text: 'I coś jeszcze', isChecked: false},
            {key: '9', text: 'I coś jeszcze', isChecked: false},
            ],
            modalVisible: true }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home', 
      headerLeft: (
         <MenuButton navigation={navigation}/> ),
                    
      //),
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./world.png')}
          //style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
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
        <Main tasks={this.state.tasks} handleInput={this.handleInput} editTask={() => {this.props.navigation.navigate('TaskEdit')} } />
        <Button title="Press" onPress={() => {this.props.navigation.dispatch(DrawerActions.openDrawer())}}></Button>
        <Footer />
      </View>
    );
  }
}

class MenuScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./world.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

class TaskEdit extends Component {
  static navigationOptions = ({ navigation }) => {
    return { 
      title: 'Edit Task',
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <EditTask goBack={() => {this.props.navigation.goBack()}}/>
        {/* <Button title="Home" onPress={() => {this.props.navigation.navigate('MenuScreen')}}></Button> */}
      </View>
    );
  }
}

class MenuScreen2 extends Component {
  static navigationOptions = {
    drawerLabel: 'MenuScreen2',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./world.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
    return (
      <View style={styles.menu}>
        <Text>To jest text </Text>
        <Menu goBack={() => {this.props.navigation.goBack()}}/>
      </View>
    );
  }
}

// const MyDrawerNavigator = createDrawerNavigator({
//   Home: { screen: HomeScreen },
//   Notifications: {screen: MenuScreen },
//   MenuScreen2: { screen: MenuScreen2 },
// },
// {
//     initialRouteName: 'MenuScreen2',
//     //contentComponent: 'MenuScreen2',
//     drawerWidth: 300,
//     drawerPosition: 'left',
// });


const StackNavigator = createStackNavigator(
  {    
    Home: HomeScreen,
    MyDrawerNavigator:{ screen: DrawerNavigator },
    TaskEdit: TaskEdit,
    MenuScreen: MenuScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {   // Header style
      headerStyle: { backgroundColor: 'red' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      headerMode: 'screen',
      //headerTitle: 'Home',
      // headerLeft: navigation => {
      //   return <Button
      //     onPress={() => navigation.navigate('MenuScreen')}
      //     title="X"
      //     color="white"
      //     backgroundColor='yellow'
      //     style={styles.MenuButton}
      //   />
      // },
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 1000,
      },
      screenInterpolator: sceneProps => {
      const { position, layout, scene, scenes } = sceneProps
      const index = scene.index
      const width = layout.initWidth

      const slideFromLeft = { transform: [{ 
        translateX: position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [-width, (width-(width+(width-200))), 0]
            })
      }] }

      const slideFromRight = { 
        opacity: position.interpolate({
              inputRange: [ index, index + 1],
              outputRange: [1, 1], 
            }),
        transform: [{ 
          translateX: position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [width, 0, 0],
            })
      }] }

        //console.log("index ", scene.route.routeName, index, scene.isFocused)
        if(scene.route.routeName !== 'MenuScreen') { 
          //console.log("right")
          return slideFromRight }
        if(scene.route.routeName === 'MenuScreen' ) {
          //console.log("left")
            return slideFromLeft
        }
      },
    }),
  }
);

const AppContainer = createAppContainer(StackNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}




