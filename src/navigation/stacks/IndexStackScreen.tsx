import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IndexScreen} from '../../screens/Index';
import HeaderSearchOption from '../../components/HeaderSearchOption';
import CardOption from '../../components/CardOption';
import {ParamListBase, RouteProp} from "@react-navigation/native";
import {Concentrations} from "../../screens/Index/Concentrations";

const IndexStack = createNativeStackNavigator();

const IndexStackScreen = () => {
    return (
        <IndexStack.Navigator
            // @ts-ignore
            screenOptions={CardOption}>
            <IndexStack.Screen
                name="Index"
                component={IndexScreen}
                // @ts-ignore
                options={(props) => ({...HeaderSearchOption(props)})}
            />
            <IndexStack.Screen
                options={({route, navigation}) => ({
                // headerShown: false,
                // statusBarHidden: true,
            })}
                name="concentrations"
                component={Concentrations}
            />
        </IndexStack.Navigator>
    );
};

export default IndexStackScreen;
