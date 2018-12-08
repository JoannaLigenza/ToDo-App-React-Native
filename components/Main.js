import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, CheckBox, Button, TouchableOpacity, FlatList} from 'react-native';
import ModalExample from './Modal'


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state= { isChecked: false, modalVisible: false,
                  tasks: [
            {key: '1', text: 'Zrobić pranie', isChecked: false},
            {key: '2', text: 'Kupić zakupy', isChecked: true},
            {key: '3', text: 'Pokodować jutro', isChecked: false},
            {key: '4', text: 'Tralalala', isChecked: false},
            {key: '5', text: 'John', isChecked: false},
            {key: '6', text: 'Jillian', isChecked: false},
            {key: '7', text: 'I coś jeszcze', isChecked: false},
            {key: '8', text: 'Obejrzeć czekoladki do kupienia', isChecked: false}, 
            ] }
  }
  onPressLearnMore = () => {
    console.log("pressss")
  }
  showModal = () => {
    this.setState( {modalVisible: !this.state.modalVisible})
    console.log("aaas sss")
  }
  handleInput = (value) => {
    console.log("najpierw ", value); 
    this.setState({ isChecked: !this.state.isChecked })
    console.log("teraz ", this.state.isChecked) 
    // const newState = this.state.tasks.map( task => {
    //   if(task.key === key) {
    //     console.log("zadanie ", task.isChecked)
    //     task.isChecked = !task.isChecked
    //     console.log("zadanie 2 ", task.isChecked)
    //     return task
    //   }
    //   return task
    // })
    // this.setState({ tasks: newState })
    // console.log("newState ", newState)
  }
  handleInput2 = (key, value) => {
    console.log("najpierw ", value); 
    const newState = this.state.tasks.map( task => {
      if(task.key === key) {
        console.log("zadanie ", task.isChecked)
        task.isChecked = !task.isChecked
        console.log("zadanie 2 ", task.isChecked)
        return task
      }
      return task
    })
    this.setState({ tasks: newState })
    //console.log("teraz ", this.state.isChecked) 
    // console.log("newState ", newState)
  }
  render() {
    console.log("zazn ", this.state.isChecked)
    return (
      <View style={styles.component2}>       
        <View>
          <CheckBox
              //checked={item.isChecked}
              checked={this.state.isChecked}
              value={this.state.isChecked}
              onValueChange={ () => {this.handleInput() }}
              style={styles.checkBox}
            />
            <Button title="press" onPress={() => {console.log("state ", this.state.isChecked)}}></Button>
        </View>
        
        <FlatList
          data={this.state.tasks}
          renderItem={({item}) => 
          <View style={styles.oneTask}>
            <CheckBox
              //checked={item.isChecked}
              checked={this.state.isChecked}
              value={this.state.isChecked}
              onValueChange={ (value) => {this.handleInput2(item.key, value)} }
              style={styles.checkBox}
            />
            <TouchableOpacity style={styles.welcome} onPress={this.showModal}>
                  <Text style={styles.welcome} >
                    {item.text}
                  </Text>
            </TouchableOpacity>
            <Button title="X" onPress={this.onPressLearnMore} style={styles.button}/>
          </View>}
        />

        <ModalExample modalVisible={this.state.modalVisible} showModal={this.showModal}
              style={styles.modalAnimation}></ModalExample>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  component2: {
    // flex: 5,
    //justifyContent: 'center',
    alignItems: 'stretch',
    //alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderColor: 'blue',
  },
  welcome: {
    flex: 1,
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
    backgroundColor: 'blue',
  }, 
  welcome2: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
    backgroundColor: 'purple',
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
