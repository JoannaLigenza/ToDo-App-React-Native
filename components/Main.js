import React, {Component} from 'react';
import {StyleSheet, Text, View, CheckBox, Button, TouchableHighlight, FlatList} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import EditTask from './EditTask';
import MenuScreen from './MenuScreen';
import Header from './header';
import AddTask from './AddTask';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state= { 
            tasks: [
            {key: '1', text: 'Zrobić praniee', isChecked: false},
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
  static navigationOptions = ({ navigation, screenProps }) => {
    return { 
      header: null,
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
  handleAddTask = () => {

  }

  handleChangeTaskOrder = () => {
    const newState = this.state.tasks.filter( task => {

    })
    this.setState({ tasks: newState })
  }
  onPressLearnMore = () => {
    console.log("pressss")
  }
  render() {
    return (
      <View style={styles.component2} >       
        <Header openDraw={this.props.screenProps.openDraw}/>      
        <FlatList
          contentContainerStyle={{paddingBottom: 110}}
          data={this.state.tasks}
          renderItem={({item}) => 
          <View style={styles.oneTask}>
            <CheckBox
              //checked={item.isChecked}
              checked={item.isChecked}
              value={item.isChecked}
              onValueChange={ () => {this.handleInput(item.key)} }
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
        <View>
          <TouchableHighlight style={styles.addButton}
          onPress={() => {this.props.navigation.navigate('AddTask', {back: "Lets see - Item data to editing here"})} }>
            <Text>+</Text>
          </TouchableHighlight>
          {/* <Button title="Press" onPress={() => {} }></Button> */}
        </View>
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
    AddTask: AddTask,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {   // Header style
      headerStyle: { backgroundColor: 'red', height: 55, shadowRadius: 0, },
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

const AppContainer = createAppContainer(StackNavigator);

export default class MainArea extends React.Component {
  render() {
    return <AppContainer screenProps={{openDraw: this.props.openDraw}}/>;
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
  addButton: {
    //borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fec538',
    margin: 0,
    padding: 0,
    elevation: 6,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 50,
    //zIndex: 5, 
  },
});
