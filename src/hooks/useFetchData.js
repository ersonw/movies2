import React, { useCallback, useEffect, useReducer } from 'react';
import fetchRequest from '../utils/fetchRequest';

// 初始状态
let initialState = {
  loading: true,
  error: false,
  refreshing: false,
  data: [],
};

// 定义reducer，统一管理状态
const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        loading: true,
        error: false,
        refreshing: false,
      };
    case 'refresh':
      return {
        ...state,
        refreshing: true,
      };
    case 'success':
      return {
        ...state,
        error: false,
        data: action.payload,
      };
    case 'failure':
      return {
        ...state,
        error: true,
      };
    case 'done':
      return {
        ...state,
        loading: false,
        refreshing: false,
      };
    default:
      throw new Error();
  }
};

const useFetchData = (url, initData) => {
  // 如果有传过来的initData，设置到initialState里
  initialState = {
    ...initialState,
    data: initData || [],
  };

  // 使用useReducer初始化数据
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async url => {
    try {
      const responseJson = await fetchRequest(url);
      dispatch({ type: 'success', payload: responseJson });
    } catch (error) {
      dispatch({ type: 'failure' });
    } finally {
      dispatch({ type: 'done' });
    }
  };

  // 监听 url 参数，也就说当接口地址变化后，会重新请求接口
  useEffect(() => {
    fetchData(url);
  }, [url]);

  // 下拉刷新
  const onRefresh = useCallback(url => {
    dispatch({ type: 'refresh' });
    fetchData(url);
  }, []);

  // 重新加载
  const onReload = useCallback(url => {
    dispatch({ type: 'init' });
    fetchData(url);
  }, []);

  // 返回这些内容，在调用的页面中可以读取、调用，或再次进行设置
  return { ...state, onRefresh, onReload, fetchData };
};

export default useFetchData;
