import * as React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '../../constants/Colors';
import { TextInput } from 'react-native';

const HeaderButtonsOption = navigation => {
  return {
    headerLeft: () => (
      // <SimpleLineIcons
      //   name="bell"
      //   size={20}
      //   color={Colors.headerButton}
      //   onPress={() => navigation.navigate('InformationStack')}
      // />
      <TextInput placeholder="搜索您喜欢的内容" style={Colors.headerButton} value="dsads" />
    ),
    headerRight: () => (
      <>
        <SimpleLineIcons
          name="magnifier"
          size={20}
          color={Colors.headerButton}
          onPress={() => navigation.navigate('SearchStack')}
        />
        <SimpleLineIcons
          name="options"
          size={20}
          color={Colors.headerButton}
          style={{ marginLeft: 15 }}
          onPress={() => navigation.navigate('SettingStack')}
        />
      </>
    ),
  };
};

export default HeaderButtonsOption;
