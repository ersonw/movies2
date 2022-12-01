import {FlatList, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import * as React from "react";
import {PicThumb} from "./PicThumb";
import Colors from '../constants/Colors';
export type VideoListProp = {
    list: [],
    navigation: any,
    scrollEnabled?: boolean,
    horizontal?: boolean,
    numColumns?: number | undefined,
};
export const VideoList = (props: VideoListProp) =>{
    const { list,navigation, } = props;
    const renderItem = ({item, index}) => {
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
        <FlatList
            data={list}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            scrollEnabled={props.scrollEnabled}
            horizontal={props.horizontal}
            // showsHorizontalScrollIndicator={false}
            // stickyHeaderHiddenOnScroll={false}
            // showsVerticalScrollIndicator={false}
            style={styles.flatList}
            numColumns={props.numColumns}
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