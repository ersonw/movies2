import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { Platform } from 'react-native';

// modal页，去掉左侧返回按钮，右侧加上关闭按钮
const WithOutHeader = navigation => {
  return {
    // 显示header
    headerShown: false,

    // 安卓标题栏居中
    headerTitleAlign: 'center',

    // 不显示默认返回按钮
    headerLeft: () => null,

    // 自定关闭按钮
    headerRight: () => null,
  };
};
export default WithOutHeader;
