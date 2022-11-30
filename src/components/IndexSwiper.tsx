import useFetchData from '../hooks/useFetchData';
import NetworkError from './shared/NetworkError';
import * as React from 'react';
import styles from '../screens/Index/components/styles';
import Colors from '../constants/Colors';
import {Dimensions, Image, Linking, TouchableWithoutFeedback, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {MaskLoading} from './MaskLoading';
import {CImage} from "./CImage";
var {width} = Dimensions.get('window');
export const IndexSwiper = ({navigation, url}) => {
    const {data, loading, error, onReload, refreshing, onRefresh} = useFetchData(url, {
        list: [],
    });
    // 网络错误
    if (error) {
        return <NetworkError onReload={() => onReload(url)}/>;
    }
    const { list } = data;
    return (
        <>
            { list && list.length > 0 &&
                (<Swiper
                    style={styles.swiper}
                    horizontal={true}
                    // paginationStyle={{bottom: 10}}
                    activeDotColor={Colors.primary}
                    activeDotStyle={{width: 18}}
                    autoplay={true}
                    height={210}
                    width={width}
                    showsButtons={false}>

                    { list && list.map((l, i) => (
                        <TouchableWithoutFeedback
                            key={i}
                            onPress={() =>{
                                if(l.url && l.url.indexOf('http') > -1){
                                    Linking.openURL(l.url).then(()=>onRefresh(url));
                                }else{
                                    navigation.navigate('JumpView', {
                                        id: l.type,
                                    })
                                }
                            }
                            }>
                            <CImage
                                source={{ uri: l?.image}}
                                style={styles.swiperImage}
                                resizeMode="stretch"
                            />
                        </TouchableWithoutFeedback>
                    ))
                    }
                </Swiper>)
            }
            <MaskLoading refreshing={refreshing || loading} />
        </>
    );
}