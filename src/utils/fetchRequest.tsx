import AsyncStorage from '@react-native-community/async-storage';
import Api from '../constants/Api';
import Toast from 'react-native-toast-message'
import AESUtil from './AESUtil';
export type HeadersInit = Headers | string[][] | { [key: string]: string };
export type RequestProps = {
  method?: string,
  params?: {},
  navigation?: any,
};
const fetchRequest = async (url: any, {method= 'GET',params,navigation}: RequestProps) => {
  const userToken = await AsyncStorage.getItem('userToken');
  const auth = {Token: `${userToken}`};
  const body = params ? {body: JSON.stringify(params)} : {};

  const header: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...auth,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(Api + url, {
        method: method,
        headers: header,
        ...body,
      });
      const { status } = response;
      // 认证失败：登录超时，或账号被禁用
      if (status && status === 201) {
        throw new Error('未登录账号');
      }
      // console.log(await response.formData());
      const responseJson = await response.json();
      const { code,data, message } = responseJson;
      if (code === 201){
        await AsyncStorage.removeItem('userToken');
        if (navigation){
          navigation?.navigate('login',{login: true});
        }
      }
      if (message){
        if (code===200){
          Toast.show({
            type: 'success',
            text1: message,
          });
        }else {
          throw new Error(message);
        }
      }
      // console.log(data);
      // if (data){
      //   console.log(AESUtil.decrypt(data));
      //   resolve(AESUtil.decrypt(data));
      // }else {
      //   resolve();
      // }
      if (data){
        resolve(data);
      }
    } catch (err: any) {
      // console.log(err);
      console.log(Api+url);
      Toast.show({
        // position: 'bottom',
        topOffset: 150,
        type: 'error',
        text1: '网络请求错误!',
        text2: err.message || '未知错误！',
      });
      reject(err);
    }
  });
};
export const postRequest =async (url: any,props: RequestProps)=> {
  let error = false;
  let data = undefined;
  try {
    // @ts-ignore
    data = await fetchRequest(url,{...props, method: 'POST'});
    return {error, data};
  }catch (e) {
    error = true;
    return {error, data};
  }
};
export default fetchRequest;
