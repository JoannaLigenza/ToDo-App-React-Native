import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, CheckBox, Button, TouchableOpacity} from 'react-native';
import ModalExample from './Modal'


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state= { isChecked: false, modalVisible: false}
  }
  onPressLearnMore = () => {
    console.log("pressss")
  }
  showModal = () => {
    this.setState( {modalVisible: !this.state.modalVisible})
    console.log("aaas sss")
  }
  handleInput = () => {
    this.setState({ isChecked: !this.state.isChecked })
    console.log("isChecked ", this.state.isChecked)
  }
  render() {
    return (
      <View style={styles.component2}>
        <View style={styles.oneTask}>
          <CheckBox
            value={this.state.isChecked}
            onValueChange={this.handleInput}
            style={styles.checkBox}
          />
          <TouchableOpacity style={styles.welcome} onPress={this.showModal}>
            <ModalExample modalVisible={this.state.modalVisible} showModal={this.showModal}
              style={styles.modalAnimation}>
              <View>
                <Text style={styles.welcome} >
                  Welcome Main! Welcome Mainuuuuuuuu! Welcome Main! Welcome Mainuuuuuuuu!
                </Text>
              </View>
            </ModalExample>
          </TouchableOpacity>
          <Button title="X" onPress={this.onPressLearnMore} style={styles.button}/>
        </View>
        <Text style={styles.welcome2}>Welcome Mainuuuuuuuu!</Text>
        <Text style={styles.welcome2}>Welcome </Text>
        
        
        
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
