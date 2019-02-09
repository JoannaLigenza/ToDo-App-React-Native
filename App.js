import React, {Component, PureComponent} from 'react';
import { AsyncStorage } from 'react-native';
import { AppContainer } from './components/DrawerNavigator';



export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state= { 
        lists: ['Default', 'Private', 'Work'], 
        primaryColor: '#fff',
        deletedList: '',
        deletedTasks: '',
    };
    this.getDataFromAsyncStore();
  }

  getDataFromAsyncStore = async () => {
        try {
            const initLists = ["Default", "Private", "Work"];
            const initColor = '#fec538';
            let lists = await AsyncStorage.getItem('lists');
            let primaryColor = await AsyncStorage.getItem('primaryColor');
            if (primaryColor === null) {
                primaryColor = initColor;
                await AsyncStorage.setItem( 'primaryColor', primaryColor);
            }
            if (lists === null ) {
                lists = initLists;
                await AsyncStorage.setItem('lists', JSON.stringify(lists));
                this.setState({ lists: lists, primaryColor: primaryColor});
                return
            }
            lists = JSON.parse(lists);
            this.setState({ lists: lists, primaryColor: primaryColor})
        } catch (error) {
            console.log('storage get data error in App', error.message)
        }
  }

  setDataToAsyncStore = async () => {
      try {
            const saveLists = this.state.lists;
            const savePrimaryColor = this.state.primaryColor;
            await AsyncStorage.multiSet([['lists', JSON.stringify(saveLists)], ['primaryColor', savePrimaryColor] ]);
            // await AsyncStorage.multiRemove([ '12', '13' ]);
            // console.log('reading data 1 ', await AsyncStorage.getItem('tasks'));
             //console.log('reading data 2 ', await AsyncStorage.getAllKeys(), );            
        } catch (error) {
            console.log('storage set data error in App', error.message)
      }
  }

  setTasksToAsyncStore = async () => {
      try {
            const saveNewTasks = this.state.deletedTasks;
            await AsyncStorage.setItem('tasks', JSON.stringify(saveNewTasks));            
        } catch (error) {
            console.log('storage set data error in App', error.message)
      }
  }

  setLists = async (lists) => {
    await this.setState({ lists: lists});
    this.setDataToAsyncStore();
  }

  setPrimaryColor = async (color) => {
    await this.setState({ primaryColor: color});
    this.setDataToAsyncStore();
  }

  setDeletedList = async (list) => {
    await this.setState({ deletedList: list});
    this.setState({ deletedList: ''});
    //this.setDataToAsyncStore();
  }

  setDeletedTasks = async (tasks) => {
    await this.setState({ deletedTasks: tasks});
    await this.setTasksToAsyncStore();
    this.setState({ deletedTasks: ''});
  }

  render() {
      //console.log('App')
    return <AppContainer screenProps={{ lists: this.state.lists, setLists: this.setLists, 
        primaryColor: this.state.primaryColor, setPrimaryColor: this.setPrimaryColor,
        deletedList: this.state.deletedList, setDeletedList: this.setDeletedList ,
        deletedTasks: this.state.deletedTasks, setDeletedTasks: this.setDeletedTasks }} />;
  }
}




