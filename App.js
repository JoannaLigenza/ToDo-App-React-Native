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
});

class HomeScreen extends Component {
  static navigationOptions = { title: 'Home'};
  render() {
    return (
      <View style={styles.container}>
        {/* <Header /> */}
        <Main />
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
  },
);

const AppContainer = createAppContainer(Navi);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}




