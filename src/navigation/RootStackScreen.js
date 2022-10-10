import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InformationStackScreen from './stacks/InformationStackScreen';
import TeacherHomeScreen from '../screens/teacher/HomeScreen';
import SearchStackScreen from './stacks/SearchStackScreen';
import SettingStackScreen from './stacks/SettingStackScreen';
import ChapterStackScreen from './stacks/ChapterStackScreen';
import TabScreen from './TabScreen';
import ModalOption from './options/ModalOption';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Group>
          <RootStack.Screen name="Tab" component={TabScreen} />
          <RootStack.Screen name="SearchStack" component={SearchStackScreen} />
          <RootStack.Screen name="SettingStack" component={SettingStackScreen} />
          <RootStack.Screen name="ChapterStack" component={ChapterStackScreen} />
        </RootStack.Group>

        <RootStack.Group>
          <RootStack.Screen
            name="InformationStack"
            component={InformationStackScreen}
            options={{
              presentation: 'fullScreenModal',
            }}
          />
          <RootStack.Screen
            name="Teacher"
            component={TeacherHomeScreen}
            options={({ navigation }) => ({
              ...ModalOption(navigation),
              presentation: 'modal',
            })}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
