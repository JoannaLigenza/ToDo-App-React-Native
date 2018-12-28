import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Animated, UIManager, Dimensions} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {colorPrimary, colorSecondary, background} from "./styles/commonStyles";
import EditTask from './EditTask';
import MenuScreen from './MenuScreen';
import Header from './header';
import Footer from './Footer';
import AddTask from './AddTask';
import ListItem from './ListItem';


class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state= { 
            tasks: [
            {key: '1', text: '1 Zrobić pranie', isChecked: false, list: "Work", priority: "Low", date: "", note: 'note1', height: '',},
            {key: '2', text: '2 Kupić warzywa na obiad', isChecked: true, list: "Private", priority: "Middle", date: "", note: 'note2', height: '', },
            {key: '3', text: '3 Skończyć projekt "Moja Lista"', isChecked: false, list: "Default", priority: "High", date: "", note: 'note3', height: '', },
            {key: '4', text: '4 Poczytać książkę', isChecked: false, list: "Work", priority: "Low", date: "", note: 'note4', height: '', },
            {key: '5', text: '5 Wyspać się wkońcu :)', isChecked: false, list: "Work", priority: "Middle", date: "", note: 'note5', height: '', },
            {key: '6', text: '6 Zrobić pranie', isChecked: false, list: "Work", priority: "Low", date: "", note: 'note1', height: '',},
            {key: '7', text: '7 Kupić warzywa na obiad', isChecked: true, list: "Private", priority: "Middle", date: "", note: 'note2', height: '', },
            {key: '8', text: '8 Skończyć projekt "Moja Lista"', isChecked: false, list: "Default", priority: "High", date: "", note: 'note3', height: '', },
            {key: '9', text: '9 Poczytać książkę', isChecked: false, list: "Work", priority: "Low", date: "", note: 'note4', height: '', },
            {key: '10', text: '10 Wyspać się wkońcu :)', isChecked: false, list: "Work", priority: "Middle", date: "", note: 'note5', height: '', },
            ],
            taskKey: '11',
            firstTaskPositionY: '',
            getCoordinations: true,
            gesturestate: '',
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
    const newTasks = this.state.tasks.map( task => {
      if (task.key === choosenTask.key) {
        return choosenTask
      }
      return task
    })    
    this.setState({ tasks: newTasks })
  }

  setTasksCoordination = (key, height, pageY, index) => {
      if (index === 0) { this.setState({firstTaskPositionY: pageY}) }
      const newTasks = this.state.tasks.map( (task) => {
        if(task.key === key) {
          task.height = height;
          return task
        }
        return task
      })
      this.setState({ tasks: newTasks })
    }

  getCoordinations = (bool) => {
    this.setState({ getCoordinations: bool})
  }

  getgestureState = (gestureStateX0) => {
    //console.log("gesturestate x0 ",gestureStateX0,  Dimensions.get('window').width - 50)
    if ( gestureStateX0 > Dimensions.get('window').width - 50) {
      this.setState({gesturestate: true})
      console.log("gesturestate x0 ",gestureStateX0,  Dimensions.get('window').width - 50, this.state.gesturestate)
    } else { this.setState({gesturestate: false}) }
  }

  handleChangeTaskOrder = (moveDirection, taskIndex, locationY, moveY) => {
    console.log('moveY ', locationY, moveY)
    const onDropTask = [[0, this.state.firstTaskPositionY, this.state.firstTaskPositionY + this.state.tasks[0].height],]
    this.state.tasks.map( (task, index) => {
      if (index === this.state.tasks.length-1 ) { return }
        return onDropTask.push([index+1, onDropTask[index][2] + 2, onDropTask[index][2] + 2 + task.height])
    })
    console.log("onDropTask 1 ", onDropTask)

    const whereToDrop = onDropTask[taskIndex][1] + locationY + moveY
    const findIndex = onDropTask.findIndex( (task) => {
        if (whereToDrop >= task[1] && whereToDrop < task[2]) {
          return task
        }
    })
    console.log("tutaj ", whereToDrop)
    console.log("findIndex ", findIndex)
    if (findIndex === -1) {
      console.log("return")
      return
    }

    const NewTasks = this.state.tasks;
    const movedTask = NewTasks.splice(taskIndex, 1);
    if ( moveDirection === 'up') {
      NewTasks.splice(findIndex, 0, movedTask[0]);
    }
    if ( moveDirection === 'down') {
      NewTasks.splice(findIndex, 0, movedTask[0]);
    }
    this.setState({ tasks: NewTasks })
  }

  render() {
  // console.log("odswiezam " , this.state.gesturestate)
    
    return (
      <View style={styles.component2} >       
        <Header openDraw={this.props.screenProps.openDraw}/>     
        <FlatList 
            contentContainerStyle={{paddingBottom: 110}}
            data={this.state.tasks}
            //extraData={this.state}
            scrollEnabled={this.state.gesturestate ? (false) : (true)}
            refreshing={this.state.refreshing}
            //numColumns={4} // grid
            ItemSeparatorComponent={ () => <View style={ { width: '80%', height: 2, backgroundColor: 'grey', alignSelf: 'center' } } /> }
            renderItem={({item, index}) => <ListItem item={item} index={index} handleInput={this.handleInput} state={this.state}
                handleDeleteTask={this.handleDeleteTask} allTasks={this.state.tasks} setTasksCoordination={this.setTasksCoordination}
                handleChangeTaskOrder={this.handleChangeTaskOrder} getCoordinations={this.getCoordinations}
                getgestureState={this.getgestureState}
                editTask={() => {this.props.navigation.navigate('EditTask', {task: item, handleEditTask: this.handleEditTask, index: index })}  } 
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
