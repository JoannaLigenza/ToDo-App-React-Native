import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { createDrawerNavigator, createStackNavigator, createAppContainer, DrawerActions, createSwitchNavigator } from "react-navigation";
import Header from './components/header';
import MainArea from './components/Main';
import Footer from './components/Footer';
import EditTask from './components/EditTask';
import Menu from './components/Menu';
import MenuScreen from './components/MenuScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
    flexDirection: 'column',
    //justifyContent: 'space-between',
  },
  menu: {
    flex: 1,
    width: 100,
    backgroundColor: 'yellow',
  },
});

class MenuButton extends Component {
  render() {
    return (
    <View>
      <TouchableOpacity onPress={() => {this.props.navigation.dispatch(DrawerActions.openDrawer())}}>
        <Text>Klik</Text>
      </TouchableOpacity>
    </View> 
    )
  }
  
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state= { 
            lists: ['Default', 'Private', 'Work'] }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home', 
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./world.png')}
          //style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Header /> */}
        <MainArea openDraw={()=> { this.props.navigation.dispatch(DrawerActions.openDrawer())}}/>
        {/* <Button title="Press" onPress={() => {this.props.navigation.dispatch(DrawerActions.openDrawer())}}></Button> */}       
        <Footer />
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

class Zobacz extends Component {
  static navigationOptions = {
    title: 'Zobacz',
    headerTitle: 'Zobacz',
    drawerLabel: 'Zobacz',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./world.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Zobacz</Text>
        
        {/* <Button title="Home" onPress={() => {this.props.navigation.navigate('MenuScreen')}}></Button> */}
      </View>
    );
  }
}

const MyDrawerNavigator = createDrawerNavigator({
  Home: { screen: HomeScreen },
  Notifications: {screen: MenuScreen },
  MenuScreen2: { screen: MenuScreen2 },
  Zobacz: { screen: Zobacz}
},
{
    initialRouteName: 'Home',
    //contentComponent: 'MenuScreen2',
    drawerWidth: 300,
    drawerPosition: 'left',
    navigationOptions: {
      headerStyle: { backgroundColor: 'yellow' },
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




