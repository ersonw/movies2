import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/discover/HomeScreen';
import CoursesScreen from '../../screens/video/CoursesScreen';
import HeaderSearchOption from '../../components/HeaderSearchOption';
import CardOption from '../../components/CardOption';
const DiscoverStack = createNativeStackNavigator();

const DiscoverStackScreen = () => {
  return (
    <DiscoverStack.Navigator
      screenOptions={({ route, navigation }) => ({
        ...CardOption(route, navigation),
      })}>
      <DiscoverStack.Screen
        name="Home1"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          ...HeaderSearchOption(navigation),
        })}
      />
      <DiscoverStack.Screen name="Courses" component={CoursesScreen} />
    </DiscoverStack.Navigator>
  );
};

export default DiscoverStackScreen;
