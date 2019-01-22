import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, DatePickerAndroid, Dimensions, TouchableOpacity, Modal, ScrollView} from 'react-native';
import {colorPrimary, colorSecondary, background} from "./styles/commonStyles";

export default class AddTask extends Component {
    constructor() {
        super();
        this.state = { 
            inputText: '',
            choosenList: 'Default',
            choosenPriority: 'None',
            choosenDate: 'Choose Date',
            modalVisible1: false,
            modalVisible2: false,
            note: '',
        }
    }

    static navigationOptions = ({ navigation }) => {
        //console.log(" add Task props " , navigation.state.params.primaryColor  )
        return { 
            title: 'Add Task',
            headerStyle: { backgroundColor: navigation.state.params.primaryColor, height: 55, shadowRadius: 0, },
        }
    };
    setDateAndroid = async () => {
        try {
            const {action, year, month, day,} = await DatePickerAndroid.open({
                date: new Date(),
                mode: 'calendar',
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ choosenDate: `${day}/${month + 1}/${year}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    };
    handleAddTask = () => {
        const key = (Number(this.props.navigation.state.params.taskKey) + 1).toString()
        this.props.navigation.state.params.changetaskKey(key)
        this.props.navigation.state.params.addTask({key: key, text: this.state.inputText, isChecked: false, list: this.state.choosenList, priority: this.state.choosenPriority, date: this.state.choosenDate, note: this.state.note, height: '' })
    }

    render() {
        //console.log("this.state.add.tasks ", this.state.tasks)
        const list = this.props.screenProps.lists.map( list => {
            return <Text key={list} style={styles.select} onPress={() => {this.setState({choosenList: list, modalVisible1: false}) }}>{list}</Text>
        })
            
        return (
            <View style={{flex: 1}} >
                <ScrollView style={{flex: 1}} >
                    <View style={styles.textInputArea}>
                        <Text style={styles.text}>New Task:</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({inputText: text})}
                            //value={this.state.text}
                            multiline = {true}
                            maxLength = {200}
                            //NumberOfLines = {4}
                            //autoFocus = {true}
                        />
                    </View>

                    <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({modalVisible1: true})}} style={[styles.touchableOpacity, {borderColor: this.props.screenProps.primaryColor}]}>
                        <Text style={styles.text}>List:</Text>
                        <Text style={styles.textUnder}>{this.state.choosenList}</Text>
                        <Modal transparent={true} animationType="fade" visible={this.state.modalVisible1} 
                                onRequestClose={() => {this.setState({modalVisible1: false}) }}>
                            <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => {this.setState({modalVisible1: false}) }}>
                                <View style={[styles.modal, {backgroundColor: this.props.screenProps.primaryColor}]}>
                                    <TouchableOpacity disabled={true}>
                                        <ScrollView>
                                            {list}
                                        </ScrollView>
                                    </TouchableOpacity>
                                </View>  
                            </TouchableOpacity>                           
                        </Modal>
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={1} onPress={() => {this.setDateAndroid()}} style={[styles.touchableOpacity, {borderColor: this.props.screenProps.primaryColor}]}>
                        <Text style={styles.text}>Date:</Text>
                        <Text style={styles.textUnder} >{this.state.choosenDate}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({modalVisible2: true})}} style={[styles.touchableOpacity, {borderColor: this.props.screenProps.primaryColor}]}>
                        <Text style={styles.text}>Priority:</Text>
                        <Text style={styles.textUnder}>{this.state.choosenPriority}</Text>
                        <Modal transparent={true} animationType="fade" visible={this.state.modalVisible2} 
                                onRequestClose={() => {this.setState({modalVisible2: false}) }}>
                            <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => {this.setState({modalVisible2: false}) }}>
                                <View style={[styles.modal, {backgroundColor: this.props.screenProps.primaryColor}]}>
                                    <TouchableOpacity disabled={true}>
                                        <ScrollView>
                                            <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'None',modalVisible2: false}) }}>None</Text>
                                            <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'Low', modalVisible2: false}) }}>Low</Text>
                                            <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'Middle', modalVisible2: false}) }}>Middle</Text>
                                            <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'High', modalVisible2: false}) }}>High</Text>
                                        </ScrollView>
                                    </TouchableOpacity>
                                </View>  
                            </TouchableOpacity>                           
                        </Modal>
                    </TouchableOpacity>

                    <View style={styles.textInputArea}>
                        <Text style={styles.text}>Notes:</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({note: text})}
                            //value={this.state.text}
                            multiline = {true}
                            maxLength = {200}
                            NumberOfLines = {2}
                        />
                    </View>
                    <View style={{height: 100}}></View>
                    
                </ScrollView>
                <TouchableOpacity activeOpacity={1} style={[styles.addButton, { backgroundColor: this.props.screenProps.primaryColor}]}
                    onPress={() => {this.props.navigation.goBack(); this.handleAddTask() } }>
                    {/* this.props.screenProps.addTask({key: '10', text: this.state.inputText, isChecked: false, list: this.state.choosenList, priority: this.state.choosenPriority, Date: this.state.choosenDate }) }}> */}
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInputArea: {
        padding: 5,
    },
    textInput: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray', 
        borderBottomWidth: 2,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 3,
    },
    textUnder: {
        fontSize: 16,
        margin: 3,
        marginLeft: 7,
        marginBottom: 0,
        padding: 3,
        textAlign: 'left',
    },
    touchableOpacity: {
        borderBottomWidth: 2,
        borderTopWidth: 1,
        padding: 3,
        margin: 10,
    },
    modal: {
        width: Dimensions.get('window').width - 80,
        height: 'auto',
        maxHeight: 300,
        padding: 3,
        margin: 20,
        alignSelf: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: ((Dimensions.get('window').height - 200) / 2)- 50,
    },
    select: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 2,
        padding: 8,
        backgroundColor: background,
        borderRadius: 3,
    },
    addButton: {
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width: 80,
        height: 80,
        margin: 0,
        padding: 0,
        elevation: 6,
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: 50, 
  },
})