import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Picker, DatePickerAndroid, Dimensions, TouchableOpacity, Modal} from 'react-native';

export default class AddTask extends Component {
    constructor() {
        super();
        this.state = { 
            inputText: '',
            choosenList: 'Default',
            choosenPriority: 'None',
            choosenDate: 'Choose Date',
            modalVisible: false,
        }
    }
    static navigationOptions = ({ navigation }) => {
        return { 
            title: 'Add Task',
        }
    };
    handleInput = (e) => {
        e.target.value
    }
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
    render() {
        console.log("this.state ", this.state)
        //console.log("this.props ", this.props.screenProps.lists)
        const list = this.props.screenProps.lists.map( list => {
            return <Picker.Item key={list} label={list} value={list} />
        
        })
        
            
        return (
            <View style={{marginTop: 10}}>
                <Text style={styles.text}>New Task:</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({inputText: text})}
                    value={this.state.text}
                    multiline = {true}
                    maxLength = {200}
                    //numberOfLines = {4}
                    autoFocus = {true}
                />

                <Text style={styles.text}>List:</Text>
                <Picker
                    selectedValue={this.state.choosenList}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => this.setState({choosenList: itemValue})}>
                    {list}
                </Picker>
                
                <Text style={styles.text}>Date:</Text>
                <TouchableOpacity activeOpacity={1} onPress={() => {this.setDateAndroid()}} style={styles.touchableOpacity}>
                    <Text style={{textAlign: 'left', padding: 5, fontSize: 16,}} >{this.state.choosenDate}</Text>
                    
                </TouchableOpacity>
                <Text style={styles.text}>Priority:</Text>
                <View style={styles.pickerView}>
                    <Picker
                        selectedValue={this.state.choosenPriority}
                        style={styles.picker}
                        itemStyle={{ backgroundColor: "grey" }}
                        onValueChange={(itemValue, itemIndex) => this.setState({choosenPriority: itemValue})}>
                        <Picker.Item key={"1"} label="None" value="None" color={'black'} />
                        <Picker.Item key={"2"} label="Low" value="Low" color={'yellow'}/>
                        <Picker.Item key={"3"} label="Middle" value="Middle" color={'orange'}/>
                        <Picker.Item key={"4"} label="High" value="High" color={'red'}/>
                    </Picker>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({modalVisible: true})}} style={styles.touchableOpacity}>
                    <Text style={styles.text}>Priority:</Text>
                    <Text>{this.state.choosenPriority}</Text>
                    <Modal transparent={true} animationType="fade" visible={this.state.modalVisible} 
                            onRequestClose={() => {this.setState({modalVisible: false}) }}>
                        <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => {this.setState({modalVisible: false}) }}>
                            <View style={styles.modal}>
                                <TouchableOpacity disabled={true}>
                                {/* <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({modalVisible: false})}} style={styles.touchableOpacity}> */}
                                <Text style={styles.text} onPress={() => {this.setState({choosenPriority: 'None',modalVisible: false}) }}>None</Text>
                                <Text style={styles.text} onPress={() => {this.setState({choosenPriority: 'Low', modalVisible: false}) }}>Low</Text>
                                <Text style={styles.text} onPress={() => {this.setState({choosenPriority: 'Middle', modalVisible: false}) }}>Middle</Text>
                                <Text style={styles.text} onPress={() => {this.setState({choosenPriority: 'High', modalVisible: false}) }}>High</Text>
                                </TouchableOpacity>
                            </View>  
                        </TouchableOpacity>                           
                    </Modal>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        //height: 40, 
        borderColor: 'gray', 
        borderBottomWidth: 2,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,
    },
    touchableOpacity: {
        backgroundColor: 'rgba(216, 216, 216, 0.5)',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    pickerView: {
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    picker: {
        maxWidth: Dimensions.get('window').width,
        //height: 25,
        padding: 25,
        // borderStyle: 'solid',
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderBottomColor: 'grey'
        //fontSize: 16,
    },
    modal: {
        //flex: 1,
        width: Dimensions.get('window').width - 80,
        height: 200,
        padding: 20,
        margin: 20,
        alignSelf: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: ((Dimensions.get('window').height - 200) / 2)- 50,
        backgroundColor: 'yellow',
    },
})