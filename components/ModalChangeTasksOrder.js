import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import {background} from "./styles/commonStyles";

export default class ModalChangeTasksOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalText: '',
        }
    }

    modalTextChange = () => {
        //console.log('text: ', this.state.modalText, this.props.state.to )
        if (this.props.state.to === '') {
            this.props.handleChangeTaskOrderLeft(parseInt(this.props.state.from), parseInt(this.props.state.from));
            this.props.changeModalVisibility(false); 
            this.props.setToOrderNumber('');
            return
        }
        if (this.props.state.to > this.props.state.tasks.length) {
            this.setState({ modalText: 'You have only ' + this.props.state.tasks.length + ' tasks'});
            return
        }
        if (this.props.state.to < 1) {
            this.setState({ modalText: 'Please write positive number'});
            return
        }
        this.props.handleChangeTaskOrderLeft(parseInt(this.props.state.from), parseInt(this.props.state.to));
        this.props.changeModalVisibility(false); 
        this.props.setToOrderNumber('');
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => {this.props.changeModalVisibility(false) }}>
                <View style={[styles.modal, {borderColor: this.props.primaryColor, width: Dimensions.get('window').width - 80, height: Dimensions.get('window').height - 80,}]}>
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
                                //autoFocus = {true}
                            />
                            <Text style={{margin: 10}}> {this.state.modalText} </Text>
                        <TouchableOpacity activeOpacity={1} onPress={()=> { this.modalTextChange(); }} 
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
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: 'gray', 
    borderBottomWidth: 2,
  },
  modal: {
    padding: 3,
    margin: 20,
    alignSelf: 'center',
    textAlign: 'center',
    position: 'absolute',
    backgroundColor: background,
    borderWidth: 3,
    },
});