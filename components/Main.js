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


class Main extends Component {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);  // animated Views settings
    this.state= { 
            tasks: [
            {key: '1', text: 'Zrobić praniee', isChecked: false, list: "Work", priority: "Low", date: "", note: 'note1', pan: new Animated.ValueXY(),},
            {key: '2', text: 'Kupić zakupy', isChecked: true, list: "Private", priority: "Middle", date: "", note: 'note2', pan: new Animated.ValueXY(),},
            {key: '3', text: 'Pokodować jutro', isChecked: false, list: "Default", priority: "High", date: "", note: 'note3', pan: new Animated.ValueXY(),},
            {key: '4', text: 'Tralalala', isChecked: false, list: "Work", priority: "Low", date: "", note: 'note1', pan: new Animated.ValueXY(),},
            {key: '5', text: 'John', isChecked: false, list: "Work", priority: "Middle", date: "", note: 'note1', pan: new Animated.ValueXY(),},
            ],
            taskKey: '11',
    };
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
  handleAddTask = (task) => {
    const newTasks = [...this.state.tasks, task]
    this.setState({ tasks: newTasks })
  }
  handleChangetaskKey = (key) => {
    this.setState({taskKey: key})
  }
  handleDeleteTask = (tasks) => {
    //console.log('task', tasks)
    this.setState({tasks: tasks})
  }
  handleEditTask = (choosenTask) => {
   // console.log("przekazano", choosenTask)
    //console.log("state 1", this.state.tasks)
    const newTasks = this.state.tasks.map( task => {
      if (task.key === choosenTask.key) {
        return choosenTask
      }
      return task
    })
    this.setState({ tasks: newTasks })
    console.log("state 2", this.state.tasks)
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
            ItemSeparatorComponent={ () => <View style={ { width: '80%', height: 2, backgroundColor: 'grey', alignSelf: 'center' } } /> }
            renderItem={({item}) => <ListItem handleInput={this.handleInput} isChecked={item.isChecked}
                text={item.text} taskKey={item.key} handleDeleteTask={this.handleDeleteTask} allTasks={this.state.tasks}
                editTask={() => {this.props.navigation.navigate('EditTask', {task: item, handleEditTask: this.handleEditTask, back: "Lets see - Item data to editing here"})}  } 
                /> }
        />
        
        <View>
          <TouchableOpacity activeOpacity={1} style={styles.addButton}
          onPress={() => {this.props.navigation.navigate('AddTask', {lists: this.props.screenProps.lists, 
              addTask: this.handleAddTask, taskKey: this.state.taskKey, handleChangetaskKey: this.handleChangetaskKey}) } }>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </View>
    );
  }
}

const StackNavigator = createStackNavigator(
  {    
    Home: Main,
    EditTask: EditTask,
    MenuScreen: MenuScreen,
    AddTask: AddTask,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {   // Header style
      headerStyle: { backgroundColor: colorPrimary, height: 55, shadowRadius: 0, },
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
    return <AppContainer screenProps={{openDraw: this.props.openDraw, lists: this.props.lists}}/>;
  }
}

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
