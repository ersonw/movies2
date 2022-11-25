import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabOption from './options/TabOption';
import DiscoverStackScreen from './stacks/DiscoverStackScreen';
import VideoStackScreen from './stacks/VideoStackScreen';
import UserStackScreen from './stacks/UserStackScreen';

const Tab = createBottomTabNavigator();

function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        ...TabOption(route),
      })}>
      <Tab.Screen name="DiscoverStack" component={DiscoverStackScreen} />
      <Tab.Screen name="VideoStack" component={VideoStackScreen} />
      <Tab.Screen name="VideoStacks" component={VideoStackScreen} />
      <Tab.Screen name="UserStack" component={UserStackScreen} />
    </Tab.Navigator>
  );
}

export default TabScreen;
