import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { background } from "./styles/commonStyles";

export default class AddDeleteList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            lists: this.props.screenProps.lists,
            inputText: '',
            addListInfo: '',
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

    handleDeleteList = (dispatchList) => {
        const newLists = this.state.lists.filter( list => {
            return list !== dispatchList
        })
        this.setState({ lists: newLists })
        this.props.screenProps.setDeletedList(dispatchList)
    }

    handleAddList = () => {
        if (this.state.inputText === '') {return}
        const isListExist = []
        this.state.lists.map( list => {
            if (list === this.state.inputText) {
                this.setState({ addListInfo: 'This list already exist!', })
                isListExist.push(list)
            }
        })
        if (isListExist.length > 0) { return }
        const newTasks = [...this.state.lists, this.state.inputText]
        this.setState({ lists: newTasks, inputText: '', addListInfo: '' })
    }

  render() {
      const lists = this.state.lists.map( (list, index) => {
          return <View key={index} style={styles.row}>
                    <Text style={styles.items} > {list} </Text>
                    <TouchableOpacity activeOpacity={1} style={styles.touchaleopacity} >
                        <Text style={[styles.button, styles.xButton]} onPress={() => {this.handleDeleteList(list)} } >X</Text>
                    </TouchableOpacity>
                </View>
      })
      return(
          <View style={[styles.containerAll, {backgroundColor: this.props.screenProps.primaryColor}]}> 
            <View style={styles.row}>
                <View style={{ width: '65%',}}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({inputText: text})}
                        multiline = {false}
                        maxLength = {40}
                        defaultValue={this.state.inputText} >

                    </TextInput>
                    <View style={{height: 20, backgroundColor: background}}>
                        <Text style={styles.text}> {this.state.addListInfo} </Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={this.handleAddList} >
                    <Text style={[styles.button, styles.addTaskButton, {backgroundColor: this.props.screenProps.primaryColor}]}> Add List </Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.csrollViewContainer, {backgroundColor: this.props.screenProps.primaryColor}]} >
                <ScrollView style={[styles.scrollView, {backgroundColor: this.props.screenProps.primaryColor}]}>
                    {lists}
                    <View style={{height: 15}}></View>
                </ScrollView> 
            </View>
            
            <TouchableOpacity activeOpacity={1} 
                onPress={() => {this.props.navigation.goBack(); this.props.screenProps.setLists(this.state.lists);
                                this.props.screenProps.setDeletedList('') }} >
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
    // csrollViewContainer: {
    //     padding: 20,
    // },
    scrollView: {
        width: Dimensions.get('window').width - 10,
        height: 'auto',
        maxHeight: Dimensions.get('window').height - 280,
        padding: 2,
        margin: 10,
        alignSelf: 'center',
        textAlign: 'center',
        // borderWidth: 2,
        // borderColor: 'red',
        // position: 'absolute',
        // bottom: ((Dimensions.get('window').height - 200) / 2)- 50,
    },
    row: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: background,
        height: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 3,
        borderColor: 'gray', 
        borderBottomWidth: 1,
        // borderWidth: 2,
        // borderColor: 'blue',
    },
    items: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        margin: 0,
        padding: 8,
        backgroundColor: background,
    },
    textInput: {
        ///width: 200,
        //height: 50,
        marginLeft: 10,
        marginRight: 5,
        marginBottom: 30,
        borderColor: 'gray', 
        borderBottomWidth: 2,
        // borderWidth: 2,
        // borderColor: 'red',
    },
    touchaleopacity: {
        // borderWidth: 2,
        // borderColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 3,
        // borderWidth: 2,
        // borderColor: 'red',
    },
    xButton: {
        width: 50,
        margin: 3,
        paddingRight: 10,
        paddingLeft: 10,
    },
    addTaskButton: {
        width: 'auto',
        marginRight: 10,
        marginTop: 15,
        padding: 10,
        borderRadius: 3,
    },
    goBackButton: {
        padding: 15,
        margin: 10,
        marginTop: 25,
        marginBottom: 25,
        backgroundColor: background,
    },
    
})