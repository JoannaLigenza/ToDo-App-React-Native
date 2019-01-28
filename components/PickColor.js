import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TouchableHighlight, Dimensions} from 'react-native';
import { background, darkGreyColor } from "./styles/commonStyles";

export default class PickColor extends Component {
    constructor(props) {
        super(props);
        this.state= {
            choosenColor: this.props.screenProps.primaryColor, 
        }
    }
    static navigationOptions = {
        drawerLabel: 'App Color',
        drawerIcon: ({ tintColor }) => (
        <Image
            source={require('../img/world.png')}
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
          <View style={[styles.containerAll, {backgroundColor: this.props.screenProps.primaryColor}]}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableHighlight underlayColor={'rgba(0,0,0,0.4)'} onPress={() => {this.props.navigation.goBack()}}
                                    style={styles.touchableHighlight}>
                    <Image source={require('../img/arrow.png')} ></Image>
                </TouchableHighlight>
                <Text style={[styles.textColor, {margin: 15}]}>
                    Change color of Your App:
                </Text>
            </View>
            <ScrollView >
                <View style={[styles.contentContainer ]}>
                    <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: '#fec538', borderColor: (this.state.choosenColor === '#fec538') ? (darkGreyColor) : ('#fec538') }]}
                        onPress={() => {this.setAppColor('#fec538'); }}>
                        <Text style={styles.textColor} >Orange</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: '#75ff5a', borderColor: (this.state.choosenColor === '#75ff5a') ? (darkGreyColor) : ('#75ff5a') }]}
                        onPress={() => {this.setAppColor('#75ff5a');  }}>
                        <Text style={styles.textColor} >Light Green</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: '#0ccd43', borderColor: (this.state.choosenColor === '#0ccd43') ? (darkGreyColor) : ('#0ccd43') }]}
                        onPress={() => {this.setAppColor('#0ccd43');  }}>
                        <Text style={styles.textColor} >Dark Green</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: '#83b5ff', borderColor: (this.state.choosenColor === '#83b5ff') ? (darkGreyColor) : ('#83b5ff') }]}
                        onPress={() => {this.setAppColor('#83b5ff');  }}>
                        <Text style={styles.textColor} >Light Blue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: '#2196f3', borderColor: (this.state.choosenColor === '#2196f3') ? (darkGreyColor) : ('#2196f3') }]}
                        onPress={() => {this.setAppColor('#2196f3');  }}>
                        <Text style={styles.textColor} >Dark Blue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: '#d267f1', borderColor: (this.state.choosenColor === '#d267f1') ? (darkGreyColor) : ('#d267f1') }]}
                        onPress={() => {this.setAppColor('#d267f1');  }}>
                        <Text style={styles.textColor} >Lila</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: 'red', borderColor: (this.state.choosenColor === 'red') ? (darkGreyColor) : ('red') }]}
                        onPress={() => {this.setAppColor('red');  }}>
                        <Text style={styles.textColor} >Red</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
            <TouchableOpacity activeOpacity={0.85} 
                onPress={() => {this.props.navigation.goBack(); this.props.screenProps.setPrimaryColor(this.state.choosenColor)}} >
                <Text style={[styles.button, styles.goBackButton]} >Save</Text>
            </TouchableOpacity>
                   
          </View>
      )
  }
}

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
    },
    touchableHighlight: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems:'center',
        justifyContent:'center',
        margin: 7,
    },
    contentContainer: {
        height: 'auto',
        backgroundColor: background,
        alignItems: 'stretch',
    },
    color: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        margin: 5,
        padding: 12,
        borderRadius: 50,
        borderWidth: 3,
    },
    textColor: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 3,
        // borderWidth: 2,
        // borderColor: 'red',
    },
    goBackButton: {
        padding: 15,
        margin: 10,
        marginTop: 25,
        marginBottom: 25,
        backgroundColor: background,
    },
})