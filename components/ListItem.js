import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Animated, Image, TouchableOpacity, PanResponder, UIManager, LayoutAnimation, Dimensions, TouchableWithoutFeedback} from 'react-native';
import { background } from "./styles/commonStyles";



export default class ListItem extends Component {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);  // animated Views settings
    this.state= { 
            canMove: false,
            isMoving: false,
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => false,
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        const { dx, dy } = gestureState
        //console.log('gesture dy', dy)
        if (dx > 2 || dx < -2 || dy > 5 || dy < -5) {
          return true
        } else { return false }
      },
      onPanResponderGrant: (evt, gestureState) => {
          this.setState({ isMoving: true })
          //console.log('move')
        },
      onPanResponderMove: (evt, gestureState) => {
        // gestureState.x0 - place where finger touch screen horizontally // Dimensions.get('window').width - 50 - button (...) to move tasks vertically
        if ( gestureState.x0 < Dimensions.get('window').width - 50 && gestureState.dx > 0) {
             this.onMoveX(gestureState.dx);
        } 
        //console.log('gesturestate ', gestureState)
        //if ( this.state.canMove === true) { 
        if ( gestureState.x0 > Dimensions.get('window').width - 50 && (gestureState.dy > 5 || gestureState.dy < -5) && this.state.canMove === true ) { 
          //console.log('bigger than ', gestureState.dy)
             this.onMoveY(gestureState.dy);
            //console.log('jak sie przesuwa ',  evt.nativeEvent)
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        //console.log('terminate')
            this.onResponderRelease(evt, gestureState);
            this.props.setActiveItem(-1);
            this.setState({ isMoving: false })
        },
      onPanResponderEnd: (evt, gestureState) => { },
      onPanResponderRelease: (evt, gestureState) => {
      //console.log("release")
          this.onResponderRelease(evt, gestureState);
          this.props.setScroll(true);
          this.props.setActiveItem(-1);
          this.setState({canMove: false, isMoving: false})
      } 
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
     //console.log('true / false: ', this.props.index, this.props.item === nextProps.item, this.props.index === nextProps.index) 
    if (this.props.item === nextProps.item && this.props.index === nextProps.index && this.props.primaryColor === nextProps.primaryColor) {
      return false
    } else return true
  }

  onPressOut = () => {
    //console.log('out ', this.state.isMoving)
    this.setState({ canMove: false }); 
  }

  onMoveX = (dx) => {
    this.refs['task'].setNativeProps({style: { transform: [{translateX: dx}] } });
  }

  onMoveY = (dy) => {
    this.refs['allTask'].setNativeProps({style: { elevation: 5, transform: [{translateY: dy}] } });
  }

  onResponderRelease = (evt, gestureState) => {
    if (gestureState.dx < Dimensions.get('window').width/2 ) {
        this.refs['task'].setNativeProps({style: { transform: [{translateX: 0}] } });
    }
    if (gestureState.dx >= Dimensions.get('window').width/2 ) {
        LayoutAnimation.configureNext( LayoutAnimation.create(300, 'easeInEaseOut', 'opacity') );
        this.refs['task'].setNativeProps({style: { transform: [{translateX: Dimensions.get('window').width}] } });
        this.refs['allTask'].setNativeProps({style: { opacity: 0 } });
        this.props.handleDeleteTask(this.props.item.key)
    }
    if ( gestureState.x0 > Dimensions.get('window').width - 50 && this.state.canMove === true) {
        this.refs['allTask'].setNativeProps({style: { elevation: 0, transform: [{translateY: 0}] } });
    }
    if ( gestureState.x0 > Dimensions.get('window').width - 50 && (gestureState.dy > 50 || gestureState.dy < -50) ) {
        LayoutAnimation.configureNext( LayoutAnimation.create(300, 'easeInEaseOut', 'opacity') );
        this.props.handleChangeTaskOrder(this.props.index, evt.nativeEvent.locationY, gestureState.dy)
    }
  }

  // Not using, but keep for the future
  // taskPosition = () => { 
  //     UIManager.measure(findNodeHandle(this.refs.task), (x, y, width, height, pageX, pageY) => {
  //           console.log("show measure ", this.props.item.key, this.props.index, x, y, width, height, pageX, pageY)          
  //           this.props.setTasksCoordination(this.props.item.key, height, pageY, this.props.index);
  //       }) 
  // }
  
  render() {
    console.log('render ', this.props.index)
    const taskNumberBackgroundColor = () => {
      if( this.props.item.priority === 'None') { return null}
      if( this.props.item.priority === 'Low') { return 'yellow'}
      if( this.props.item.priority === 'Middle') { return 'orange'}
      if( this.props.item.priority === 'High') { return 'red'}
    }
    return (
      <Animated.View ref='allTask' style={[{backgroundColor: this.props.primaryColor, zIndex: this.props.isActive===this.props.index ? 10 : 1} ]} {...this.panResponder.panHandlers} >
          <View style={styles.absolute} >
            <Image source={require('../img/trashIcon.png')} style={styles.image} />
          </View>
          <Animated.View ref='task' style={styles.oneTask} {...this.panResponder.panHandlers} 
          onLayout={(event) => { this.props.item.height !== event.nativeEvent.layout.height ? (this.props.setTasksCoordinations(this.props.item.key, event.nativeEvent.layout.height)) : (null);
          } }
          >
              <TouchableOpacity activeOpacity={0.7} style={[styles.TouchableOpacityNumber, {backgroundColor: taskNumberBackgroundColor(), }]}
                  onPress={() => { this.props.openModal(this.props.index, this.props.item) }}>
                  <Text style={styles.taskNumber}>{this.props.index+1}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity activeOpacity={1} style={styles.TouchableOpacity}
                  onPress={() => {this.props.editTask(); this.props.setScroll(true)} }>
                  <Text style={this.props.item.isChecked ? (styles.taskTextDone) : (styles.taskText) } >
                      {this.props.item.text}
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={1} onPressIn={() => {this.props.setScroll(false); this.props.setActiveItem(this.props.index); this.setState({ canMove: true }); console.log('press in') }}
               // onLongPress={() => {this.setState({ canMove: true }); console.log('long press') }} 
               // delayLongPress={1} 
                onPressOut={() => { this.state.isMoving ? (null) : (this.onPressOut()) }} delayPressOut={200}
                >
                  <View style={styles.moveTaskVertically} >
                    <Image source={require('../img/dots.png')}  />
                  </View>
              </TouchableOpacity>

          </Animated.View>
      </Animated.View>
    );
}

}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'flex-start',
  },
  image: {
    width: 35,
    height: 33,
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
    margin: 5,
  }, 
  TouchableOpacityNumber: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    height: '100%',
  }, 
  taskNumber: {
    padding: 2,
    fontSize: 20,
    alignSelf: 'center',
  },
  taskText: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    textAlign: 'left',
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
  },
});