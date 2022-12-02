import { RouteProp, ParamListBase } from '@react-navigation/native';
import * as React from 'react';
import {ColorValue, Image, ImageSourcePropType} from 'react-native';
import icons from '../assets/icons';
import Colors from '../constants/Colors';
// TabOption 配置
const TabOption = (route: RouteProp<ParamListBase, string>) => {
  let labelName;
  let iconName: ImageSourcePropType | undefined;
  switch (route.name) {
    case 'Home':
      labelName = '首页';
      iconName = icons.indexActiveIcon;
      break;
    default:
      labelName = '我的';
      iconName = icons.myIcon;
  }
  return {
    tabBarActiveTintColor: Colors.primary,
    tabBarInactiveTintColor: Colors.tabBarInactiveText,
    tabBarStyle: {
      backgroundColor: Colors.headerBackgroundColor,
    },
    tabBarLabel: labelName,
    tabBarIcon: ({color, size }: { color:  ColorValue, size: number}) => (
      <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />
    ),
  };
};

export default TabOption;
