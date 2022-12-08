import {
    FlatList,
    FlatListProps,
    RefreshControl,
    RefreshControlProps,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import * as React from "react";
import {PicThumb} from "./PicThumb";
import Colors from '@/constants/Colors';
import Loading, {LoadingProps} from "./shared/Loading";
export type VideoListProp<ItemT> = {
    navigation: any,
    loading?: LoadingProps,
} & FlatListProps<ItemT>;
export const VideoList = (props: VideoListProp<any>) =>{
    const { navigation, loading, refreshing, onRefresh } = props
    const renderItem = ({item, index}: { item: any, index: number}) => {
        return (
            <TouchableWithoutFeedback
                key={index}
                onPress={() =>
                    navigation.navigate('myVideoPlayer', {
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
        <FlatList
            style={styles.flatList}
            keyExtractor={item => item.id}
            refreshControl={
                <RefreshControl
                    title={ refreshing?'正在加载中～':'放开我刷新哟~'}
                    titleColor={Colors.white}
                    tintColor={Colors.primary}
                    refreshing={!!refreshing}
                    onRefresh={()=>onRefresh?.()}
                />
            }
            {...props}
            renderItem={renderItem}
            // @ts-ignore
            ListFooterComponent={(<Loading {...loading} />)}
        />
    );
};
const styles = StyleSheet.create({
    flatList: {
        width: '100%',
        // backgroundColor: Colors.white,
        // justifyContent: 'center',
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
});