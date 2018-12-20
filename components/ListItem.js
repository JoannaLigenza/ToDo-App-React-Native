import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, CheckBox, TouchableOpacity, PanResponder, UIManager, Dimensions} from 'react-native';
import {colorPrimary, colorSecondary, background} from "./styles/commonStyles";


export default class ListItem extends Component {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);  // animated Views settings
    this.state= { 
            pan: new Animated.ValueXY(),      //Step 1
    };
    this.panResponder = PanResponder.create({    //Step 2
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (evt, gestureState) => {       //Step 3
        return Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y} ])(evt, gestureState)
      },
      onPanResponderRelease: (evt, gestureState) => {        //Step 4
            console.log("pos ", gestureState.dx, evt.target)
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
                    this.success(this.props.taskKey)
                    // something here
                });
              }  
      } 
    });
  }

    success(key) {
        const newTasks = this.props.allTasks.filter(task => task.key !== key);
        this.props.handleDeleteTask(newTasks)
    }

  render() {
      //console.log("this.props ", this.props)
    return (
        <Animated.View style={[styles.oneTask, this.state.pan.getLayout()]} {...this.panResponder.panHandlers} >
            <CheckBox
                  //checked={item.isChecked}
                  checked={this.props.isChecked}
                  value={this.props.isChecked}
                  onValueChange={ () => {this.props.handleInput(this.props.taskKey)} }
                  //style={styles.checkBox}
            />
            <TouchableOpacity activeOpacity={1} style={styles.TouchableOpacity} 
                onPress={this.props.editTask }>
                <Text style={this.props.isChecked ? (styles.taskTextDone) : (styles.taskText) } >
                    {this.props.text}
                </Text>
            </TouchableOpacity>
            <View style={styles.button}><Text>.....</Text></View>
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
});
