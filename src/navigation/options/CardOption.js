import * as React from 'react';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';

//  Card Stack 配置
const CardOption = (route, navigation) => ({
    // 标题的样式
    headerTitleStyle: {
        fontWeight: '400',
        color: Colors.headerTitle,
    },
    // 标题组件的颜色（自带返回箭头）
    headerTintColor: Colors.primary,

    // 安卓标题栏居中
    headerTitleAlign: 'center',

    //安卓使用左右切屏
    animation: 'slide_from_right',

    // 安卓滑动返回的方向为：水平
    gestureDirection: 'horizontal',
    // 默认标题为空
    title: '',

    // 自定义返回按钮
    headerLeft: () => (
        <Ionicons
            name={Platform.OS === 'ios' ? 'ios-chevron-back' : 'md-arrow-back'}
            size={Platform.OS === 'ios' ? 30 : 25}
            color={Colors.primary}
            onPress={() => navigation.goBack()}
        />
    ),
});

export default CardOption;
