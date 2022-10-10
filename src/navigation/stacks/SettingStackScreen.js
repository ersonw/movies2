import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/setting/HomeScreen';
import DetailsScreen from '../../screens/setting/DetailsScreen';
import CardOption from '../options/CardOption';

const SettingStack = createNativeStackNavigator();

const SettingStackScreen = () => {
  return (
    <SettingStack.Navigator
      screenOptions={({route, navigation}) => ({
        ...CardOption(route, navigation),
      })}>
      <SettingStack.Screen name="Home" component={HomeScreen} />
      <SettingStack.Screen name="Details" component={DetailsScreen} />
    </SettingStack.Navigator>
  );
};

export default SettingStackScreen;
