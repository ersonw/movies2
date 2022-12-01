import {StyleSheet, View} from "react-native";
import Colors from '../../../constants/Colors';
import * as React from 'react';
import NetWorkUtil from "../../../utils/NetWorkUtil";
import useFetchData from "../../../hooks/useFetchData";

export const Concentrations = ({id})=>{
    const {
        data,
        loading,
        error,
        onReload,
        refreshing,
        onRefresh,
    } = useFetchData(NetWorkUtil.concentrationsAnytime + id, {
        list: [],
    });
    return (
        <View style={styles.container}>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 45,
        backgroundColor: Colors.backgroundColor,
    },
});