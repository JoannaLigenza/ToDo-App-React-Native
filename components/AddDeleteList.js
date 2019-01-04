import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { background } from "./styles/commonStyles";

export default class AddDeleteList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            lists: this.props.screenProps.lists,
            inputText: '',
        }
    }
    static navigationOptions = {
        drawerLabel: 'Add/Delete List',
        drawerIcon: ({ tintColor }) => (
        <Image
            source={require('../world.png')}
            style={[ {tintColor: tintColor}]}
        />
        ),
    };

  render() {
      console.log("props adddelete", this.props, )
      console.log("state adddelete", this.state, )
      const lists = this.state.lists.map( (list, index) => {
          return <View key={index} style={styles.row}>
                    <Text style={styles.items} > {list} </Text>
                    <TouchableOpacity activeOpacity={1} style={styles.touchaleopacity} ><Text style={styles.text} >X</Text></TouchableOpacity>
                </View>
      })
      return(
          <View style={styles.container}> 
            <ScrollView style={[styles.modal, {backgroundColor: this.props.screenProps.primaryColor}]}>
                {lists}
            </ScrollView> 
            <View>
                <TextInput
                style={styles.textInput}
                onChangeText={(text) => this.setState({inputText: text})}
                maxLength = {50}>

                </TextInput>
            </View>
            <Button
                //onPress={() => this.props.navigation.goBack()}
                onPress={() => {this.props.navigation.goBack(); this.props.screenProps.setLists(this.state.lists)}} 
                title="Go back home"
            />
           
            <TouchableOpacity activeOpacity={1} style={[styles.color, {backgroundColor: this.state.choosenColor}]} >
            </TouchableOpacity>            
          </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: background,
        borderWidth: 2,
        borderColor: 'blue',
    },
    textInput: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray', 
        borderBottomWidth: 2,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 3,
        // borderWidth: 2,
        // borderColor: 'red',
    },
    touchaleopacity: {
        // borderWidth: 2,
        // borderColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: Dimensions.get('window').width - 80,
        height: 'auto',
        maxHeight: 300,
        padding: 3,
        margin: 20,
        alignSelf: 'center',
        textAlign: 'center',
        // borderWidth: 2,
        // borderColor: 'red',
        // position: 'absolute',
        // bottom: ((Dimensions.get('window').height - 200) / 2)- 50,
    },
    items: {
        //flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        margin: 2,
        padding: 8,
        borderRadius: 3,
        backgroundColor: background,
    },
})