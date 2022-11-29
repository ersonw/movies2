import AsyncStorage from '@react-native-community/async-storage';
import Api from '../constants/Api';
import Toast from 'react-native-toast-message'
import AESUtil from './AESUtil';
// 自定义 fetch，加上了登录参数
const fetchRequest = async (url, method = 'GET', params) => {
  const userToken = await AsyncStorage.getItem('userToken');
  const auth = userToken ? {Token: `${userToken}`} : {};
  const body = params ? {body: JSON.stringify(params)} : {};

  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...auth,
  };

  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(Api + url, {
        method: method,
        headers: header,
        ...body,
      });

      // 认证失败：登录超时，或账号被禁用
      if (response.status === '201') {
        throw new Error('unauthorized');
      }

      const responseJson = await response.json();
      const { code,data, message } = responseJson;
      if (message){
        if (code===200){
          Toast.show({
            type: 'success',
            text1: message,
          });
        }else {
          Toast.show({
            type: 'error',
            text1: message,
          });
        }
      }
      // console.log(data);
      // if (data){
      //   console.log(AESUtil.decrypt(data));
      //   resolve(AESUtil.decrypt(data));
      // }else {
      //   resolve();
      // }
      resolve(data);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'API接口错误!'
      });
      reject(err);
    }
  });
};

export default fetchRequest;
