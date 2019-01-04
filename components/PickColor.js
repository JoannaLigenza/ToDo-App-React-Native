import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';

export default class PickColor extends Component {
    constructor(props) {
        super(props);
        this.state= {
            choosenColor: '#fec538',        // read from data base
        }
    }
    static navigationOptions = {
        drawerLabel: 'App Color',
        drawerIcon: ({ tintColor }) => (
        <Image
            source={require('../world.png')}
            style={[ {tintColor: tintColor}]}
        />
        ),
    };

  setAppColor = (color) => {
      this.setState({ choosenColor: color });
  }  

  render() {
      //console.log("props", this.props)
      return(
          <View>
            <Text>
                Pick color of Your App:
            </Text>
            <View style={styles.colorContainer }>
                <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: '#fec538'}]}
                    onPress={() => {this.setAppColor('#fec538');  }}>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: '#75ff5a'}]}
                    onPress={() => {this.setAppColor('#75ff5a');  }}>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: '#0ccd43'}]}
                    onPress={() => {this.setAppColor('#0ccd43');  }}>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: '#83b5ff'}]}
                    onPress={() => {this.setAppColor('#83b5ff');  }}>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: '#2196f3'}]}
                    onPress={() => {this.setAppColor('#2196f3');  }}>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: '#d267f1'}]}
                    onPress={() => {this.setAppColor('#d267f1');  }}>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: 'red'}]}
                    onPress={() => {this.setAppColor('red');  }}>
                </TouchableOpacity>
            </View>
            
            <Button
                //onPress={() => this.props.navigation.goBack()}
                onPress={() => {this.props.navigation.goBack(); this.props.screenProps.setPrimaryColor(this.state.choosenColor)}} 
                title="Go back home"
            />
           
            <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: this.state.choosenColor}]} >
            </TouchableOpacity>            
          </View>
      )
  }
}

const styles = StyleSheet.create({
    colorContainer: {
        flexDirection: 'row',
    },
    color: {
        width: 50,
        height: 50,
        borderRadius: 50,
    }
})