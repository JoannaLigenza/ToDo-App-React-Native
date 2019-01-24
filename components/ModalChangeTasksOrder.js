import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import {background} from "./styles/commonStyles";

export default class ModalChangeTasksOrder extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => {this.props.changeTaskOrderModalVisibility(false) }}>
                <View style={[styles.modal, {borderColor: this.props.primaryColor}]}>
                    <TouchableOpacity disabled={true} >
                        <View style={styles.textInputArea}>
                            <Text style={styles.text}>Change Task Order To:</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.props.setToOrderNumber(text)}
                                defaultValue={this.props.state.from}
                                editable = {true}
                                multiline = {false}
                                maxLength = {3}
                                //NumberOfLines = {4}
                                //autoFocus = {true}
                            />
                        <TouchableOpacity activeOpacity={1} onPress={()=> { this.props.handleChangeTaskOrderLeft(parseInt(this.props.state.from), parseInt(this.props.state.to)); this.props.changeTaskOrderModalVisibility(false); this.props.setToOrderNumber('') }} 
                            style={{backgroundColor: this.props.primaryColor, width: '100%'}} >
                          <Text style={styles.text}>Save</Text>
                        </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>  
            </TouchableOpacity> 
        )
    }
}

const styles = StyleSheet.create({
  textInputArea: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    alignSelf: 'center',
  },
  textInput: {
    width: 50, 
    alignSelf: 'center',
    textAlign: 'center',
    // marginLeft: 10,
    // marginRight: 10,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: 'gray', 
    borderBottomWidth: 2,
  },
  modal: {
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').height - 80,
    padding: 3,
    margin: 20,
    alignSelf: 'center',
    textAlign: 'center',
    position: 'absolute',
    backgroundColor: background,
    borderWidth: 3,
    },
});