import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Animated, UIManager, Dimensions, AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {ThemeColor, kolorowy, colorPrimary, colorSecondary, background, greyColor} from "./styles/commonStyles";
import EditTask from './EditTask';
import Header from './header';
import Footer from './Footer';
import AddTask from './AddTask';
import ListItem from './ListItem';
import FilterTasks from './FilterTask';


class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state= { 
            tasks: [],
            taskKey: '',
            firstTaskPositionY: 115.04762268066406,
            getCoordinations: true,
            gesturestate: '',
            taskFilter: {lists: '', date: '', priority: ''},
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return { 
      header: null,
    }
  };

  componentDidMount() {
        this.getDataFromAsyncStore();
  }

  getDataFromAsyncStore = async () => {
        try {
            const initTask = {key: '1', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''}
            let tasks = await AsyncStorage.getItem('tasks');
            let taskKey = await AsyncStorage.getItem('taskKey');
            if (tasks === null) {
                tasks = [initTask]
                await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            }
            if (taskKey === null) {
                taskKey = '2'
                await AsyncStorage.setItem('taskKey', taskKey );
            }
            console.log('key ' , taskKey );
            tasks = JSON.parse(tasks);
            this.setState({ tasks: tasks, taskKey: taskKey })
        } catch (error) {
            console.log('storage get data error in main', error.message)
        }
  }

  setDataToAsyncStore = async () => {
      try {
            let saveTasks = this.state.tasks;
            await AsyncStorage.setItem('tasks', JSON.stringify(saveTasks));
            // await AsyncStorage.multiSet([['key 2', key], ['text 2', this.state.inputText]]);
            // await AsyncStorage.multiRemove([ '12', '13' ]);
            // console.log('reading data 1 ', await AsyncStorage.getItem('tasks'));
            // console.log('reading data 2 ', await AsyncStorage.getAllKeys(), );            
        } catch (error) {
            console.log('storage set data error in main', error.message)
      }
  }

  handleInput = async (key) => {
    const newState = this.state.tasks.map( task => {
      if(task.key === key) {
        task.isChecked = !task.isChecked
        return task
      }
      return task
    })
    await this.setState({ tasks: newState });
    this.setDataToAsyncStore();
  }

  handleAddTask = async (task) => {
    const newTasks = [...this.state.tasks, task];
    await this.setState({ tasks: newTasks });
    this.setDataToAsyncStore();
    console.log('this.state 1 ', this.state.tasks)
  }

  handleChangetaskKey = async (key) => {
    await this.setState({taskKey: key})
    try {
        let savetaskKey = this.state.taskKey;
        AsyncStorage.setItem('taskKey', savetaskKey);  
    } catch (error) {
        console.log('storage handleChangetaskKey error in main component', error.message)
    }
  }

  handleDeleteTask = async (tasks) => {
    //console.log('task', tasks)
    await this.setState({tasks: tasks})
    this.setDataToAsyncStore();
  }

  handleEditTask = async (choosenTask) => {
    console.log('choosenTask ', choosenTask, choosenTask.key)
    const newTasks = this.state.tasks.map( task => {
      if (task.key === choosenTask.key) {
        return choosenTask
      }
      return task
    })    
    await this.setState({ tasks: newTasks });
   // console.log('a teraz' , this.state.tasks)
    this.setDataToAsyncStore();
  }

  setTasksCoordination = (key, height, pageY, index) => {
      //if (index === 0) { this.setState({firstTaskPositionY: pageY}) }
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
    console.log("onDropTask 1 ", onDropTask)
    this.state.tasks.map( (task, index) => {
      if ( index === 0 ) { return }
      console.log('task height ', index, task.height)
      return onDropTask.push([index, onDropTask[index-1][2] + 2, onDropTask[index-1][2] + 2 + task.height])
    })
    console.log("onDropTask full ", onDropTask)

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
    this.setDataToAsyncStore();
  }

  getTaskFilter = (list, date, priority) => {
    //console.log("co tu przyszlo ", list, date, priority)
    if (list !== '') {
      this.setState({taskFilter: {lists: list[0], date: '', priority: ''}})
    }
    if (date !== '') {
      this.setState({taskFilter: {lists: '', date: date, priority: ''}})
    }
    if (priority !== '') {
      this.setState({taskFilter: {lists: '', date: '', priority: priority}})
    }
    if (list === '' && date === '' && priority === '') {
      this.setState({taskFilter: {lists: '', date: '', priority: ''}})
    }
  }

  filteredTasks = () => {
    const filteringTasks = this.state.tasks.filter( task => {
      if (this.state.taskFilter.lists !== '') {
        return task.list === this.state.taskFilter.lists
      }
      if (this.state.taskFilter.date !== '') {
        return task.date === this.state.taskFilter.date
      }
      if (this.state.taskFilter.priority !== '') {
        return task.priority === this.state.taskFilter.priority
      }
      else {
        return task
      }
    })
    return filteringTasks
  }

  render() {
    //console.log('odswiezam ', this.state.tasks)
    if (this.props.screenProps.deletedList !== '') {
        this.state.tasks.map( task => {
          if (this.props.screenProps.deletedList === task.list ) {
            task.list = 'Default'
            return task
          }
          return task
        })
    }
    const primaryColor = this.props.screenProps.primaryColor
    return (
      <View style={styles.component2} >       
        <Header openDraw={this.props.screenProps.openDraw} getTaskFilter={this.getTaskFilter} primaryColor={primaryColor}/>
        <FilterTasks lists={this.props.screenProps.lists} getTaskFilter={this.getTaskFilter} primaryColor={primaryColor}/>
        <FlatList 
            contentContainerStyle={{paddingBottom: 110}}
            data={this.filteredTasks()}
            //extraData={this.state}
            scrollEnabled={this.state.gesturestate ? (false) : (true)}
            refreshing={this.state.refreshing}
            //numColumns={4} // grid
            ItemSeparatorComponent={ () => <View style={ { width: '80%', height: 2, backgroundColor: greyColor, alignSelf: 'center' } } /> }
            renderItem={({item, index}) => <ListItem item={item} index={index} handleInput={this.handleInput} state={this.state}
                handleDeleteTask={this.handleDeleteTask} setTasksCoordination={this.setTasksCoordination}
                handleChangeTaskOrder={this.handleChangeTaskOrder} getCoordinations={this.getCoordinations}
                getgestureState={this.getgestureState} primaryColor={primaryColor}
                editTask={() => {this.props.navigation.navigate('EditTask', {task: item, handleEditTask: this.handleEditTask, index: index, primaryColor: primaryColor })}  } 
                /> }
        />
        <View>
          <TouchableOpacity activeOpacity={1} style={[styles.addButton, {backgroundColor: primaryColor }]}
          onPress={() => {this.props.navigation.navigate('AddTask', {lists: this.props.screenProps.lists, 
              addTask: this.handleAddTask, taskKey: this.state.taskKey, handleChangetaskKey: this.handleChangetaskKey,
              primaryColor: primaryColor}) } }>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <Footer primaryColor={primaryColor}/>
      </View>
    );
  }
}

const StackNavigator = createStackNavigator(
  {    
    Home: Main,
    EditTask: EditTask,
    AddTask: AddTask,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {   // Header style
      //headerStyle: { backgroundColor: ThemeColor.background[kolorowy], height: 55, shadowRadius: 0, },
      headerStyle: { height: 55, shadowRadius: 0, },
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
    //console.log('show me props ', this.props)
    return <AppContainer screenProps={{openDraw: this.props.openDraw, lists: this.props.lists, primaryColor: this.props.primaryColor, 
            deletedList: this.props.deletedList }} />;
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
