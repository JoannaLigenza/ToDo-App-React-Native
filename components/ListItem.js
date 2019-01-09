import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Animated, CheckBox, TouchableOpacity, PanResponder, UIManager, LayoutAnimation, Dimensions, findNodeHandle} from 'react-native';
import {colorPrimary, colorSecondary, background, greyColor} from "./styles/commonStyles";



export default class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);  // animated Views settings
    this.state= { 
            pan: new Animated.ValueXY(),      //Step 1
            value: {x: 0, y: 0},
            measurements: '',
            moveY: null,
            locationY: null,
            refreshing: false,
            backgroundColor: '#fff',
            zIndex: 1,
    };
    this.panResponder = PanResponder.create({    //Step 2
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        // const { pageX, pageY, x0, y0 } = evt.nativeEvent
        // //console.log("zobaczmy ", pageX, pageY, x0, y0)
      },
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        //console.log("evt.native ", evt.nativeEvent.touches, evt.currentTarget)
          this.props.getCoordinations(false)
          this.props.getgestureState(gestureState.x0)
          this.setState({locationY: evt.nativeEvent.locationY})
          if ( gestureState.x0 > Dimensions.get('window').width - 50) {
            this.setState({ backgroundColor: '#ededed' })
          }
        },
      onPanResponderMove: (evt, gestureState) => {       //Step 3
        // gestureState.x0 - place where finger touch screen horizontally // Dimensions.get('window').width - 50 - button (...) to move tasks vertically
        if ( gestureState.x0 < Dimensions.get('window').width - 50) {
            return Animated.event([null, {dx: this.state.pan.x} ])(evt, gestureState)
        } 
         else { 
            //console.log('jak sie przesuwa ', gestureState)
            return Animated.event([null, {dy: this.state.pan.y} ])(evt, gestureState)
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
                    console.log("usuniety ")
                    this.delete(this.props.item.key)
                });
              }
              if ( gestureState.x0 > Dimensions.get('window').width - 50) {
                  if (gestureState.dy > 50) {
                    Animated.timing(this.state.pan, {
                      toValue: {x: 0, y: 0},
                      duration: 150,
                    }).start(() => {
                    });
                  }   
                  if (gestureState.dy < -50) {
                    Animated.timing(this.state.pan, {
                      toValue: {x: 0, y: 0},
                      duration: 150,
                    }).start(() => {
                    });
                  } 
              }
        },
      onPanResponderEnd: (evt, gestureState) => {
          //console.log("end")
          this.setState({moveY: gestureState.dy, backgroundColor: '#fff'})
        },
      onPanResponderRelease: (evt, gestureState) => {        //Step 4
      //console.log("release")
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
                      this.props.handleChangeTaskOrder('down', this.props.index, this.state.locationY, this.state.moveY)
                      this.props.getCoordinations(true);
                    });
                  }   
                  if (gestureState.dy < -50) {
                    Animated.timing(this.state.pan, {
                      toValue: {x: 0, y: 0},
                      duration: 150,
                    }).start(() => {
                      LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
                      this.props.handleChangeTaskOrder('up', this.props.index, this.state.locationY, this.state.moveY)
                      this.props.getCoordinations(true);
                    });
                  } 
              }
      } 
    });
  }

  delete = (key) => {
      const newTasks = this.props.state.tasks.filter(task => task.key !== key);
      //LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
      this.props.handleDeleteTask(newTasks)
  }  

  taskPosition = () => { 
      UIManager.measure(findNodeHandle(this.refs.task), (x, y, width, height, pageX, pageY) => {
            console.log("jest ", this.props.item.key, this.props.index, x, y, width, height, pageX, pageY)          
            this.props.setTasksCoordination(this.props.item.key, height, pageY, this.props.index);
        }) 
  }
  
  render() {
    console.log("render ", )
    return (
        <Animated.View ref="task" style={[styles.oneTask, {backgroundColor: this.state.backgroundColor}, this.state.pan.getLayout()]} 
        {...this.panResponder.panHandlers} 
        onLayout={() => {this.props.index ? (this.taskPosition()) : (null); 
        } }>
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
