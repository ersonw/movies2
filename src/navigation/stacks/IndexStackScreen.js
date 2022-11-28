import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IndexScreen} from '../../screens/Index';
import HeaderButtonsOption from '../options/HeaderButtonsOption';
import CardOption from '../options/CardOption';
import Applets from '../../screens/Index/components/applets';

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
            <IndexStack.Screen
                options={({route, navigation}) => ({
                headerShown: false,
                statusBarHidden: true,
            })}
                name="applets"
                component={Applets}
            />
        </IndexStack.Navigator>
    );
};

export default IndexStackScreen;
