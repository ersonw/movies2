import React, { Component } from 'react';
import { Animated, Easing, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PopupWindow from './PopupWindow';

export default class LWAlertComponent extends PopupWindow {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
    };
  }
  renderChildrenComponents() {
    console.log('renderChildrenComponents --- ' + 'LWAlertComponent');
    return (
      <View style={model.container}>
        <Text style={model.title}>title</Text>
        <Text style={model.content}>confirm dialog --- content content content content content content content </Text>
        <View style={model.seperator_line} />
        <TouchableOpacity
          style={model.bt_confirm}
          onPress={event => {
            this.hide();
          }}>
          <Text style={model.text_confirm}>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const model = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  title: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
    marginVertical: 15,
    textAlign: 'center',
  },
  content: {
    fontSize: 17,
    color: 'gray',
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  bt_confirm: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  text_confirm: {
    color: 'red',
    fontWeight: '800',
    fontSize: 18,
  },
  seperator_line: {
    backgroundColor: '#ccc',
    height: 0.5,
  },
});
