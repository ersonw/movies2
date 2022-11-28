import * as React from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
} from 'react-native';

import useFetchData from '../../hooks/useFetchData';
import Loading from '../../components/shared/Loading';
import NetworkError from '../../components/shared/NetworkError';
import Colors from '../../constants/Colors';
import Swiper from 'react-native-swiper';
import styles from './styles';
import NetWorkUtil from '../../utils/NetWorkUtil';
import icons from '../../assets/icons';
import Applets from './components/applets';
import storageUtil from '../../utils/StorageUtil';
import User from '../../data/User';
import FileUtil from '../../utils/fileUtil';
const user = new User();
var {width} = Dimensions.get('window');
export const IndexScreen = ({navigation}) => {
    const {data, loading, error, onReload, refreshing, onRefresh} = useFetchData(NetWorkUtil.indexList, {
        recommended_courses: [],
        calendar_courses: [],
        popular_courses: [],
        introductory_courses: [],
    });
    // 判断是否加载中
    if (loading) {
        return <Loading/>;
    }
    // const user1 = User.formatJson({id:1,username:'erson',token:"123",nickname: 'test1'});
    // user1.save();
    // console.log(user.token);
    FileUtil.test();
    // 网络错误
    if (!error) {
        return <NetworkError onReload={() => onReload(NetWorkUtil.indexList)}/>;
    }

    const renderItem = ({item, index}) => (
        <TouchableWithoutFeedback
            onPress={() =>
                navigation.navigate('Courses', {
                    id: item.id,
                    title: item.name,
                })
            }>
            <View style={[styles.default, index === 0 ? styles.first : '', index === data.length - 1 ? styles.last : '']}>
                <Image source={{uri: item.image}} style={styles.image}/>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title} numberOfLines={2}>
                        {item.name}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                    title='放开我刷新哟~'
                    titleColor={Colors.white}
                    tintColor={Colors.primary}
                    refreshing={refreshing}
                    onRefresh={() => onRefresh(NetWorkUtil.indexList)}
                />
            }
        >
            <View style={styles.course}>
                <Swiper
                    style={styles.swiper}
                    horizontal={true}
                    // paginationStyle={{bottom: 10}}
                    activeDotColor={Colors.primary}
                    activeDotStyle={{width: 18}}
                    autoplay={true}
                    height={210}
                    width={width}
                    showsButtons={false}>
                    <Image
                        source={require('../../assets/images/girl2.png')}
                        style={styles.swiperImage}
                        resizeMode="cover"
                    />
                    <Image resizeMode="cover" source={require('../../assets/images/girl3.png')}
                           style={styles.swiperImage}/>
                    <Image resizeMode="cover" source={require('../../assets/images/girl4.png')}
                           style={styles.swiperImage}/>
                    <Image resizeMode="cover" source={require('../../assets/images/girl5.png')}
                           style={styles.swiperImage}/>
                </Swiper>
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
                <FlatList
                    data={data.calendar_courses}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </ScrollView>
    );
};


export default {
    IndexScreen,
    Applets,
};
