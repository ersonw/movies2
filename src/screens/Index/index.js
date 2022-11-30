import * as React from 'react';
import {
    View,
    Text,
    RefreshControl,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
} from 'react-native';

import useFetchData from '../../hooks/useFetchData';
import NetworkError from '../../components/shared/NetworkError';
import Colors from '../../constants/Colors';
import styles from './styles';
import NetWorkUtil from '../../utils/NetWorkUtil';
import icons from '../../assets/icons';
import Applets from './components/applets';
import User from '../../data/User';
import {IndexSwiper} from '../../components/IndexSwiper';
import {ConcentrationsBox} from './components/ConcentrationsBox';
import {MaskLoading} from '../../components/MaskLoading';
const user = new User();
var {width} = Dimensions.get('window');
export const IndexScreen = ({navigation}) => {
    const {data, loading, error, onReload, refreshing, onRefresh} = useFetchData(NetWorkUtil.videoConcentrations, {
        list: [],
    });
    // 判断是否加载中
    // if (loading) {
    //     return <Loading/>;
    // }
    // const user1 = User.formatJson({id:1,username:'erson',token:"123",nickname: 'test1'});
    // user1.save();
    // console.log(user.token);
    // FileUtil.test();
    // 网络错误
    if (error) {
        return <NetworkError onReload={() => onReload(NetWorkUtil.videoConcentrations)}/>;
    }
    const { list } = data;
    // console.log(list[0]);
    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                    title={ refreshing?'正在加载中～':'放开我刷新哟~'}
                    titleColor={Colors.white}
                    tintColor={Colors.primary}
                    refreshing={refreshing}
                    onRefresh={() => onRefresh(NetWorkUtil.videoConcentrations)}
                />
            }
        >
            <View style={styles.course}>
                <IndexSwiper navigation={navigation} url={NetWorkUtil.videoPublicity} />
                <View style={styles.content}>
                    <View style={styles.headButtonBox}>
                        <View style={styles.headButton}>
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    navigation.navigate('applets', {
                                        id: 1,
                                        title: '钻石尊享',
                                    })
                                }>
                                <Image source={icons.diamondIcon} />
                            </TouchableWithoutFeedback>
                            <Text style={styles.headButtonText}>钻石尊享</Text>
                        </View>
                        <View style={styles.headButton}>
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    navigation.navigate('Courses', {
                                        id: item.id,
                                        title: item.name,
                                    })
                                }>
                                <Image source={icons.jingpinIcon} />
                            </TouchableWithoutFeedback>
                            <Text style={styles.headButtonText}>精品专区</Text>
                        </View>
                        <View style={styles.headButton}>
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    navigation.navigate('Courses', {
                                        id: item.id,
                                        title: item.name,
                                    })
                                }>
                                <Image source={icons.VipIcon} />
                            </TouchableWithoutFeedback>
                            <Text style={styles.headButtonText}>VIP专区</Text>
                        </View>
                        <View style={styles.headButton}>
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    navigation.navigate('Courses', {
                                        id: item.id,
                                        title: item.name,
                                    })
                                }>
                                <Image source={icons.remenIcon} />
                            </TouchableWithoutFeedback>
                            <Text style={styles.headButtonText}>热门榜单</Text>
                        </View>
                    </View>
                </View>
                { list.map((item, index)=>
                    (<ConcentrationsBox navigation={navigation} item={item} key={index} />)
                )}
                <MaskLoading refreshing={refreshing || loading} />
            </View>
        </ScrollView>
    );
};


export default {
    IndexScreen,
    Applets,
};
