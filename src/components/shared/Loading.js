import * as React from 'react';
import {StyleSheet, ActivityIndicator, } from 'react-native';
import Colors from '../../constants/Colors';

const Loading = () => {
    return (
        <ActivityIndicator size="large" color={Colors.white} style={styles.ActivityIndicatorStyle}/>
    );
};

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
});

export default Loading;
