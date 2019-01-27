import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Animated, Image, TouchableOpacity, PanResponder, UIManager, LayoutAnimation, Dimensions, TouchableWithoutFeedback} from 'react-native';
import { background } from "./styles/commonStyles";



export default class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);  // animated Views settings
    this.state= { 
            pan: new Animated.ValueXY(),      //Step 1
            pan2: new Animated.ValueXY(), 
            moveY: null,
            locationY: null,
            backgroundColor: '#fff',
            elevation: 0,
            canMove: false,
            isMoving: false,
    };
    this.panResponder = PanResponder.create({    //Step 2
      onStartShouldSetPanResponderCapture: () => false,
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        const { dx, dy } = gestureState
        //console.log('gesture dy', dy)
        if (dx > 2 || dx < -2 || dy > 7 || dy < -7) {
          return true
        } else { return false }
      },
      onPanResponderGrant: () => {
          this.setState({ isMoving: true })
          console.log('move')
        },
      onPanResponderMove: (evt, gestureState) => {       //Step 3
        // gestureState.x0 - place where finger touch screen horizontally // Dimensions.get('window').width - 50 - button (...) to move tasks vertically
        if ( gestureState.x0 < Dimensions.get('window').width - 50 && gestureState.dx > 50) {
            return Animated.event([null, {dx: this.state.pan.x} ])(evt, gestureState);
        } 
        //if ( gestureState.x0 > Dimensions.get('window').width - 50) { 
        if ( this.state.canMove === true) { 
            //console.log('jak sie przesuwa ', gestureState, evt.nativeEvent.target)
            this.setState({ backgroundColor: '#ededed', elevation: 5});
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
            if ( gestureState.x0 > Dimensions.get('window').width - 50 && this.state.canMove === true) {
                    Animated.timing(this.state.pan2, {
                      toValue: {x: 0, y: 0},
                      duration: 150,
                    }).start(() => {
                    }); 
            }
            this.props.setActiveItem(-1);
            this.setState({ isMoving: false })
        },
      onPanResponderEnd: (evt, gestureState) => {
          this.setState({moveY: gestureState.dy, backgroundColor: '#fff', elevation: 0})
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
                    //console.log("removed ")
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
                  if (gestureState.dy > 50 || gestureState.dy < -50) {
                    Animated.timing(this.state.pan2, {
                      toValue: {x: 0, y: 0},
                      duration: 150,
                    }).start(() => {
                      LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
                      this.props.handleChangeTaskOrder(this.props.index, this.state.locationY, this.state.moveY)
                    });
                  }   
              }
          this.props.setScroll(true);
          this.props.setActiveItem(-1);
          this.setState({canMove: false, isMoving: false, moveY: gestureState.dy, backgroundColor: '#fff', elevation: 0})
      } 
    });
  }

  delete = (key) => {
      const newTasks = this.props.state.tasks.filter(task => task.key !== key);
      this.props.handleDeleteTask(newTasks)
  }  

  onPressOut = () => {
    console.log('out ', this.state.isMoving)
    this.setState({ canMove: false, backgroundColor: '#fff', elevation: 0}); 
  }

  // Not using, but keep for the future
  // taskPosition = () => { 
  //     UIManager.measure(findNodeHandle(this.refs.task), (x, y, width, height, pageX, pageY) => {
  //           console.log("show measure ", this.props.item.key, this.props.index, x, y, width, height, pageX, pageY)          
  //           this.props.setTasksCoordination(this.props.item.key, height, pageY, this.props.index);
  //       }) 
  // }
  
  render() {
    const taskNumberBackgroundColor = () => {
      if( this.props.item.priority === 'None') { return null}
      if( this.props.item.priority === 'Low') { return 'yellow'}
      if( this.props.item.priority === 'Middle') { return 'orange'}
      if( this.props.item.priority === 'High') { return 'red'}
    }
    const initHeihgt = this.props.item.height || 67
    return (
      <Animated.View style={[{backgroundColor: this.props.primaryColor, zIndex: this.props.state.isActive===this.props.index ? 10 : 1}, this.state.pan2.getLayout()]}>
          <Image source={require('../img/trashIcon.png')} style={[styles.image, { top: (initHeihgt-33)/2 }]}/>
          <Animated.View ref="task" style={[styles.oneTask, {backgroundColor: this.state.backgroundColor, elevation: this.state.elevation}, 
          this.state.pan.getLayout()]} {...this.panResponder.panHandlers} 
          onLayout={(event) => { this.props.setTasksCoordinations(this.props.item.key, event.nativeEvent.layout.height); 
          } }
          >
              <TouchableOpacity activeOpacity={0.7} style={[styles.TouchableOpacityNumber, {backgroundColor: taskNumberBackgroundColor(), }]}
                  onPress={() => { (this.props.state.taskFilter.lists === '' && this.props.state.taskFilter.date === '' && this.props.state.taskFilter.priority === '') ? (this.props.openModal(this.props.index, this.props.item)) : (null) }}>
                  <Text style={styles.taskNumber}>{this.props.index+1}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity activeOpacity={1} style={styles.TouchableOpacity}
                  onPress={() => {this.props.editTask(); this.props.setScroll(true)} }>
                  <Text style={this.props.item.isChecked ? (styles.taskTextDone) : (styles.taskText) } >
                      {this.props.item.text}
                  </Text>
              </TouchableOpacity>

              <TouchableWithoutFeedback onPressIn={() => {this.props.setScroll(false); this.props.setActiveItem(this.props.index); console.log('press in') }}
                onLongPress={() => {this.setState({ canMove: true, backgroundColor: '#ededed', elevation: 5}); console.log('long press') }} 
                delayLongPress={30} 
                onPressOut={() => { this.state.isMoving ? (null) : (this.onPressOut())  } } delayPressOut={30}
                >
                  <View style={styles.moveTaskVertically} >
                    <Image source={require('../img/dots.png')} />
                  </View>
              </TouchableWithoutFeedback>

          </Animated.View>
      </Animated.View>
    );
}

}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 33,
    position: 'absolute',
    left: 10,
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
  TouchableOpacity: {
    flex: 1,
    margin: 10,
    // borderColor: 'red',
    // borderWidth: 2,
    //backgroundColor: 'purple',
  }, 
  TouchableOpacityNumber: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    height: '100%',
  }, 
  taskNumber: {
    padding: 2,
    //paddingLeft: 15,
    fontSize: 20,
    alignSelf: 'center',
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
  moveTaskVertically: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
  },
});
