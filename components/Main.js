import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, CheckBox, Button} from 'react-native';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state= { isChecked: true}
  }
  onPressLearnMore = () => {
    console.log("pressss")
  }
  render() {
    return (
      <View style={styles.component2}>
        <View style={styles.oneTask}>
          <CheckBox
            value={this.state.isChecked}
            onValueChange={() => this.setState({ isChecked: !this.state.isChecked })}
            style={styles.checkBox}
          />
          <Text style={styles.welcome}>Welcome Main! Welcome Mainuuuuuuuu! Welcome Main! Welcome Mainuuuuuuuu!</Text>
          <Button title="X" onPress={this.onPressLearnMore} style={styles.button}/>
        </View>
        <Text style={styles.welcome2}>Welcome Mainuuuuuuuu!</Text>
        <Text style={styles.welcome}>Welcome Main!</Text>
        
        
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
  checkBox: {
    
  },
  button: {
 
  },
});
