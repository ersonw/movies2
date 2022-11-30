import {
    FlatList,
    Image, ImageBackground,
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
import {PicThumb} from '../../../components/PicThumb';


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
    // console.log(refreshing);
    // if (!refreshing){
    //     loaDing.close();
    // }
    const {list} = data;
    const renderItem = ({item, index}) => {
        console.log(item);
        return (
            <TouchableWithoutFeedback
                key={index}
                onPress={() =>
                    navigation.navigate('Courses', {
                        id: item.id,
                        title: item.name,
                    })
                }>
                <View style={[styles.itemBox, {width: '50%'}]}>
                    <View style={styles.item}>
                        <View style={styles.itemImageBox}>
                            <PicThumb plays={item.plays} picThumb={item.picThumb} vodDuration={item.vodDuration} price={item.price} />
                        </View>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.itemTitle} numberOfLines={1}>
                                {item.title}
                            </Text>
                            <Text style={[styles.itemTitle, {color: Colors.date}]} numberOfLines={2}>
                                {item.vodContent}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    return (
        <View key={ikey} style={{...(styles.listBox), width: '100%'}}>
            <Text style={styles.heading}>{item.name}</Text>
            <FlatList
                data={list}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                // horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.flatList}
                numColumns={2}
            />
            <View style={[styles.buttonBox, {width: '100%'}]}>
                <TouchableWithoutFeedback
                    style={{width: '100%'}}
                >
                    <View
                        style={styles.button}
                        onPress={() => {
                        }}
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
    flatList: {
        width: '100%',
        // backgroundColor: Colors.white,
        // justifyContent: 'center',
    },
    heading: {
        textAlign: 'left',
        color: Colors.white,
        margin: 15,
        fontWeight: 'bold',
    },
    itemBox: {
        flex: 1,
        width: '45%',
        margin: '1%',
        marginLeft: '2%',
    },
    item: {
        width: '100%',
    },
    titleWrapper: {
        width: '100%',
    },
    itemTitle: {
        width: '100%',
        color: Colors.white,
        // overflow: 'fade',
    },
    itemImageBox: {
        width: '100%',
    },
    itemImageOverlay: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'tr',
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