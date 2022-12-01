import * as React from 'react';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ParamListBase, RouteProp} from "@react-navigation/native";

//  Card Stack 配置
const CardOption = ({route, navigation}: { route: RouteProp<ParamListBase, string>; navigation: any; }) => {
    const {params} = route;
    const { title } = params ? (params as any) : { title: '' };
    return ({
        // // 标题组件的颜色（自带返回箭头）
        headerTintColor: Colors.white,
        // 安卓标题栏居中
        headerTitleAlign: 'center',
        //安卓使用左右切屏
        animation: 'slide_from_right',
        // 安卓滑动返回的方向为：水平
        gestureDirection: 'horizontal',
        // 默认标题为空
        title: title,
        // title: '',
        // 标题的样式
        headerTitleStyle: {
            fontWeight: '400',
            color: Colors.headerTitle,
        },
        // headerBackTitle: '',
        headerBackTitleVisible: false,
        // headerBackVisible: false,
        // headerLeft: () => (
        //     <Icon
        //         name="highlight-off"
        //         size={24}
        //         color={Colors.white}
        //         onPress={() => navigation.goBack()}
        //     />
        // ),
        // headerLeft: ()=>null,
        // headerRight: ()=>{
        //     return (
        //         <View>
        //             <Icon
        //                 name="settings-backup-restore"
        //                 size={20}
        //                 color={Colors.white}
        //                 onPress={() => navigation.goBack()}
        //             />
        //             <Icon
        //                 name="adjust"
        //                 size={20}
        //                 color={Colors.white}
        //                 onPress={() => navigation.goBack()}
        //             />
        //         </View>
        //     );
        // },
        headerStyle: {
            backgroundColor: Colors.headerBackgroundColor,
        },
    });
};

export default CardOption;
