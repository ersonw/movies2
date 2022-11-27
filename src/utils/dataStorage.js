import AsyncStorage from '@react-native-community/async-storage';

const setData = async (key, value) => {
  try {
    // name 是你自定义的 key 名
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    // 保存错误
  }
  return false;
};

const getData = async key => {
  try {
    // value 是之前存入的值
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(value);
      return value;
    }
  } catch (e) {
    // 读取 name 错误
  }
  return null;
};

const setDataObject = async (key, value) => {
  try {
    // 将对象，转为json格式的字符串
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    // 保存错误
  }
  return false;
};
const getDataObject = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    // 把 json 格式的字符串，转回对象
    const user = jsonValue != null ? JSON.parse(jsonValue) : null;

    console.log(jsonValue);
  } catch (e) {
    // 读取 user 错误
  }
  return null;
};
module.exports = {
  setData,
  getData,
  setDataObject,
  getDataObject,
};
