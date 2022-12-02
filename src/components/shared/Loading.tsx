import * as React from 'react';
import {StyleSheet, ActivityIndicator, View, Text,} from 'react-native';
import Colors from '../../constants/Colors';

export type LoadingProps = {
    loading: boolean | undefined,
    textLoading?: string,
    text?: string,
};
const Loading = ({loading,textLoading,text}: LoadingProps) => {
    if (!loading) {
        return <View style={styles.boxStyle}>{text && <Text style={styles.ActivityIndicatorStyle}>{text}</Text>}</View>
    }
    return (
        <View style={styles.boxStyle}>
            <ActivityIndicator
                size="large"
                color={Colors.white}
                style={[styles.ActivityIndicatorStyle]}
            />
            {textLoading && <Text style={[styles.ActivityIndicatorStyle, {marginTop: 0}]}>{textLoading}</Text>}
            <View style={{marginBottom: 15}} />
        </View>
    );
};

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: Colors.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ActivityIndicatorStyle: {
        // flex: 1,
        marginTop: 15,
        color: Colors.date,
    },
});

export default Loading;
