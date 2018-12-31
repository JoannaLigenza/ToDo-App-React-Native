import React, {Component} from 'react';
import {StyleSheet, Text, View, DatePickerAndroid, Dimensions, TouchableOpacity, Modal, ScrollView,} from 'react-native';
import {colorPrimary, colorSecondary, background} from "./styles/commonStyles";

export default class FilterTasks extends Component {
    constructor() {
        super();
        this.state = {
            listModalVisibility: false,
            dateModalVisibility: false,
            priorityModalVisibility: false,
            choosenList: 'Default',
            choosenDate: '',
            choosenPriority: 'None',
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
        const list = this.props.lists.map( list => {
            return <Text key={list} style={styles.select} onPress={() => {this.setState({choosenList: list}) }}>{list}</Text>
        })
        return(
            <View style={styles.tabContainer}>
                <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({listModalVisibility: true})}} style={styles.touchableOpacity}>
                    <Text style={styles.text}>List</Text>
                    <Modal transparent={true} animationType="fade" visible={this.state.listModalVisibility} 
                        onRequestClose={() => {this.setState({listModalVisibility: false}) }}>
                        <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => {this.setState({listModalVisibility: false}) }}>
                            <View style={styles.modal}>
                                <TouchableOpacity disabled={true}>
                                    <ScrollView>
                                        {list}
                                        {/* OnPress button wywoluje funkcje sortowania w main */}
                                        <TouchableOpacity activeOpacity={1} onPress={()=> {this.props.getTaskFilter(this.state.choosenList, '', ''); this.setState({listModalVisibility: false }); console.log("pressniety")}} >
                                            <Text style={styles.text}>Save</Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </TouchableOpacity>
                            </View>  
                        </TouchableOpacity>                           
                    </Modal>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => {this.setDateAndroid(); this.setState({priorityModalVisibility: false });}} style={styles.touchableOpacity}>
                    <Text style={styles.text}>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => {this.setState({priorityModalVisibility: true})}} style={styles.touchableOpacity}>
                    <Text style={styles.text}>Priority</Text>
                    <Modal transparent={true} animationType="fade" visible={this.state.priorityModalVisibility} 
                        onRequestClose={() => {this.setState({priorityModalVisibility: false}) }}>
                        <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => {this.setState({priorityModalVisibility: false}) }}>
                            <View style={styles.modal}>
                                <TouchableOpacity disabled={true}>
                                    <ScrollView>
                                        <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'None',}) }}>None</Text>
                                        <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'Low',}) }}>Low</Text>
                                        <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'Middle',}) }}>Middle</Text>
                                        <Text style={styles.select} onPress={() => {this.setState({choosenPriority: 'High',}) }}>High</Text>
                                    </ScrollView>
                                    <TouchableOpacity activeOpacity={1} onPress={()=> {this.props.getTaskFilter('', '', this.state.choosenPriority); this.setState({priorityModalVisibility: false }); console.log("pressniety")}} >
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
        backgroundColor: colorPrimary,
        width: Dimensions.get('window').width / 3,
        height: 50, 
        borderColor: 'white',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
        textAlign: 'center',
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
        backgroundColor: colorPrimary,
    },
    select: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 2,
        padding: 8,
        backgroundColor: background,
        borderRadius: 3,
    },
    button: {
        backgroundColor: colorPrimary,
    },
})