import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IndexScreen from '../../screens/IndexScreen';
import CoursesScreen from '../../screens/video/CoursesScreen';
import HeaderButtonsOption from '../options/HeaderButtonsOption';
import CardOption from '../options/CardOption';

const IndexStack = createNativeStackNavigator();

const IndexStackScreen = () => {
    return (
        <IndexStack.Navigator
            screenOptions={({route, navigation}) => ({
                ...CardOption(route, navigation),
            })}>
            <IndexStack.Screen
                name="Index"
                component={IndexScreen}
                options={({navigation, route}) => ({
                    ...HeaderButtonsOption(navigation),
                })}
            />
        </IndexStack.Navigator>
    );
};

export default IndexStackScreen;
