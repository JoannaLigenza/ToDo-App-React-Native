import React, {Component} from 'react';
import {StyleSheet, Text, View, CheckBox, Button, TouchableHighlight, FlatList} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import EditTask from './EditTask';
import MenuScreen from './MenuScreen';


class Main extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return { 
      title: 'Home! Delete Header',
    }
  };
  onPressLearnMore = () => {
    console.log("pressss")
  }
  render() {
    //console.log("this.props ", this.props)
    return (
      <View style={styles.component2}>             
        <FlatList
          data={this.props.screenProps.tasks}
          renderItem={({item}) => 
          <View style={styles.oneTask}>
            <CheckBox
              //checked={item.isChecked}
              checked={item.isChecked}
              value={item.isChecked}
              onValueChange={ () => {this.props.handleInput(item.key)} }
              style={styles.checkBox}
            />
            <TouchableHighlight style={styles.TouchableHighlight} 
            onPress={() => {this.props.navigation.navigate('EditTask', {back: "Lets see - Item data to editing here"})} }>
                  <Text style={styles.welcome} >
                    {item.text}
                  </Text>
            </TouchableHighlight>
            <Button title="X" onPress={this.onPressLearnMore} style={styles.button}/>
          </View>}
        />  
      </View>
    );
  }
}

const StackNavigator = createStackNavigator(
  {    
    Home: Main,
    //MyDrawerNavigator:{ screen: MyDrawerNavigator },
    //TaskEdit: <EditTask goBack={() => {this.props.navigation.goBack()}}/>,
    EditTask: EditTask,
    MenuScreen: MenuScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {   // Header style
      headerStyle: { backgroundColor: 'red' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      //headerMode: 'screen',
      //headerTitle: 'Home',
      headerLeft: navigation => {
        return <Button
          onPress={() => navigation.navigate('MenuScreen')}
          title="X"
          color="white"
          backgroundColor='yellow'
          style={styles.MenuButton}
        />
      },
    },
    // transitionConfig: () => ({
    //   transitionSpec: {
    //     duration: 1000,
    //   },
    //   screenInterpolator: sceneProps => {
    //   const { position, layout, scene, scenes } = sceneProps
    //   const index = scene.index
    //   const width = layout.initWidth

    //   const slideFromLeft = { transform: [{ 
    //     translateX: position.interpolate({
    //             inputRange: [index - 1, index, index + 1],
    //             outputRange: [-width, (width-(width+(width-200))), 0]
    //         })
    //   }] }

    //   const slideFromRight = { 
    //     opacity: position.interpolate({
    //           inputRange: [ index, index + 1],
    //           outputRange: [1, 1], 
    //         }),
    //     transform: [{ 
    //       translateX: position.interpolate({
    //           inputRange: [index - 1, index, index + 1],
    //           outputRange: [width, 0, 0],
    //         })
    //   }] }

    //     //console.log("index ", scene.route.routeName, index, scene.isFocused)
    //     // if(scene.route.routeName !== 'MenuScreen') { 
    //     //   //console.log("right")
    //     //   return slideFromRight }
    //     // if(scene.route.routeName === 'MenuScreen' ) {
    //     //   //console.log("left")
    //     //     return slideFromLeft
    //     // }
    //   },
    // }),
  }
);

const AppContainer = createAppContainer(StackNavigator);

export default class MainArea extends React.Component {
  render() {
    return <AppContainer screenProps={{tasks: this.props.tasks, handleInput: this.props.handleInput}}/>;
  }
}

const styles = StyleSheet.create({
  component2: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
    //alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderColor: 'blue',
  },
  welcome: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    textAlign: 'left',
    backgroundColor: 'blue',
    borderRadius: 4,
  }, 
  TouchableHighlight: {
    flex: 1,
    margin: 10,
    //backgroundColor: 'purple',
  }, 
  oneTask: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
    alignItems: "center",
    backgroundColor: 'white',
  },
  checked: {
    textDecorationLine: 'line-through',
    color: 'red',
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  unchecked: {
    textDecorationLine: "none",
  },
});
