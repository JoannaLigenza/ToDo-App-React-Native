import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, CheckBox, Image, ScrollView, Animated, AsyncStorage, TouchableOpacity} from 'react-native';
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
                  <Text style={{flex: 1}}>
                    {item.text}
                  </Text>
                </View>
                <View style={{width: '80%', height: 2, backgroundColor: greyColor, alignSelf: 'center'}}></View>
             </View> 
    })
    return (
        <View>
          <ScrollView >
              <View>
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