import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import {CImage} from "./CImage";
import Icons from '../assets/icons'
// @ts-ignore
import moment from "moment/moment";
import Colors from '../constants/Colors';
import * as React from "react";

export const PicThumb = ({
                             picThumb,
                             price,
                             plays,
                             vodDuration
                         }: { picThumb: string, price: number, plays: number, vodDuration: number }) => {
    return (
        <>
            <CImage
                source={{uri: picThumb}}
                style={styles.itemImage}
                resizeMode={'stretch'}
            />
            <View style={styles.maskBox}>
                <View style={styles.maskPrice}>
                    <ImageBackground
                        source={Icons.diamondTagBK}
                        imageStyle={styles.maskPriceBk}
                    >
                        <View style={styles.maskPriceItem}>
                            {price > 0 ? (
                                <>
                                    <Text style={styles.maskPriceItemTitle}>{price}</Text>
                                    <Image source={Icons.diamondTag}/>
                                </>
                            ) : (
                                <Text style={styles.maskPriceItemTitle}>VIP免费</Text>
                            )
                            }
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.maskBottom}>
                    <View style={styles.maskBottomBox}>
                        <View style={styles.maskBottomLeftBox}>
                            <Image source={Icons.playIcon}/>
                            <Text style={styles.maskPriceItemTitle}>{plays}</Text>
                        </View>
                        <View style={styles.maskBottomRightBox}>
                            <Text
                                style={styles.maskPriceItemTitle}>{moment(new Date().setHours(0, 0, 0, 0)).add(vodDuration, 'second').format('HH:mm:ss')}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    itemImage: {
        width: '100%',
        height: 120,
        borderRadius: 9,
    },
    maskBox: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 9,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    maskPrice: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    maskPriceBk: {
        // width: '100%',
        justifyContent: 'flex-end',
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 9,
    },
    maskPriceItem: {
        margin: 3,
    },
    maskPriceItemTitle: {
        fontSize: 12,
        color: Colors.white,
    },
    maskBottom: {
        width: '100%',
        backgroundColor: 'rgba(9,9,9,0.24)',
    },
    maskBottomBox: {
        width: '100%',
        marginTop: 3,
        marginBottom: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    maskBottomLeftBox: {
        marginLeft: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    maskBottomRightBox: {
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});