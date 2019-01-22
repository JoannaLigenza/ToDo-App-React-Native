<script src="http://localhost:8097"></script>
import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, UIManager, findNodeHandle, Dimensions, AsyncStorage, Animated, ScrollView, Modal, TextInput} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {colorPrimary, colorSecondary, background, greyColor} from "./styles/commonStyles";
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
            taskFilter: {lists: '', date: '', priority: ''},
            canScroll: true,
            isActive: -1,
            changeTaskOrderModalVisibility: false,
            from: '',
            to: '',
    };
  }

  static navigationOptions = ({ }) => {
    return { 
      header: null,
    }
  };

  componentDidMount() {
        this.getDataFromAsyncStore()
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
            console.log('storage get data error in main component', error.message)
        }
  }

  setDataToAsyncStore = async () => {
      try {
            let saveTasks = this.state.tasks;
            await AsyncStorage.setItem('tasks', JSON.stringify(saveTasks));        
        } catch (error) {
            console.log('storage set data error in main component', error.message)
      }
  }

  // handleInput = async (key) => {
  //   const newState = this.state.tasks.map( task => {
  //     if(task.key === key) {
  //       task.isChecked = !task.isChecked
  //       return task
  //     }
  //     return task
  //   })
  //   await this.setState({ tasks: newState });
  //   this.setDataToAsyncStore();
  // }

  handleAddTask = async (task) => {
    const newTasks = [...this.state.tasks, task];
    await this.setState({ tasks: newTasks });
    this.setDataToAsyncStore();
    //console.log('this.state 1 ', this.state.tasks)
  }

  changetaskKey = async (key) => {
    await this.setState({taskKey: key})
    try {
        let savetaskKey = this.state.taskKey;
        AsyncStorage.setItem('taskKey', savetaskKey);  
    } catch (error) {
        console.log('storage changetaskKey error in main component', error.message)
    }
  }

  handleDeleteTask = async (tasks) => {
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
    this.setDataToAsyncStore();
  }

  setTasksCoordinations = async (key, height) => {
      const newTasks = this.state.tasks.map( (task) => {
        if(task.key === key) {
          task.height = height;
          return task
        }
        return task
      })
      await this.setState({ tasks: newTasks })
      this.setDataToAsyncStore();
    }

  getCoordinations = (bool) => {
    this.setState({ getCoordinations: bool})
  }

  handleChangeTaskOrder = (taskIndex, locationY, moveY) => {
    console.log('moveY ', locationY, moveY)
    const allTasksHeightArray = [[0, this.state.firstTaskPositionY, this.state.firstTaskPositionY + this.state.tasks[0].height],]
    this.state.tasks.map( (task, index) => {
      if ( index === 0 ) { return }
      //console.log('task height ', index, task.height)
      return allTasksHeightArray.push([index, allTasksHeightArray[index-1][2] + 2, allTasksHeightArray[index-1][2] + 2 + task.height])
    })
    console.log("onDropTask full ", allTasksHeightArray)

    const whereToDrop = allTasksHeightArray[taskIndex][1] + locationY + moveY
    const findIndex = allTasksHeightArray.findIndex( (task) => {
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
    NewTasks.splice(findIndex, 0, movedTask[0]);

    this.setState({ tasks: NewTasks })
    this.setDataToAsyncStore();
  }

  handleChangeTaskOrderLeft = (from, to) => {
    console.log('from to ', from, to)
    const NewTasks = this.state.tasks;
    const movedTask = NewTasks.splice(from-1, 1);
    NewTasks.splice(to-1, 0, movedTask[0]);
    this.setState({ tasks: NewTasks })
    this.setDataToAsyncStore();
  }

  openModal = (index) => {
    this.setState({ changeTaskOrderModalVisibility: true, from: (index+1).toString() })
  }

  getTaskFilter = (list, date, priority) => {
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

  returnFilteredTasks = () => {
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

  setScroll = (bool) => {
    this.setState({ canScroll: bool })
  }

  setActiveItem =(index) => {
    console.log('show index active item', index)
    this.setState({ isActive: index})
  }

  render() {
    console.log('isActive ', this.state.from, this.state.to)
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
    const item = this.returnFilteredTasks().map( (item, index) => {
        return <View key={item.key}>
            <ListItem item={item} index={index} handleInput={this.handleInput} state={this.state}
            handleDeleteTask={this.handleDeleteTask} setTasksCoordinations={this.setTasksCoordinations}
            handleChangeTaskOrder={this.handleChangeTaskOrder} getCoordinations={this.getCoordinations} 
            primaryColor={primaryColor} setScroll={this.setScroll} setActiveItem={this.setActiveItem} openModal={this.openModal}
            //scrollTo={this.scrollTo}
            editTask={() => {this.props.navigation.navigate('EditTask', {task: item, handleEditTask: this.handleEditTask, index: index, primaryColor: primaryColor })}  } 
              />
            <View style={{width: '80%', height: 2, backgroundColor: greyColor, alignSelf: 'center'}}></View>
         </View> 
    })
    return (
      <View style={styles.component2} >       
        <Header openDraw={this.props.screenProps.openDraw} getTaskFilter={this.getTaskFilter} primaryColor={primaryColor}/>
        <FilterTasks lists={this.props.screenProps.lists} getTaskFilter={this.getTaskFilter} primaryColor={primaryColor}/>
        <ScrollView ref={(ref) => this.scrollList = ref}
            contentContainerStyle={{paddingBottom: 110}}
            scrollEnabled={this.state.canScroll}
            //onLayout={(event)=> console.log('layout ', event.nativeEvent)}
            //onScroll={(event) => {this.setState({ scrollContentOffset: event.nativeEvent.contentOffset.y }) } }
            >
            
            <View>
                {item}
            </View>
        </ScrollView>
        <View>
          <TouchableOpacity activeOpacity={1} style={[styles.addButton, {backgroundColor: primaryColor }]}
          onPress={() => {this.props.navigation.navigate('AddTask', {lists: this.props.screenProps.lists, 
              addTask: this.handleAddTask, taskKey: this.state.taskKey, changetaskKey: this.changetaskKey,
              primaryColor: primaryColor}) } }>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <Footer primaryColor={primaryColor}/>
        <Modal transparent={true} animationType="fade" visible={this.state.changeTaskOrderModalVisibility} 
            onRequestClose={() => {this.setState({changeTaskOrderModalVisibility: false}) }}>
            <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => {this.setState({changeTaskOrderModalVisibility: false}) }}>
                <View style={[styles.modal, {borderColor: primaryColor}]}>
                    <TouchableOpacity disabled={true} style={{borderColor: 'red', borderWidth: 2}}>
                        <View style={styles.textInputArea}>
                            <Text style={styles.text}>Change Task Order To:</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({to: text})}
                                defaultValue={this.state.from}
                                editable = {true}
                                multiline = {false}
                                maxLength = {3}
                                //NumberOfLines = {4}
                                //autoFocus = {true}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={()=> { this.handleChangeTaskOrderLeft(parseInt(this.state.from), parseInt(this.state.to)); this.setState({changeTaskOrderModalVisibility: false, from: '', to: ''  })}} >
                          <Text style={styles.text}>Save</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>  
            </TouchableOpacity>                           
        </Modal>
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 3,
  },
  textInput: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    borderColor: 'gray', 
    borderBottomWidth: 2,
  },
  modal: {
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').height - 80,
    padding: 3,
    margin: 20,
    alignSelf: 'center',
    textAlign: 'center',
    position: 'absolute',
    backgroundColor: background,
    borderWidth: 3,
  },
});
