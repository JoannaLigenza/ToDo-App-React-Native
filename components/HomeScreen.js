import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Header from './components/header';
import Main from './components/Main';
import Footer from './components/Footer';
import EditTask from './components/EditTask';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Main />
        <Button title="Press" onPress={() => {this.props.navigation.navigate('TaskEdit')}}></Button>
        <Footer />
      </View>
    );
  }
}

class TaskEdit extends Component {
  render() {
    return (
      <View style={styles.container}>
        <EditTask />
        <Button title="Home" onPress={() => {this.props.navigation.goback()}}></Button>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    TaskEdit: TaskEdit,
  },
  {
    initialRouteName: 'Home',
  }
);

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

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


