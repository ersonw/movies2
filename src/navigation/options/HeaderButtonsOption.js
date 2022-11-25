import * as React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '../../constants/Colors';
import { SafeAreaView, TextInput } from 'react-native';

const HeaderButtonsOption = navigation => {
  return {
    headerTitle: () => null,
    headerLeft: () => {
      return (
        <>
          <SafeAreaView
            style={{
              width: '85%',
              backgroundColor: Colors.date,
              borderRadius: 9,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <SimpleLineIcons
              name="magnifier"
              size={15}
              color={Colors.tabBarInactiveText}
              style={{ marginLeft: 9 }}
              onPress={() => navigation.navigate('SearchStack')}
            />
            <TextInput
              placeholder="搜索您喜欢的内容"
              color={Colors.white}
              style={{
                margin: 12,
                width: '80%',
                fontSize: 15,
              }}
              placeholderTextColor={Colors.tabBarInactiveText}
            />
          </SafeAreaView>
        </>
      );
    },
    headerRight: () => (
      <SimpleLineIcons
        name="grid"
        size={20}
        color={Colors.headerButton}
        onPress={() => navigation.navigate('SettingStack')}
      />
    ),
    headerTitleAlign: 'center',
    headerLargeStyle: {
      backgroundColor: Colors.backgroundColor,
    },
  };
};

export default HeaderButtonsOption;
