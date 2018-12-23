import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, CheckBox, TouchableOpacity, PanResponder, UIManager, LayoutAnimation, Dimensions, findNodeHandle} from 'react-native';
import {colorPrimary, colorSecondary, background} from "./styles/commonStyles";


export default class ListItem extends Component {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);  // animated Views settings
    this.state= { 
            pan: new Animated.ValueXY(),      //Step 1
            pageX: '',
            pageY: '',
            width: '',
            height: '',
            measurements: '',
    };
    this.panResponder = PanResponder.create({    //Step 2
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {
          if ( gestureState.x0 > Dimensions.get('window').width - 50) {
            this.props.canScroll(false);
          }
        },
      onPanResponderMove: (evt, gestureState) => {       //Step 3
        console.log("gestureState ", gestureState)
        //this.props.setTasksCoordination(evt.pageX, evt.pageY, this.state.width, this.state.height, this.props.item.key);
        //this.setState({pageX: evt.pageX, pageY: evt.pageY,})
        // gestureState.x0 - place where finger touch screen horizontally // Dimensions.get('window').width - 50 - button (...) to move tasks vertically
        if ( gestureState.x0 < Dimensions.get('window').width - 50) {
            return Animated.event([null, {dx: this.state.pan.x} ])(evt, gestureState)
        } 
         else {
           
            return Animated.event([null, {dy: this.state.pan.y} ])(evt, gestureState)
        }
      },
      onPanResponderRelease: (evt, gestureState) => {        //Step 4
              if (gestureState.dx < 150) {
                Animated.timing(this.state.pan, {
                  toValue: {x: 0, y: 0},
                  duration: 150,
                }).start(() => {
                    // something here
                });
              } else {
                Animated.timing(this.state.pan, {
                  toValue: {x: Dimensions.get('window').width, y: 0},
                  duration: 300,
                }).start(() => {
                    console.log("usuniety ")
                    this.delete(this.props.item.key)
                    // something here
                });
              }
              if ( gestureState.x0 > Dimensions.get('window').width - 50) {
                  if (gestureState.dy > 50) {
                    Animated.timing(this.state.pan, {
                      toValue: {x: 0, y: 0},
                      duration: 150,
                    }).start(() => {
                      LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
                      this.props.handleChangeTaskOrder('down', this.props.index)
                    });
                  }   
                  if (gestureState.dy < -50) {
                    Animated.timing(this.state.pan, {
                      toValue: {x: 0, y: 0},
                      duration: 150,
                    }).start(() => {
                      LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
                      this.props.handleChangeTaskOrder('up', this.props.index)
                    });
                  } 
                  this.props.canScroll(true);
              }
      } 
    });
  }

  delete = (key) => {
      const newTasks = this.props.allTasks.filter(task => task.key !== key);
      //LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
      this.props.handleDeleteTask(newTasks)
  }  

  taskPosition = () => {
    UIManager.measure(findNodeHandle(this.refs.my), (x, y, width, height, pageX, pageY) => {
        this.props.setTasksCoordination(pageX, pageY, width, height, this.props.item.key);
        //console.log("cos 2",  width, height, pageX, pageY)
        })
  }
  
  render() {
      //console.log("state ", )
    return (
        <Animated.View ref="my" style={[styles.oneTask, this.state.pan.getLayout()]} {...this.panResponder.panHandlers} 
        onLayout={ this.taskPosition }>
            <CheckBox
                  //checked={item.isChecked}
                  checked={this.props.item.isChecked}
                  value={this.props.item.isChecked}
                  onValueChange={ () => {this.props.handleInput(this.props.item.key)} }
                  //style={styles.checkBox}
            />
            <TouchableOpacity activeOpacity={1} style={styles.TouchableOpacity} 
                onPress={this.props.editTask }>
                <Text style={this.props.item.isChecked ? (styles.taskTextDone) : (styles.taskText) } >
                    {this.props.item.text}
                </Text>
            </TouchableOpacity>
            <View style={styles.moveTaskVertically} ><Text>.....</Text></View>
            {/* <Button title="X" onPress={this.onPressLearnMore} style={styles.button}/> */}
        </Animated.View>
    );
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
    // borderColor: 'red',
    // borderWidth: 2,
    //backgroundColor: 'purple',
  }, 
  oneTask: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
    alignItems: "center",
    backgroundColor: background,
    // borderColor: 'red',
    // borderWidth: 2,
  }, 
  moveTaskVertically: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
  }
});
