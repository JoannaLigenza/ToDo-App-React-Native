import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class EditTask extends Component {
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('back');
    console.log("navigation ", itemId)

    return (
      <View style={{marginTop: 22}}>
        <Text>
            Editing Task...
        </Text>
        <Text>Details Screen</Text>
        <Button title="Home" onPress={() => {navigation.goBack()}}></Button>
      </View>
    );
  }
}

// class TaskEdit extends Component {
//   static navigationOptions = ({ navigation }) => {
//     return { 
//       title: 'Edit Task',
//     }
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <EditTask goBack={() => {this.props.navigation.goBack()}}/>
//         {/* <Button title="Home" onPress={() => {this.props.navigation.navigate('MenuScreen')}}></Button> */}
//       </View>
//     );
//   }
// }


