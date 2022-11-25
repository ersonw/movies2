import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/user/HomeScreen';
import HeaderButtonsOption from '../options/HeaderButtonsOption';
import CardOption from '../options/CardOption';
import ModalOption from '../options/ModalOption';
import WithOutHeader from '../options/WithOutHeader';
const UserStack = createNativeStackNavigator();

const UserStackScreen = () => {
  return (
    <UserStack.Navigator
      screenOptions={({ route, navigation }) => ({
        ...CardOption(route, navigation),
      })}>
      <UserStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          ...WithOutHeader(navigation),
          title: '我的',
        })}
      />
    </UserStack.Navigator>
  );
};

export default UserStackScreen;
