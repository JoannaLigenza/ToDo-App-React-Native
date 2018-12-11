import React, {Component} from 'react';
import {StyleSheet, Text, View, CheckBox, Button, TouchableHighlight, FlatList} from 'react-native';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state= { isChecked: false,
                  tasks: [
            {key: '1', text: 'Zrobić pranie', isChecked: false},
            {key: '2', text: 'Kupić zakupy', isChecked: true},
            {key: '3', text: 'Pokodować jutro', isChecked: false},
            {key: '4', text: 'Tralalala', isChecked: false},
            {key: '5', text: 'John', isChecked: false},
            {key: '6', text: 'Jillian', isChecked: false},
            {key: '7', text: 'I coś jeszcze', isChecked: false},
            
            ] }
  }
  onPressLearnMore = () => {
    console.log("pressss")
  }
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
  render() {
    return (
      <View style={styles.component2}>               
        <FlatList
          data={this.state.tasks}
          renderItem={({item}) => 
          <View style={styles.oneTask}>
            <CheckBox
              //checked={item.isChecked}
              checked={item.isChecked}
              value={item.isChecked}
              onValueChange={ () => {this.handleInput(item.key)} }
              style={styles.checkBox}
            />
            <TouchableHighlight style={styles.TouchableHighlight} onPress={this.props.editTask}>
                  <Text style={styles.welcome} >
                    {item.text}
                  </Text>
            </TouchableHighlight>
            <Button title="X" onPress={this.onPressLearnMore} style={styles.button}/>
          </View>}
        />  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component2: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
    //alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderColor: 'blue',
  },
  welcome: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    textAlign: 'left',
    backgroundColor: 'blue',
    borderRadius: 4,
  }, 
  TouchableHighlight: {
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
    backgroundColor: 'white',
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
  modalAnimation: {
    
  }
});
