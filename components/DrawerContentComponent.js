import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, TouchableHighlight} from 'react-native';

export default class ContentComponent extends PureComponent {
    render() {
        //console.log('this.props ', this.props)
        const menu = <View>
                        <View style={styles.menu}></View>
                        <View style={styles.menu}></View>
                        <View style={styles.menu}></View>
                    </View>

        return (
            <TouchableOpacity activeOpacity={1} style={[styles.drawerTransparent, { width: Dimensions.get('window').width}]} onPress={() => {this.props.navigation.goBack();console.log('preeessss')}}>
                <View style={styles.drawer} >
                    <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} style={styles.row} onPress={() => this.props.navigation.goBack()}>
                        <View style={{flexDirection: 'row'}}>
                            {menu}
                            <Text style={styles.text}> 
                                Home
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} style={styles.row} onPress={() => this.props.navigation.navigate('App Color')}>
                        <View style={{flexDirection: 'row'}}>
                            {menu}
                            <Text style={styles.text}> 
                                App Color
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} style={styles.row} onPress={() => this.props.navigation.navigate('Add/Delete List')}>
                        <View style={{flexDirection: 'row'}}>
                            {menu}
                            <Text style={styles.text}> 
                                Add/Delete Lis
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} style={styles.row} onPress={() => this.props.navigation.navigate('Delete Tasks')}>
                        <View style={{flexDirection: 'row'}}>
                            {menu}
                            <Text style={styles.text}> 
                                Delete Tasks
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
  drawerTransparent: {
    flex: 1, 
    backgroundColor: 'transparent',
  },
  drawer: {
    flex: 1, 
    width: 300, 
    backgroundColor: 'white', 
  },
  row: {
    flexDirection: 'row', 
    paddingVertical: 20, 
    paddingLeft: 10,
    alignItems: 'center',
  },
  menu: {
    width: 20,
    height: 2,
    backgroundColor: '#111',
    margin: 2,
    borderRadius: 3,
  },
  text: {
    fontSize: 16,
    marginLeft: 15,
    color: '#111'
  }
});