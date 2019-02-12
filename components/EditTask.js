import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, TextInput, View, DatePickerAndroid, Dimensions, TouchableOpacity, Modal, ScrollView} from 'react-native';
import {background} from "./styles/commonStyles";

export default class EditTask extends PureComponent {
    constructor() {
        super();
        this.state = { 
            inputText: '',
            choosenList: '',
            choosenPriority: '',
            choosenDate: '',
            isChecked: '',
            listModalVisibility: false,
            priorityModalVisibility: false,
            note: '',
        }
    }
    static navigationOptions = ({ navigation }) => {
        return { 
            title: 'Edit Task',
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
    handleEditTask = () => {
        const key = this.props.navigation.state.params.task.key
        let height = this.props.navigation.state.params.task.height
        this.props.navigation.state.params.handleEditTask({key: key, text: this.state.inputText, isChecked: this.state.isChecked, list: this.state.choosenList, priority: this.state.choosenPriority, date: this.state.choosenDate, note: this.state.note, height: height})
    }

    componentDidMount() {
        this.setState({ 
            inputText: this.props.navigation.state.params.task.text,
            choosenList: this.props.navigation.state.params.task.list,
            choosenPriority: this.props.navigation.state.params.task.priority,
            choosenDate: this.props.navigation.state.params.task.date,
            isChecked: this.props.navigation.state.params.task.isChecked,
            note: this.props.navigation.state.params.task.note,
         })
    }

    render() {
        //console.log('edit task')
        const list = this.props.screenProps.lists.map( list => {
            return <Text key={list} style={styles.select} onPress={() => {this.setState({choosenList: list, listModalVisibility: false}) }}>{list}</Text>
        })
            
        return (
            <View style={{flex: 1}} >
                <ScrollView style={{flex: 1}} >
                    <View style={styles.textInputArea}>
                        <Text style={styles.text}>Edit Task:</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({inputText: text})}
                            defaultValue={this.props.navigation.state.params.task.text}
                            editable = {true}
                            multiline = {false}
                            maxLength = {200}
                            //NumberOfLines = {4}
                            //autoFocus = {true}
                        />
                    </View>

                    <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({listModalVisibility: true})}} style={[styles.touchableOpacity, {borderColor: this.props.screenProps.primaryColor}]}>
                        <Text style={styles.text}>List:</Text>
                        <Text style={styles.textUnder}>
                          {this.state.choosenList === '' ? (this.props.navigation.state.params.task.list) : (this.state.choosenList)}
                        </Text>
                        <Modal transparent={true} animationType="fade" visible={this.state.listModalVisibility} 
                                onRequestClose={() => {this.setState({listModalVisibility: false}) }}>
                            <TouchableOpacity activeOpacity={1} style={styles.aboveModal} onPress={() => {this.setState({listModalVisibility: false}) }}>
                                <View style={[styles.modal, {backgroundColor: this.props.screenProps.primaryColor, width: Dimensions.get('window').width - 80, maxHeight: Dimensions.get('window').height - 60}]}>
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
                        <Text style={styles.textUnder} >
                          {this.state.choosenDate === '' ? (this.props.navigation.state.params.task.date) : (this.state.choosenDate)}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({priorityModalVisibility: true})}} style={[styles.touchableOpacity, {borderColor: this.props.screenProps.primaryColor}]}>
                        <Text style={styles.text}>Priority:</Text>
                        <Text style={styles.textUnder} >
                          {this.state.choosenPriority === '' ? (this.props.navigation.state.params.task.priority) : (this.state.choosenPriority)}
                        </Text>
                        <Modal transparent={true} animationType="fade" visible={this.state.priorityModalVisibility} 
                                onRequestClose={() => {this.setState({priorityModalVisibility: false}) }}>
                            <TouchableOpacity activeOpacity={1} style={styles.aboveModal} onPress={() => {this.setState({priorityModalVisibility: false}) }}>
                                <View style={[styles.modal, {backgroundColor: this.props.screenProps.primaryColor, width: Dimensions.get('window').width - 80, maxHeight: Dimensions.get('window').height - 60 }]}>
                                    <TouchableOpacity disabled={true}>
                                        <ScrollView>
                                            <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'None',priorityModalVisibility: false}) }}>None</Text>
                                            <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'Low', priorityModalVisibility: false}) }}>Low</Text>
                                            <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'Middle', priorityModalVisibility: false}) }}>Middle</Text>
                                            <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'High', priorityModalVisibility: false}) }}>High</Text>
                                        </ScrollView>
                                    </TouchableOpacity>
                                </View>  
                            </TouchableOpacity>                           
                        </Modal>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({isChecked: !this.state.isChecked})}} style={[styles.touchableOpacity, {borderColor: this.props.screenProps.primaryColor}]}>
                        <Text style={styles.text}>Status:</Text>
                        <Text style={styles.textUnder} >
                          {this.state.isChecked ? ('Done') : ('In Progress')}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.textInputArea}>
                        <Text style={styles.text}>Notes:</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({note: text})}
                            defaultValue={this.props.navigation.state.params.task.note}
                            editable = {true}
                            multiline = {true}
                            maxLength = {200}
                        />
                    </View>
                    <View style={{height: 100}}></View>
                    
                </ScrollView>
                <TouchableOpacity activeOpacity={0.8} style={[styles.addButton, { backgroundColor: this.props.screenProps.primaryColor}]}
                    onPress={() => {this.handleEditTask(this.props.navigation.state.params.index); 
                    this.props.navigation.goBack(); } }>
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
    aboveModal: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    modal: {
        height: 'auto',
        padding: 3,
        margin: 20,
        alignSelf: 'center',
        textAlign: 'center',
        position: 'absolute',
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
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: 50, 
  },
})