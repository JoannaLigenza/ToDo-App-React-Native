import React, {Component} from 'react';
import {StyleSheet, Text, View, CheckBox, Button, TouchableOpacity, FlatList, Animated, PanResponder,} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {colorPrimary, colorSecondary, background} from "./styles/commonStyles";
import EditTask from './EditTask';
import MenuScreen from './MenuScreen';
import Header from './header';
import Footer from './Footer';
import AddTask from './AddTask';
import ViewPort from './Dragndrop';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state= { 
            tasks: [
            {key: '1', text: 'Zrobić praniee', isChecked: false, list: "Work", priority: "Low", date: "", note: 'note1'},
            {key: '2', text: 'Kupić zakupy', isChecked: true, list: "Private", priority: "Middle", date: "", note: 'note2'},
            {key: '3', text: 'Pokodować jutro', isChecked: false, list: "Default", priority: "High", date: "", note: 'note3'},
            {key: '4', text: 'Tralalala', isChecked: false, list: "Work", priority: "Low", date: "", note: 'note1'},
            {key: '5', text: 'John', isChecked: false, list: "Work", priority: "Middle", date: "", note: 'note1'},
            ],
            taskKey: '11',
            pan: new Animated.ValueXY(),      //Step 1
            dropZonePosition: null,
    };
    this.panResponder = PanResponder.create({    //Step 2
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y } ]),  //Step 3
      onPanResponderRelease: (e, gesture) => {        //Step 4
          // if(this.isDropZone(gesture)) { 
          //     this.setState({ showDraggable : false }); //Tutaj zmien kolejnosc zadan
          // } else {
              Animated.spring(this.state.pan, {toValue:{x:10,y:10}} ).start();
         // }       
      } 
    });
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
        <View onLayout={(event) => {this.setState({dropZonePosition : event.nativeEvent.layout}); console.log("layout ",event.nativeEvent.layout)}} 
              style={{flex: 1, backgroundColor: 'grey'}}>
          <FlatList 
            contentContainerStyle={{paddingBottom: 110}}
            data={this.state.tasks}
            renderItem={({item}) => 
            <Animated.View style={[styles.oneTask, this.state.pan.getLayout()]} {...this.panResponder.panHandlers}
            onPress={()=> {console.log("layout2 ", this.state.pan.getLayout())}}>
              <CheckBox
                //checked={item.isChecked}
                checked={item.isChecked}
                value={item.isChecked}
                onValueChange={ () => {this.handleInput(item.key)} }
                style={styles.checkBox}
              />
              <TouchableOpacity activeOpacity={1} style={styles.TouchableOpacity} 
              onPress={() => {this.props.navigation.navigate('EditTask', {task: item, handleEditTask: this.handleEditTask, back: "Lets see - Item data to editing here"})} }>
                    <Text style={item.isChecked ? (styles.taskTextDone) : (styles.taskText) } >
                      {item.text}
                    </Text>
              </TouchableOpacity>
              {/* <Button title="X" onPress={this.onPressLearnMore} style={styles.button}/> */}
            </Animated.View>}
          />
        </View> 
        
        <View>
          <TouchableOpacity activeOpacity={1} style={styles.addButton}
          onPress={() => {this.props.navigation.navigate('AddTask', {lists: this.props.screenProps.lists, 
              addTask: this.handleAddTask, taskKey: this.state.taskKey, handleChangetaskKey: this.handleChangetaskKey}) } }>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        {/* <ViewPort /> */}
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
  taskText: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    textAlign: 'left',
    // borderColor: colorPrimary,
    // borderWidth: 1,
    // borderRadius: 4,
  }, 
  taskTextDone: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    textAlign: 'left',
    textDecorationLine: 'line-through',
  },
  TouchableOpacity: {
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
    backgroundColor: background,
    borderColor: 'red',
    borderWidth: 2,
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
