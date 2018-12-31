import React, {Component} from 'react';
import {StyleSheet, Text, View, DatePickerAndroid, Dimensions, TouchableOpacity, Modal, ScrollView} from 'react-native';
import {colorPrimary, colorSecondary, background} from "./styles/commonStyles";

export default class SortTasks extends Component {
    render() {
        return(
            <View style={styles.tabContainer}>
                <TouchableOpacity activeOpacity={1} onPress={() => {}} style={styles.touchableOpacity}>
                    <Text style={styles.text}>List</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => {}} style={styles.touchableOpacity}>
                    <Text style={styles.text}>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => {}} style={styles.touchableOpacity}>
                    <Text style={styles.text}>Priority</Text>
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
})