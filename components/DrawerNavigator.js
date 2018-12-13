import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { createDrawerNavigator, createStackNavigator, createAppContainer, DrawerActions } from "react-navigation";

const styles = StyleSheet.create({
    icon: { margin: 5},
});

class MenuHeader extends Component {
    static navigationOptions = {
    drawerLabel: 'Menu',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../world.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
      return (
          <View>
            <TouchableOpacity onPress={() => {this.props.navigation.openDrawer() } }>
              <Text>Klik</Text>
            </TouchableOpacity>
          </View>
      )
  }

}

class Tesstt extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Test',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../world.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
    return (
      <Button
        onPress={() => alert("Klik")}
        title="Go back home"
      />
    );
  }
}

const MyDrawerNavigator = createDrawerNavigator({
  Home: { screen: MenuHeader },
  Tesstt: {screen: Tesstt },
  MenuScreen2: { screen: MenuHeader },
},
{
    initialRouteName: 'Home',
    //contentComponent: 'MenuScreen2',
    drawerWidth: 300,
    drawerPosition: 'left',
});

const AppContainer = createAppContainer(MyDrawerNavigator);

export default class DrawerNavigator extends React.Component {
  render() {
    return <AppContainer />;
  }
}