import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { Platform } from 'react-native';

// modal页，去掉左侧返回按钮，右侧加上关闭按钮
const ModalOption = navigation => {
  return {
    // 显示header
    headerShown: true,

    // 安卓标题栏居中
    headerTitleAlign: 'center',

    // 不显示默认返回按钮
    headerLeft: () => null,

    // 自定关闭按钮
    headerRight: () => (
      <Ionicons
        name="ios-close"
        size={Platform.OS === 'ios' ? 30 : 25}
        color={Colors.primary}
        onPress={() => navigation.goBack()}
      />
    ),
  };
};
export default ModalOption;
