import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, AsyncStorage, ScrollView, Modal, Dimensions } from 'react-native';
import {background, greyColor} from "./styles/commonStyles";
import Header from './header';
import Footer from './Footer';
import ListItem from './ListItem';
import FilterTasks from './FilterTask';
import ModalChangeTasksOrder from './ModalChangeTasksOrder';


export default class Main extends Component {
  constructor(props) {
    super(props);

    this.initialNumToRender = 20,
    this.initHeight = 67,
    this.screenHeight = Dimensions.get('window').height

    this.state= { 
            tasks: [ {key: '1', text: '', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''} ],
            taskKey: '2',
            firstTaskPositionY: 115.04762268066406,
            taskFilter: {lists: '', date: '', priority: ''},
            canScroll: true,
            isActive: -1,
            changeModalVisibility: false,
            from: '',
            to: '',
            numToRender: this.initialNumToRender,
    };
    this.getDataFromAsyncStore();
  }

  static navigationOptions = ({ }) => {
    return { 
      header: null,
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props === nextProps && JSON.stringify(this.state) === JSON.stringify(nextState)) {
      return false
    } else {
      return true
    }
  }

  init = [{key: '1', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '2', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '3', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '4', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '5', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '6', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '7', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '8', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '9', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '10', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '11', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '12', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '13', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '14', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '15', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '16', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '17', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '18', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '19', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '20', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '21', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '22', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '23', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '24', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '25', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '26', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '27', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '28', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '29', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '30', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '31', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '32', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '33', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '34', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '35', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '36', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '37', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '38', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '39', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '40', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '41', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '42', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '43', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '44', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '45', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '46', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '47', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '48', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '49', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '50', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '51', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '52', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '53', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '54', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '55', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '56', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '57', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '58', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '59', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '60', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '61', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '62', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '63', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '64', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '65', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '66', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '67', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '68', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '69', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '70', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '71', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '72', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '73', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '74', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '75', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '76', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '77', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '78', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '79', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '80', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '81', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '82', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '83', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '84', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '85', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '86', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '87', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '88', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '89', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '90', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '91', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '92', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '93', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '94', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '95', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '96', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '97', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '98', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '99', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '100', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '101', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '102', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '103', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '104', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '105', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '106', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '107', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '108', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '109', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '110', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '111', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '112', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '113', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '114', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  {key: '115', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''},
  ]

  getDataFromAsyncStore = async () => {
        try {
            const initTask = [{key: '1', text: 'Sample task', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''}]
            let tasks = await AsyncStorage.getItem('tasks');
            let taskKey = await AsyncStorage.getItem('taskKey');
            if (taskKey === null) {
                taskKey = '2'
                // saving data as string
                await AsyncStorage.setItem('taskKey', taskKey );
            }
            if (tasks === null) {
                tasks = initTask
                // saving data as string
                await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
                this.setState({ tasks: tasks, taskKey: taskKey })
                return
            }
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

  handleDeleteTask = async (key) => {
    const newTasks = this.state.tasks.filter(task => task.key !== key);
    await this.setState({tasks: newTasks})
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
    //console.log('onLayout')
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
    const allTasksHeightArray = [[0, this.state.firstTaskPositionY, this.state.firstTaskPositionY + this.returnFilteredTasks()[0].height + 2],]
    this.returnFilteredTasks().map( (task, index) => {
      if ( index === 0 ) { return }
      //console.log('task height ', index, task.height)
      return allTasksHeightArray.push([index, allTasksHeightArray[index-1][2] + 0.0000000000001, allTasksHeightArray[index-1][2] + 0.0000000000001 + task.height + 2])
    })
    //console.log("onDropTask full ", allTasksHeightArray)

    const whereToDrop = allTasksHeightArray[taskIndex][1] + locationY + moveY
    let findIndex = allTasksHeightArray.findIndex( (task) => {
        if (whereToDrop >= task[1] && whereToDrop < task[2]) {
          return task
        }
    })
    //  console.log("tutaj ", whereToDrop)
    //  console.log("findIndex ", findIndex)
    
    if (whereToDrop > allTasksHeightArray[allTasksHeightArray.length-1][2] ) {
      findIndex = allTasksHeightArray.length-1
    }
    if (whereToDrop < this.state.firstTaskPositionY ) {
      findIndex = 0
    } 
    if (findIndex === -1) {
      return
    }

    const NewTasks = this.returnFilteredTasks();
    const movedTask = NewTasks.splice(taskIndex, 1);
    NewTasks.splice(findIndex, 0, movedTask[0]);

    this.changeTasksOrder(NewTasks);
    this.setDataToAsyncStore();
  }

  handleChangeTaskOrderLeft = (from, to) => {
    const NewTasks = this.returnFilteredTasks();
    const movedTask = NewTasks.splice(from-1, 1);
    NewTasks.splice(to-1, 0, movedTask[0]);
    this.changeTasksOrder(NewTasks);
    this.setDataToAsyncStore();
  }

  changeTasksOrder = (NewTasks) => {
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
      let counter = 0
      const NewFilteredTasks2 = this.state.tasks.map( task => {
        if (this.state.taskFilter.date === task.date) {
          task = NewTasks[counter]
          counter += 1
          return task
        }
        return task
      })
        this.setState({ tasks: NewFilteredTasks2 })
    }
    if (this.state.taskFilter.priority !== '') {
      let counter = 0
      const NewFilteredTasks2 = this.state.tasks.map( task => {
        if (this.state.taskFilter.priority === task.priority) {
          task = NewTasks[counter]
          counter += 1
          return task
        }
        return task
      })
        this.setState({ tasks: NewFilteredTasks2 })
    }
    if (this.state.taskFilter.lists === '' && this.state.taskFilter.date === '' && this.state.taskFilter.priority === '') {
        this.setState({ tasks: NewTasks })
    }
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

  setActiveItem = (index) => {
   // console.log('show index of active item', index)
    this.setState({ isActive: index})
  }

  getContentSize = (contentHeight) => {
    if (contentHeight <= this.screenHeight+200 ) {
      this.setState({ numToRender: this.state.numToRender+10 })
    }
    //console.log('layout view  ', contentHeight, this.screenHeight+200)
  }

  numToRender = () => {
    this.setState({ numToRender: this.initialNumToRender })
  }

  render() {
    console.log('main ', this.state.numToRender)
    if (this.props.screenProps.deletedList !== '') {
        this.state.tasks.map( task => {
          if (this.props.screenProps.deletedList === task.list ) {
            task.list = 'Default'
            return task
          }
          return task
        })
    }
    
    let allTasksHeightArray = []
    this.returnFilteredTasks().map( (task, index) => {
      const height = task.height || 67
      if (index === 0) {
        allTasksHeightArray.push([index, 0, height+2])
        return
      }
      allTasksHeightArray.push([index, allTasksHeightArray[index-1][2], allTasksHeightArray[index-1][2] + height + 2])
    })
    //console.log('allTasksHeightArray ', allTasksHeightArray)

    const primaryColor = this.props.screenProps.primaryColor
    const item = this.returnFilteredTasks().map( (item, index) => {
      if (index <= this.state.numToRender ) {
      return <View key={item.key}>
                <ListItem item={item} index={index} isActive={this.state.isActive} taskFilter={this.state.taskFilter} 
                handleDeleteTask={this.handleDeleteTask} 
                setTasksCoordinations={this.setTasksCoordinations} handleChangeTaskOrder={this.handleChangeTaskOrder}
                primaryColor={primaryColor} setScroll={this.setScroll} setActiveItem={this.setActiveItem} openModal={this.openModal}
                editTask={() => {this.props.navigation.navigate('EditTask', {task: item, handleEditTask: this.handleEditTask, index: index, primaryColor: primaryColor })}  } 
                />
                <View style={{width: '80%', height: 2, backgroundColor: greyColor, alignSelf: 'center'}}></View>
      </View> }
    })
    return (
      <View style={styles.mainComponent} >       
        <Header openDraw={this.props.screenProps.openDraw} getTaskFilter={this.getTaskFilter} primaryColor={primaryColor} numToRender={this.numToRender}/>
        <FilterTasks lists={this.props.screenProps.lists} getTaskFilter={this.getTaskFilter} primaryColor={primaryColor} taskFilter={this.state.taskFilter} numToRender={this.numToRender}/>
        <ScrollView //ref={(ref) => this.scrollList = ref}
            contentContainerStyle={{paddingBottom: 110}}
            scrollEnabled={this.state.canScroll} 
            onContentSizeChange={ (contentWidth, contentHeight ) => this.getContentSize(contentHeight)}
            onMomentumScrollEnd={(e) => { 
              const scrollPosition = e.nativeEvent.contentOffset.y;

              let taskOnTopScreen = 0
              allTasksHeightArray.map( item => {
                if ( scrollPosition >= item[1] && scrollPosition < item[2]) {
                  taskOnTopScreen = item[0]
                }
              })
              //console.log('taskOnTop ', taskOnTopScreen)
              this.setState({ numToRender: taskOnTopScreen + 20 })
              }}
            >
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
        {/* <Footer primaryColor={primaryColor}/> */}
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