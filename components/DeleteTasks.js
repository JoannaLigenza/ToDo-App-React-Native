import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, CheckBox, Image, ScrollView, AsyncStorage, TouchableOpacity, TouchableHighlight} from 'react-native';
import {background, greyColor} from "./styles/commonStyles";



export default class DeleteTasks extends PureComponent {
  constructor(props) {
    super(props);
    this.state= { 
        tasks: [{key: '1', text: '', isChecked: false, list: "Default", priority: "None", date: "", note: '', height: ''}]
    };
    this.getDataFromAsyncStore();
  }

  componentDidMount() {
    this.listener = this.props.navigation.addListener( 'didFocus', () => {
      this.getDataFromAsyncStore();
    } )
  }

  componentWillUnmount() {
    //this.props.navigation.removeListener('didFocus', () => console.log('unmount') );
    this.listener.remove();
  }

  static navigationOptions = {
        drawerLabel: 'Delete Tasks',
        drawerIcon: ({ tintColor }) => (
        <Image
            source={require('../img/world.png')}
            style={[ {tintColor: tintColor}]}
        />
        ),
    }

  getDataFromAsyncStore = async () => {
        try {
            let tasks = await AsyncStorage.getItem('tasks');
            tasks = JSON.parse(tasks);
            this.setState({ tasks: tasks })
        } catch (error) {
            console.log('storage get data error in DeleteTask component', error.message)
        }
  }

  setCheckBox = (e, item) => {
    const newTasks = this.state.tasks.map( task => {
      if (task === item) {
        task.isChecked = e
        return task
      }
      return task
    })
    this.setState({ isChecked: newTasks })
  }

  handleDeleteTasks = () => {
    const newTasks = this.state.tasks.filter( task => {
      return task.isChecked === false
    })
    this.setState({ tasks: newTasks })
    this.props.screenProps.setDeletedTasks(newTasks);
  }
  
  render() {
    //console.log(' props navigation ', this.props.navigation.isFocused())
    const item = this.state.tasks.map( (item, index) => {
      return <View key={item.key}>
                <View style={styles.oneTask}>
                  <CheckBox value={item.isChecked} onValueChange={(e) => this.setCheckBox(e, item)} ></CheckBox>
                  <Text style={styles.text}>
                    {item.text}
                  </Text>
                </View>
                <View style={{width: '80%', height: 2, backgroundColor: greyColor, alignSelf: 'center'}}></View>
             </View> 
    })
    return (
        <View style={{backgroundColor: this.props.screenProps.primaryColor, flex: 1}}>
          <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight underlayColor={'rgba(0,0,0,0.4)'} onPress={() => {this.props.navigation.goBack()}}
                                  style={styles.touchableHighlight}>
                  <Image source={require('../img/arrow.png')} ></Image>
              </TouchableHighlight>
              <Text style={[styles.textColor, {margin: 15}]}>
                  Delete tasks:
              </Text>
          </View>
          <ScrollView >
              <View style={{backgroundColor: background}}>
                  {item}
              </View>
          </ScrollView>
          <TouchableOpacity activeOpacity={0.85} 
                onPress={() => {this.handleDeleteTasks(); this.props.navigation.goBack() }} >
                <Text style={styles.button} >Delete checked</Text>
            </TouchableOpacity>
        </View>
    );
}

}

const styles = StyleSheet.create({
  oneTask: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
    alignItems: "center",
    backgroundColor: background,
    // borderColor: 'red',
    // borderWidth: 2,
  }, 
  text: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    textAlign: 'left',
    // borderWidth: 1,
    // borderRadius: 4,
  }, 
  textColor: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  touchableHighlight: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems:'center',
    justifyContent:'center',
    margin: 7,
  },
  button: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    margin: 10,
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: background,
    // borderWidth: 2,
    // borderColor: 'red',
    },
});