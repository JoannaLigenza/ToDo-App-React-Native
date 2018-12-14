import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';

export default class MenuScreen extends React.Component {
  render() {
      return(
          <View>
            <Text>
                MenuScreen
            </Text>
            <Button
                onPress={() => console.log("button pressed")}
                title="Go back home"
            />
          </View>
      )
  }
}


// export defult class MenuScreen extends React.Component {
//   static navigationOptions = {
//     title: "Menu Screen",
//     drawerLabel: 'Notifications',
//     drawerIcon: ({ tintColor }) => (
//       <Image
//         source={require('./world.png')}
//         style={[styles.icon, {tintColor: tintColor}]}
//       />
//     ),
//   };

//   render() {
//     return (
//       <Button
//         onPress={() => this.props.navigation.goBack()}
//         title="Go back home"
//       />
//     );
//   }
// }