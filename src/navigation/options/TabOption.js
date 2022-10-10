import * as React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Image} from 'react-native';

// TabOption 配置
const TabOption = route => {
  let labelName;
  let iconName;

  switch (route.name) {
    case 'DiscoverStack':
      labelName = '发现';
      iconName = 'compass';
      break;
    case 'VideoStack':
      labelName = '视频';
      iconName = 'camrecorder';
      break;
    default:
      labelName = '我的';
      iconName = 'user';
  }
  return {
    tabBarLabel: labelName,
    tabBarIcon: ({focused, color}) => (
      <SimpleLineIcons name={iconName} size={25} color={color} />
      // <Image source={{uri: 'ic_launcher'}} style={{width: 40, height: 40}} />
    ),
  };
};

export default TabOption;
