import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constants/Colors';
import * as React from 'react';
import useFetchData from '../../../hooks/useFetchData';
import NetWorkUtil from '../../../utils/NetWorkUtil';
import NetworkError from '../../../components/shared/NetworkError';
import {MaskLoading} from '../../../components/MaskLoading';
import {VideoList} from '../../../components/VideoList';


export const ConcentrationsBox = ({navigation, item, ikey}) => {
    const {
        data,
        loading,
        error,
        onReload,
        refreshing,
        onRefresh,
    } = useFetchData(NetWorkUtil.concentrationsAnytime + item.id, {
        list: [],
    });
    // if (loading) {
    //     return <MaskLoading refreshing={loading} />;
    // }
    if (error) {
        return <NetworkError onReload={() => onReload(NetWorkUtil.concentrationsAnytime + item.id)}/>;
    }
    const {list} = data;
    return (
        <View key={ikey} style={{...(styles.listBox), width: '100%'}}>
            <Text style={styles.heading}>{item.name}</Text>
            <VideoList  list={list} navigation={navigation} scrollEnabled={false} numColumns={2}/>
            <View style={[styles.buttonBox, {width: '100%'}]}>
                <TouchableWithoutFeedback
                    style={{width: '100%'}}
                    onPress={() => {
                        navigation.navigate('concentrations', {
                            id: item.id,
                            title: item.name,
                        })
                    }}
                >
                    <View
                        style={styles.button}
                    >
                        <Text style={styles.buttonTitle}>查看更多</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    style={{width: '100%'}}
                    onPress={() => {
                        onRefresh(NetWorkUtil.concentrationsAnytime + item.id);
                    }}
                >
                    <View
                        style={[styles.button, {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }]}
                    >
                        <MaterialIcons
                            name="autorenew"
                            size={18}
                            color={Colors.white}
                        />
                        <Text style={styles.buttonTitle}>换一换</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <MaskLoading refreshing={refreshing || loading} />
        </View>
    );
};
const styles = StyleSheet.create({

    listBox: {
        width: '95%',
    },
    heading: {
        textAlign: 'left',
        color: Colors.white,
        margin: 15,
        fontWeight: 'bold',
    },

    buttonBox: {
        // margin: 15,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: Colors.white,
    },
    button: {
        backgroundColor: 'rgba(253,253,253,0.1)',
        width: '45%',
        borderRadius: 9,
    },
    buttonTitle: {
        textAlign: 'center',
        color: Colors.white,
        margin: 9,
        fontSize: 12,
    },
});