import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/search/HomeScreen';
import ResultsScreen from '../../screens/search/ResultsScreen';
import CardOption from '../options/CardOption';

const SearchStack = createNativeStackNavigator();

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      screenOptions={({route, navigation}) => ({
        ...CardOption(route, navigation),
      })}>
      <SearchStack.Screen name="Home" component={HomeScreen} />
      <SearchStack.Screen name="Results" component={ResultsScreen} />
    </SearchStack.Navigator>
  );
};

export default SearchStackScreen;
