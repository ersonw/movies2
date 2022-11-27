import * as React from 'react';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Platform, View} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

//  Card Stack 配置
const CardOption = (route, navigation) => {
    const { params } = route;
    return ({
        // // 标题组件的颜色（自带返回箭头）
        // headerTintColor: Colors.primary,
        // 安卓标题栏居中
        headerTitleAlign: 'center',
        //安卓使用左右切屏
        animation: 'slide_from_right',
        // 安卓滑动返回的方向为：水平
        gestureDirection: 'horizontal',
        // 默认标题为空
        title: params?.title,
        // 标题的样式
        headerTitleStyle: {
            fontWeight: '400',
            color: Colors.headerTitle,
        },
        // headerBackTitle: '',
        // headerBackTitleVisible: false,
        headerBackVisible: false,
        headerTitle: ()=>null,
        headerLeft: ()=>null,
        headerRight: ()=>{
            return (
                <View>
                    <SimpleLineIcons
                        name="close"
                        size={20}
                        color={Colors.white}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            );
        },
        headerStyle: {
            backgroundColor: Colors.headerBackgroundColor,
        },
    });
};

export default CardOption;
