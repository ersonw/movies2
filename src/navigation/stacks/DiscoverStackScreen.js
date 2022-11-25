import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/discover/HomeScreen';
import CoursesScreen from '../../screens/video/CoursesScreen';
import HeaderButtonsOption from '../options/HeaderButtonsOption';
import CardOption from '../options/CardOption';
const DiscoverStack = createNativeStackNavigator();

const DiscoverStackScreen = () => {
  return (
    <DiscoverStack.Navigator
      screenOptions={({ route, navigation }) => ({
        ...CardOption(route, navigation),
      })}>
      <DiscoverStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          ...HeaderButtonsOption(navigation),
        })}
      />
      <DiscoverStack.Screen name="Courses" component={CoursesScreen} />
    </DiscoverStack.Navigator>
  );
};

export default DiscoverStackScreen;
