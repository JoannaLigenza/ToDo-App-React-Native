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
    this.state= { 
            tasks: [
            {key: '1', text: 'Zrobić pranie', isChecked: false, list: "Work", priority: "Low", date: "", note: 'note1', coordination: []},
            {key: '2', text: 'Kupić warzywa na obiad', isChecked: true, list: "Private", priority: "Middle", date: "", note: 'note2', coordination: []},
            {key: '3', text: 'Skończyć projekt "Moja Lista"', isChecked: false, list: "Default", priority: "High", date: "", note: 'note3', coordination: []},
            {key: '4', text: 'Poczytać książkę', isChecked: false, list: "Work", priority: "Low", date: "", note: 'note4', coordination: []},
            {key: '5', text: 'Wyspać się w końcu :)', isChecked: false, list: "Work", priority: "Middle", date: "", note: 'note5', coordination: []},
            ],
            taskKey: '11',
            scrollEnabled: true,
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
    //console.log("state 2", this.state.tasks)
  }

  setTasksCoordination = (x, y, width, height, key) => {
    const setCoordination = this.state.tasks.map(task => {
      if(key === task.key) {
        task.coordination = [x, y, width, height];
        return task
      }
      return task
    })
    this.setState({tasks: setCoordination })
  }

  handleChangeTaskOrder = (moveDirection, index) => {
    if((moveDirection === 'up' && index === 0) || moveDirection === 'down' && index === this.state.tasks.length ) {
      return
    }
    const NewTasks = this.state.tasks;
    const movedTask = NewTasks.splice(index, 1);
    if ( moveDirection === 'up') {
      NewTasks.splice(index-1, 0, movedTask[0]);
    }
    if ( moveDirection === 'down') {
      NewTasks.splice(index+1, 0, movedTask[0]);
    }
    this.setState({ tasks: NewTasks, refresh: !this.state.refresh })
  }

  canScroll = (scroll) => {
    this.setState({scrollEnabled: scroll })
  }

  render() {
    //console.log("tasks ", this.state.tasks)
    return (
      <View style={styles.component2} >       
        <Header openDraw={this.props.screenProps.openDraw}/>     
        <FlatList 
            contentContainerStyle={{paddingBottom: 110}}
            data={this.state.tasks}
            extraData={this.state.refresh}
            scrollEnabled={this.state.scrollEnabled}
            //numColumns={4} // grid
            ItemSeparatorComponent={ () => <View style={ { width: '80%', height: 2, backgroundColor: 'grey', alignSelf: 'center' } } /> }
            renderItem={({item, index}) => <ListItem item={item} index={index} handleInput={this.handleInput} 
                handleDeleteTask={this.handleDeleteTask} allTasks={this.state.tasks} setTasksCoordination={this.setTasksCoordination}
                handleChangeTaskOrder={this.handleChangeTaskOrder} canScroll={this.canScroll}
                editTask={() => {this.props.navigation.navigate('EditTask', {task: item, handleEditTask: this.handleEditTask })}  } 
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
