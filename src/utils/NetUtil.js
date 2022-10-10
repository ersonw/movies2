'use strict';
import React, { Component } from 'react';

class NetUtil extends Component {
  static DouB_Api = 'https://api.douban.com/v2/movie/top250?start=0&count=20';
  /**
   * post请求
   * url : 请求地址
   * data : 参数(Json对象)
   * callback : 回调函数
   * */
  static postJson(url, data, callback) {
    var fetchOption = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch(url, fetchOption)
      .then(response => response.text())
      .then(responseText => {
        callback(JSON.parse(responseText));
      })
      .done();
  }

  /**
   * get请求
   * url : 请求地址
   * callback : 回调函数
   */
  static get(url, callback) {
    var fetchOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(url, fetchOptions)
      .then(response => response.text())
      .then(responseText => {
        callback(JSON.parse(responseText));
      })
      .done();
  }
  /**
   * put请求
   * url : 请求地址
   * data : 参数(Json对象)
   * callback : 回调函数
   * */
  static putJson(url, data, callback) {
    var fetchOption = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        //此处使用的LeanCloud
        'X-LC-Id': 'M401fErHUPYhDKmgp0wjqVRX-gzGzoHsz',
        'X-LC-Key': 'Jqnvt1Lmt34vQh1JDRUpRAqq',
      },
      body: JSON.stringify(data),
    };

    fetch(url, fetchOption)
      .then(response => response.text())
      .then(responseText => {
        callback(JSON.parse(responseText));
      })
      .done();
  }
}
export default NetUtil;
