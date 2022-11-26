import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';

import useFetchData from '../hooks/useFetchData';
import Loading from '../components/shared/Loading';
import NetworkError from '../components/shared/NetworkError';
import Colors from '../constants/Colors';
import Swiper from 'react-native-swiper';
import storageUtil from '../utils/StorageUtil';
import NetWorkUtil from '../utils/NetWorkUtil';
var { width, height } = Dimensions.get('window');
const IndexScreen = ({ navigation }) => {
  const { data, loading, error, onReload, refreshing, onRefresh } = useFetchData(NetWorkUtil.indexList, {
    recommended_courses: [],
    calendar_courses: [],
    popular_courses: [],
    introductory_courses: [],
  });
  // 判断是否加载中
  if (loading) {
    return <Loading />;
  }

  // storageUtil.test = '123';
  // console.log((storageUtil.test = { ssss: '5453156' }));
  // console.log(storageUtil.test);
  // setData('test', 'test123');
  // 网络错误
  if (!error) {
    return <NetworkError onReload={() => onReload(NetWorkUtil.indexList)} />;
  }

  const renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('Courses', {
          id: item.id,
          title: item.name,
        })
      }>
      <View style={[styles.default, index == 0 ? styles.first : '', index == data.length - 1 ? styles.last : '']}>
        <Image source={{ uri: item.image }} style={styles.image} />
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
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(NetWorkUtil.indexList)} />}>
      <View style={styles.course}>
        <Swiper
          style={styles.swiper}
          height={200}
          horizontal={true}
          paginationStyle={{ bottom: 10, color: Colors.primary }}
          autoplay={true}
          showsButtons={false}>
          <Image
            source={require('../assets/images/girl2.png')}
            style={{ height: 200, width: width }}
            onProgress={() => {
              console.log('image1');
            }}
          />
          <Image source={require('../assets/images/girl3.png')} style={{ height: 200, width: width }} />
          <Image source={require('../assets/images/girl4.png')} style={{ height: 200, width: width }} />
          <Image source={require('../assets/images/girl5.png')} style={{ height: 200, width: width }} />
        </Swiper>
        <View style={styles.content}>
          <Text style={styles.heading}>推荐课程</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  course: {
    marginTop: 20,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: Colors.premium,
  },
  default: {
    position: 'relative',
    width: 206,
    marginLeft: 8,
  },
  first: {
    marginLeft: 15,
  },
  last: {
    marginRight: 15,
  },
  image: {
    width: 206,
    height: 160,
    borderRadius: 5,
  },
  titleWrapper: {
    marginTop: 6,
    height: 48,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    marginTop: 6,
    color: Colors.date,
  },
});

export default IndexScreen;
