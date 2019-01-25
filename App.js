import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';
import { colorPrimary } from './components/styles/commonStyles';
import { AppContainer } from './components/DrawerNavigator';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state= { 
            lists: ['Default', 'Private', 'Work'], 
            primaryColor: '',
            deletedList: '',
            }
  }

  componentDidMount() {
      this.getDataFromAsyncStore();
  }

  getDataFromAsyncStore = async () => {
        try {
            const initLists = ['Default', 'Private', 'Work'];
            const initColor = colorPrimary;
            let lists = await AsyncStorage.getItem('lists');
            let primaryColor = await AsyncStorage.getItem('primaryColor');
            if (lists === null ) {
                lists = initLists;
                await AsyncStorage.setItem('lists', JSON.stringify(lists));
            }
            if (primaryColor === null) {
                primaryColor = initColor;
                await AsyncStorage.setItem( 'primaryColor', primaryColor);
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

  setLists = async (lists) => {
    await this.setState({ lists: lists});
    this.setDataToAsyncStore();
  }

  setPrimaryColor = async (color) => {
    await this.setState({ primaryColor: color});
    this.setDataToAsyncStore();
  }

  setDeletedList = async (list) => {
    //console.log('deleted list', list)
    await this.setState({ deletedList: list});
    this.setDataToAsyncStore();
  }

  render() {
    return <AppContainer screenProps={{ lists: this.state.lists, setLists: this.setLists, 
        primaryColor: this.state.primaryColor, setPrimaryColor: this.setPrimaryColor,
        deletedList: this.state.deletedList, setDeletedList: this.setDeletedList }} />;
  }
}




