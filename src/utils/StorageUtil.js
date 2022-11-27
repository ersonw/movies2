'use strict';

import AsyncStorage from '@react-native-community/async-storage';

class StorageUtil {
  // let arr = [];
  constructor() {
    this.arr = [];
    this.init();
  }
  async init() {
    try {
      let arr = [];
      const keys = await AsyncStorage.getAllKeys();
      // console.log(keys);
      if (keys !== undefined && keys !== null) {
        for (let i = 0; i < keys.length; i++) {
          // console.log(keys[i]);
          var value = await AsyncStorage.getItem(keys[i]);
          var json = {
            key: keys[i],
            value: value,
          };
          // json[keys[i]] = value;
          // console.log(json);
          arr.push(json);
        }
      }
      this.arr = arr;
    } catch (e) {
      // console.log(e.toString());
    }
  }
  async save(key, value) {
    try {
      var index = this.arr.findIndex(e => e.key === key);
      var json = {
        key: key,
        value: JSON.stringify(value),
      };
      if (index > -1) {
        this.arr.splice(index, 1, json);
      } else {
        this.arr.unshift(json);
      }
      await this.update();
      return true;
    } catch (e) {
      // console.log(e.toString());
      // return false;
    }
    return false;
  }
  async read(key) {
    var index = this.arr.findIndex(e => e.key === key);
    return this.arr[index];
  }

  async update() {
    try {
      let arr = this.arr;
      if (arr !== undefined && arr !== null) {
        for (let i = 0; i < arr.length; i++) {
          // var json = JSON.parse(arr[i]);
          // console.log(arr[i]);
          // console.log(arr[i].key, arr[i].value);
          await AsyncStorage.setItem(arr[i].key, arr[i].value);
        }
      }
    } catch (e) {
      // console.log(e.toString());
    }
  }
}

let storageUtil = new StorageUtil();
export default storageUtil;
