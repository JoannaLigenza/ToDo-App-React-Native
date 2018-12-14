import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class EditTask extends Component {
  render() {
    return (
      <View style={{marginTop: 22}}>
        <Text>
            Editing Task...
        </Text>
        <Text>Details Screen</Text>
        <Button title="Home" onPress={this.props.goBack}></Button>
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


