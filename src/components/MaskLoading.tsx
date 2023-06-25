import {
    ActivityIndicator,
    StyleSheet,
    View,
} from "react-native";
import * as React from "react";
import Colors from '@/constants/Colors';

export const MaskLoading = ({refreshing,backgroundColor='rgba(26,26,26,0.15)'}: {refreshing: boolean,backgroundColor?: string}) => {
    if (!refreshing){
        return <></>;
    }
    return (
        <View style={[styles.loadingBox,{backgroundColor}]}>
            <ActivityIndicator size="large" color={Colors.white} style={styles.ActivityIndicatorStyle}/>
        </View>
    );
};
const styles = StyleSheet.create({
    loadingBox: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(26,26,26,0.15)',
    },
    ActivityIndicatorStyle: {
        flex: 1,
    },
});