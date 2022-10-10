// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Api from '../constants/Api';
//
// // 自定义 fetch，加上了登录参数
// const fetchRequest = async (url, method = 'GET', params) => {
//   const userToken = await AsyncStorage.getItem('userToken');
//   const auth = userToken ? {Authorization: `Bearer ${userToken}`} : {};
//   const body = params ? {body: JSON.stringify(params)} : {};
//
//   const header = {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     ...auth,
//   };
//
//   return new Promise(async (resolve, reject) => {
//     try {
//       let response = await fetch(Api + url, {
//         method: method,
//         headers: header,
//         ...body,
//       });
//
//       // 认证失败：登录超时，或账号被禁用
//       if (response.status == '401') {
//         throw new Error('unauthorized');
//       }
//
//       let responseJson = await response.json();
//       resolve(responseJson);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };
//
// export default fetchRequest;
