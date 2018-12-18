import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Picker, DatePickerAndroid, Dimensions, TouchableOpacity, Modal, ScrollView} from 'react-native';

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
            return <Text key={list} style={styles.select} onPress={() => {this.setState({choosenPriority: list, modalVisible1: false}) }}>{list}</Text>
            {/* <Picker.Item key={list} label={list} value={list} /> */}
        
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
                {/* <Picker
                    selectedValue={this.state.choosenList}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => this.setState({choosenList: itemValue})}>
                    {list}
                </Picker> */}
                <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({modalVisible1: true})}} style={styles.touchableOpacity}>
                    <Text style={styles.text}>List:</Text>
                    <Text style={styles.textUnder}>{this.state.choosenList}</Text>
                    <Modal transparent={true} animationType="fade" visible={this.state.modalVisible1} 
                            onRequestClose={() => {this.setState({modalVisible1: false}) }}>
                        <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => {this.setState({modalVisible1: false}) }}>
                            <View style={styles.modal}>
                                <TouchableOpacity disabled={true}>
                                    <ScrollView>
                                        {list}
                                        {/* <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'None',modalVisible: false}) }}>None</Text>
                                        <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'Low', modalVisible: false}) }}>Low</Text>
                                        <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'Middle', modalVisible: false}) }}>Middle</Text>
                                        <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'High', modalVisible: false}) }}>High</Text> */}
                                    </ScrollView>
                                
                                </TouchableOpacity>
                            </View>  
                        </TouchableOpacity>                           
                    </Modal>
                </TouchableOpacity>
                
                
                <TouchableOpacity activeOpacity={1} onPress={() => {this.setDateAndroid()}} style={styles.touchableOpacity}>
                    <Text style={styles.text}>Date:</Text>
                    <Text style={styles.textUnder} >{this.state.choosenDate}</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({modalVisible2: true})}} style={styles.touchableOpacity}>
                    <Text style={styles.text}>Priority:</Text>
                    <Text style={styles.textUnder}>{this.state.choosenPriority}</Text>
                    <Modal transparent={true} animationType="fade" visible={this.state.modalVisible2} 
                            onRequestClose={() => {this.setState({modalVisible2: false}) }}>
                        <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => {this.setState({modalVisible2: false}) }}>
                            <View style={styles.modal}>
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
    textUnder: {
        fontSize: 16,
        margin: 5,
        marginLeft: 8,
        padding: 5,
        textAlign: 'left',
    },
    touchableOpacity: {
        backgroundColor: 'rgba(216, 216, 216, 0.5)',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
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
        height: 'auto',
        maxHeight: 300,
        padding: 3,
        margin: 20,
        alignSelf: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: ((Dimensions.get('window').height - 200) / 2)- 50,
        backgroundColor: 'yellow',
    },
    select: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 2,
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 3,
    },
})