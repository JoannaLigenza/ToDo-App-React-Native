import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Animated, Image, CheckBox, TouchableOpacity, PanResponder, UIManager, LayoutAnimation, Dimensions, TouchableWithoutFeedback} from 'react-native';
import { background } from "./styles/commonStyles";



export default class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);  // animated Views settings
    this.state= { 
            pan: new Animated.ValueXY(),      //Step 1
            pan2: new Animated.ValueXY(), 
            value: {x: 0, y: 0},
            measurements: '',
            moveY: null,
            locationY: null,
            refreshing: false,
            backgroundColor: '#fff',
            elevation: 0,
            zIndex: 1,
            canMove: false,
    };
    this.panResponder = PanResponder.create({    //Step 2
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {
          this.props.getCoordinations(false)
          this.setState({locationY: evt.nativeEvent.locationY})
          // if ( gestureState.x0 > Dimensions.get('window').width - 50) {
          //   this.setState({ backgroundColor: '#ededed', elevation: 5, zIndex: 10 })
          // }
        },
      onPanResponderMove: (evt, gestureState) => {       //Step 3
        // gestureState.x0 - place where finger touch screen horizontally // Dimensions.get('window').width - 50 - button (...) to move tasks vertically
        if ( gestureState.x0 < Dimensions.get('window').width - 50) {
            return Animated.event([null, {dx: this.state.pan.x} ])(evt, gestureState);
        } 
        //if ( gestureState.x0 > Dimensions.get('window').width - 50) { 
        if ( this.state.canMove === true) { 
            //console.log('jak sie przesuwa ', gestureState)
            this.setState({ backgroundColor: '#ededed', elevation: 5, zIndex: 10 });
            return Animated.event([null, {dy: this.state.pan2.y} ])(evt, gestureState);
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
                if (gestureState.dx < 150) {
                Animated.timing(this.state.pan, {
                  toValue: {x: 0, y: 0},
                  duration: 150,
                }).start(() => {
                });
              } else {
                Animated.timing(this.state.pan, {
                  toValue: {x: Dimensions.get('window').width, y: 0},
                  duration: 300,
                }).start(() => {
                });
              }
        },
      onPanResponderEnd: (evt, gestureState) => {
          this.setState({moveY: gestureState.dy, backgroundColor: '#fff', elevation: 0, zIndex: 1})
        },
      onPanResponderRelease: (evt, gestureState) => {        //Step 4
      //console.log("release")
              if (gestureState.dx < 150) {
                Animated.timing(this.state.pan, {
                  toValue: {x: 0, y: 0},
                  duration: 150,
                }).start(() => {
                });
              } else {
                Animated.timing(this.state.pan, {
                  toValue: {x: Dimensions.get('window').width, y: 0},
                  duration: 300,
                }).start(() => {
                    console.log("usuniety ")
                    this.delete(this.props.item.key)
                });
              }
              if ( gestureState.x0 > Dimensions.get('window').width - 50 && this.state.canMove === true) {
                  if (gestureState.dy < 50 || gestureState.dy > -50) {
                    Animated.timing(this.state.pan2, {
                      toValue: {x: 0, y: 0},
                      duration: 150,
                    }).start(() => {
                    });
                    }
                  if (gestureState.dy > 50) {
                    Animated.timing(this.state.pan2, {
                      toValue: {x: 0, y: 0},
                      duration: 150,
                    }).start(() => {
                      LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
                      this.props.handleChangeTaskOrder('down', this.props.index, this.state.locationY, this.state.moveY)
                      this.props.getCoordinations(true);
                    });
                  }   
                  if (gestureState.dy < -50) {
                    Animated.timing(this.state.pan2, {
                      toValue: {x: 0, y: 0},
                      duration: 150,
                    }).start(() => {
                      LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
                      this.props.handleChangeTaskOrder('up', this.props.index, this.state.locationY, this.state.moveY)
                      this.props.getCoordinations(true);
                    });
                  } 
              }
          this.props.setScroll(true);
          this.setState({canMove: false, moveY: gestureState.dy, backgroundColor: '#fff', elevation: 0, zIndex: 1})
      } 
    });
  }

  delete = (key) => {
      const newTasks = this.props.state.tasks.filter(task => task.key !== key);
      this.props.handleDeleteTask(newTasks)
  }  

  setOneTaskLayout = () => {
    console.log('out')
    this.setState({ backgroundColor: '#fff', elevation: 0, zIndex: 1});
    this.props.setScroll(true);
  }

  // Not using, but keep for the future
  // taskPosition = () => { 
  //     UIManager.measure(findNodeHandle(this.refs.task), (x, y, width, height, pageX, pageY) => {
  //           console.log("show measure ", this.props.item.key, this.props.index, x, y, width, height, pageX, pageY)          
  //           this.props.setTasksCoordination(this.props.item.key, height, pageY, this.props.index);
  //       }) 
  // }
  
  render() {
    console.log("render ", this.props.state.canScroll)
    return (
      <Animated.View style={[{backgroundColor: this.props.primaryColor}, this.state.pan2.getLayout()]}>
          <Image source={require('../img/trashIcon.png')} style={styles.image}/>
          <Animated.View ref="task" style={[styles.oneTask, {backgroundColor: this.state.backgroundColor, elevation: this.state.elevation, zIndex: this.state.zIndex}, 
          this.state.pan.getLayout()]} {...this.panResponder.panHandlers} 
          onLayout={(event) => { this.props.setTasksCoordination(this.props.item.key, event.nativeEvent.layout.height); 
          } }>
              <CheckBox
                    checked={this.props.item.isChecked}
                    value={this.props.item.isChecked}
                    onValueChange={ () => {this.props.handleInput(this.props.item.key)} }
                    containerStyle={{  backgroundColor: 'pink'}}
              />
              <TouchableOpacity activeOpacity={1} style={styles.TouchableOpacity} 
                  onPress={() => {this.props.editTask(); this.props.setScroll(true)} }>
                  <Text style={this.props.item.isChecked ? (styles.taskTextDone) : (styles.taskText) } >
                      {this.props.item.text}
                  </Text>
                  <Text style={styles.taskTextUnder}>List: {this.props.item.list}, Priority: {this.props.item.priority} </Text>
              </TouchableOpacity>
              <TouchableWithoutFeedback onPressIn={() => {this.props.setScroll(false); console.log('in ', this.props.index)}}
                onLongPress={() => {this.setState({ canMove: true, backgroundColor: '#ededed', elevation: 5, zIndex: 10 }); console.log('press') }} 
                onPressOut={this.state.onPressOut ? (null) : (this.setOneTaskLayout) } >
                  <View style={styles.moveTaskVertically} >
                    <Text>.....</Text>
                  </View>
              </TouchableWithoutFeedback>
          </Animated.View>
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
  image: {
    width: 40,
    height: 33,
    position: 'absolute',
    left: 10,
    top: '33%',
    // borderColor: 'white',
    // borderWidth: 2,
  },
  TouchableOpacity: {
    flex: 1,
    margin: 10,
    // borderColor: 'red',
    // borderWidth: 2,
    //backgroundColor: 'purple',
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
  taskTextUnder: {
    flex: 1,
    fontSize: 14,
    padding: 3,
    paddingTop: 0,
    paddingLeft: 10,
    textAlign: 'left',
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
