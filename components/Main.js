<script src="http://localhost:8097"></script>
import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, AsyncStorage, ScrollView, Modal,} from 'react-native';
import {background, greyColor} from "./styles/commonStyles";
import Header from './header';
import Footer from './Footer';
import ListItem from './ListItem';
import FilterTasks from './FilterTask';
import ModalChangeTasksOrder from './ModalChangeTasksOrder';


export default class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state= { 
            tasks: [],
            taskKey: '',
            firstTaskPositionY: 115.04762268066406,
            taskFilter: {lists: '', date: '', priority: ''},
            canScroll: true,
            isActive: -1,
            changeModalVisibility: false,
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

  handleAddTask = async (task) => {
    const newTasks = [...this.state.tasks, task];
    await this.setState({ tasks: newTasks });
    this.setDataToAsyncStore();
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
    //console.log('choosenTask ', choosenTask, choosenTask.key)
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

  handleChangeTaskOrder = (taskIndex, locationY, moveY) => {
    //console.log('moveY ', locationY, moveY)
    const allTasksHeightArray = [[0, this.state.firstTaskPositionY, this.state.firstTaskPositionY + this.returnFilteredTasks()[0].height],]
    this.returnFilteredTasks().map( (task, index) => {
      if ( index === 0 ) { return }
      //console.log('task height ', index, task.height)
      return allTasksHeightArray.push([index, allTasksHeightArray[index-1][2] + 2, allTasksHeightArray[index-1][2] + 2 + task.height])
    })
    //console.log("onDropTask full ", allTasksHeightArray)

    const whereToDrop = allTasksHeightArray[taskIndex][1] + locationY + moveY
    const findIndex = allTasksHeightArray.findIndex( (task) => {
        if (whereToDrop >= task[1] && whereToDrop < task[2]) {
          return task
        }
    })
     //console.log("tutaj ", whereToDrop)
     //console.log("findIndex ", findIndex)
    if (findIndex === -1) {
      return
    }

    const NewTasks = this.returnFilteredTasks();
    const movedTask = NewTasks.splice(taskIndex, 1);
    NewTasks.splice(findIndex, 0, movedTask[0]);

    if (this.state.taskFilter.lists !== '') {
      let counter = 0
      const NewFilteredTasks = this.state.tasks.map( task => {
        if (this.state.taskFilter.lists === task.list) {
          task = NewTasks[counter]
          counter += 1
          return task
        }
        return task
      })
        this.setState({ tasks: NewFilteredTasks })
    } 
    if (this.state.taskFilter.date !== '') {
      let counter2 = 0
      const NewFilteredTasks2 = this.state.tasks.map( task => {
        if (this.state.taskFilter.date === task.date) {
          task = NewTasks[counter2]
          counter2 += 1
          return task
        }
        return task
      })
        this.setState({ tasks: NewFilteredTasks2 })
    }
    if (this.state.taskFilter.priority !== '') {
      let counter2 = 0
      const NewFilteredTasks2 = this.state.tasks.map( task => {
        if (this.state.taskFilter.priority === task.priority) {
          task = NewTasks[counter2]
          counter2 += 1
          return task
        }
        return task
      })
        this.setState({ tasks: NewFilteredTasks2 })
    }
    if (this.state.taskFilter.lists === '' && this.state.taskFilter.date === '' && this.state.taskFilter.priority === '') {
        this.setState({ tasks: NewTasks })
    }
    this.setDataToAsyncStore();
  }

  handleChangeTaskOrderLeft = (from, to) => {
    const NewTasks = this.state.tasks;
    const movedTask = NewTasks.splice(from-1, 1);
    NewTasks.splice(to-1, 0, movedTask[0]);
    this.setState({ tasks: NewTasks })
    this.setDataToAsyncStore();
  }

  openModal = (index) => {
    this.setState({ changeModalVisibility: true, from: (index+1).toString() });
  }

  changeModalVisibility = (bool) => {
      this.setState({ changeModalVisibility: bool });
  }

  setFromOrderNumber = (from) => {
    this.setState({ from: from });
  }

  setToOrderNumber = (to) => {
    this.setState({ to: to });
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
   // console.log('show index of active item', index)
    this.setState({ isActive: index})
  }

  render() {
   // console.log('isActive ', this.state.from, this.state.to)
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
                <ListItem item={item} index={index} state={this.state} handleDeleteTask={this.handleDeleteTask} 
                setTasksCoordinations={this.setTasksCoordinations} handleChangeTaskOrder={this.handleChangeTaskOrder}
                primaryColor={primaryColor} setScroll={this.setScroll} setActiveItem={this.setActiveItem} openModal={this.openModal}
                editTask={() => {this.props.navigation.navigate('EditTask', {task: item, handleEditTask: this.handleEditTask, index: index, primaryColor: primaryColor })}  } 
                />
                <View style={{width: '80%', height: 2, backgroundColor: greyColor, alignSelf: 'center'}}></View>
            </View> 
    })
    return (
      <View style={styles.mainComponent} >       
        <Header openDraw={this.props.screenProps.openDraw} getTaskFilter={this.getTaskFilter} primaryColor={primaryColor}/>
        <FilterTasks lists={this.props.screenProps.lists} getTaskFilter={this.getTaskFilter} primaryColor={primaryColor} taskFilter={this.state.taskFilter} />
        <ScrollView //ref={(ref) => this.scrollList = ref}
            contentContainerStyle={{paddingBottom: 110}}
            scrollEnabled={this.state.canScroll} >
            <View>
                {item}
            </View>
        </ScrollView>
        <View>
          <TouchableOpacity activeOpacity={0.8} style={[styles.addButton, {backgroundColor: primaryColor }]}
          onPress={() => {this.props.navigation.navigate('AddTask', {lists: this.props.screenProps.lists, 
              addTask: this.handleAddTask, taskKey: this.state.taskKey, changetaskKey: this.changetaskKey,
              primaryColor: primaryColor}) } }>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <Footer primaryColor={primaryColor}/>
        <Modal transparent={true} animationType="fade" visible={this.state.changeModalVisibility} 
            onRequestClose={() => {this.setState({changeModalVisibility: false}) }}>
              <ModalChangeTasksOrder changeModalVisibility={this.changeModalVisibility} 
              primaryColor={primaryColor} handleChangeTaskOrderLeft={this.handleChangeTaskOrderLeft} 
              setFromOrderNumber={this.setFromOrderNumber} setToOrderNumber={this.setToOrderNumber} 
              state={this.state} />                
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainComponent: {
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
    margin: 0,
    padding: 0,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 50,
  },
});
