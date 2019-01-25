import React, {Component} from 'react';
import {StyleSheet, Text, View, DatePickerAndroid, Dimensions, TouchableOpacity, Modal, ScrollView,} from 'react-native';
import {background, greyColor} from "./styles/commonStyles";

export default class FilterTasks extends Component {
    constructor() {
        super();
        this.state = {
            listModalVisibility: false,
            dateModalVisibility: false,
            priorityModalVisibility: false,
            choosenList: '',
            choosenDate: '',
            choosenPriority: '',
        }
    }

    setDateAndroid = async () => {
        try {
            const {action, year, month, day,} = await DatePickerAndroid.open({
                date: new Date(),
                mode: 'calendar',
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ choosenDate: `${day}/${month + 1}/${year}` });
                this.props.getTaskFilter('', this.state.choosenDate, ''); 
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    };
    
    render() {
        //console.log("this.state ", this.state)
        const list = this.props.lists.map( (list, index) => {
            return <Text key={index} style={this.state.choosenList[1] !== index ? (styles.items) : (styles.selectedItem) } 
            onPress={() => {this.setState({choosenList: [list , index]}) }}>{list}</Text>
        })
        return(
            <View style={styles.tabContainer}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => {this.setState({listModalVisibility: true})}} style={[styles.touchableOpacity, {backgroundColor: this.props.primaryColor}]}>
                    <Text style={[styles.text, this.props.taskFilter.lists === '' ? ({color: 'white'}) : ({color: '#2b2b2b'})]}>List</Text>
                    <Modal transparent={true} animationType="fade" visible={this.state.listModalVisibility} 
                        onRequestClose={() => {this.setState({listModalVisibility: false}) }}>
                        <TouchableOpacity activeOpacity={1} style={styles.aboveModal} onPress={() => {this.setState({listModalVisibility: false}) }}>
                            <View style={[styles.modal, {backgroundColor: this.props.primaryColor}]}>
                                <TouchableOpacity disabled={true}>
                                    <ScrollView>
                                        {list}
                                        {/* OnPress button wywoluje funkcje sortowania w main */}
                                        <TouchableOpacity activeOpacity={1} onPress={()=> {this.props.getTaskFilter(this.state.choosenList, '', ''); this.setState({listModalVisibility: false, choosenList: "", }) }} >
                                            <Text style={styles.text}>Save</Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </TouchableOpacity>
                            </View>  
                        </TouchableOpacity>                           
                    </Modal>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} onPress={() => {this.setDateAndroid(); this.setState({priorityModalVisibility: false });}} style={[styles.touchableOpacity, {backgroundColor: this.props.primaryColor}]}>
                    <Text style={[styles.text, this.props.taskFilter.date === '' ? ({color: 'white'}) : ({color: '#2b2b2b'})]}>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} onPress={() => {this.setState({priorityModalVisibility: true})}} style={[styles.touchableOpacity, {backgroundColor: this.props.primaryColor}]}>
                    <Text style={[styles.text, this.props.taskFilter.priority === '' ? ({color: 'white'}) : ({color: '#2b2b2b'})]}>Priority</Text>
                    <Modal transparent={true} animationType="fade" visible={this.state.priorityModalVisibility} 
                        onRequestClose={() => {this.setState({priorityModalVisibility: false}) }}>
                        <TouchableOpacity activeOpacity={1} style={styles.aboveModal} onPress={() => {this.setState({priorityModalVisibility: false}) }}>
                            <View style={[styles.modal, {backgroundColor: this.props.primaryColor}]}>
                                <TouchableOpacity disabled={true}>
                                    <ScrollView>
                                        <Text onPress={() => {this.setState({choosenPriority: 'None',}) }}   style={this.state.choosenPriority !== 'None' ? (styles.items) : (styles.selectedItem) }>None</Text>
                                        <Text onPress={() => {this.setState({choosenPriority: 'Low',}) }}    style={this.state.choosenPriority !== 'Low' ? (styles.items) : (styles.selectedItem) }>Low</Text>
                                        <Text onPress={() => {this.setState({choosenPriority: 'Middle',}) }} style={this.state.choosenPriority !== 'Middle' ? (styles.items) : (styles.selectedItem) }>Middle</Text>
                                        <Text onPress={() => {this.setState({choosenPriority: 'High',}) }}   style={this.state.choosenPriority !== 'High' ? (styles.items) : (styles.selectedItem) }>High</Text>
                                    </ScrollView>
                                    <TouchableOpacity activeOpacity={1} onPress={()=> {this.props.getTaskFilter('', '', this.state.choosenPriority); this.setState({priorityModalVisibility: false, choosenPriority: "" })}} >
                                            <Text style={styles.text}>Save</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </View>  
                        </TouchableOpacity>                           
                    </Modal>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        //flex: 1,
        flexDirection: 'row',
        height: 50,
        marginTop: 5,
        marginBottom: 5,
    },
    touchableOpacity: {
        //backgroundColor: colorPrimary,
        width: Dimensions.get('window').width / 3,
        height: 50, 
        borderColor: 'white',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        //color: 'white',
        padding: 10,
        textAlign: 'center',
    },
    aboveModal: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    modal: {
        //flex: 1,
        width: Dimensions.get('window').width - 80,
        height: 'auto',
        maxHeight: Dimensions.get('window').height - 60,
        padding: 3,
        margin: 20,
        alignSelf: 'center',
        textAlign: 'center',
        position: 'absolute',
    },
    items: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 2,
        padding: 8,
        borderRadius: 3,
        backgroundColor: background,
    },
    selectedItem: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 2,
        padding: 8,
        borderRadius: 3,
        backgroundColor: greyColor,
    },
})