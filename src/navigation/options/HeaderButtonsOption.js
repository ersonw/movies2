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
      <>
        <SimpleLineIcons
          name="magnifier"
          size={20}
          color={Colors.headerButton}
          style={{ marginRight: 5 }}
          onPress={() => navigation.navigate('SearchStack')}
        />
        <TextInput placeholder="搜索您喜欢的内容" color={Colors.primary} style={{ width: '80%' }} />
      </>
    ),
    headerRight: () => (
      <SimpleLineIcons
        name="grid"
        size={20}
        color={Colors.headerButton}
        style={{ marginRight: 15 }}
        onPress={() => navigation.navigate('SettingStack')}
      />
    ),
  };
};

export default HeaderButtonsOption;
