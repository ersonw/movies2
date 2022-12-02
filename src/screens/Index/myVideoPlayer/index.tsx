import Colors, {ScreenProps} from "../../../constants/Colors";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
// @ts-ignore
import VideoPlayer from 'react-native-video-player';
import NetworkError from "../../../components/shared/NetworkError";
import * as React from "react";
import useFetchData from "../../../hooks/useFetchData";
import NetWorkUtil from "../../../utils/NetWorkUtil";
import {MaskLoading} from "../../../components/MaskLoading";

const {width, height} = Dimensions.get('window');
const myVideoPlayer = (props: ScreenProps)=>{
    const { navigation, route } = props;
    const {params} = route;
    const {id} = (params as any);
    if (!id) {
        return <NetworkError onReload={() => navigation.goBack()} text='系统错误，请点击' buttonTitle='返回上一页'/>;
    }
    const url = NetWorkUtil.videoPlayer.replace('{id}', id);
    const {data, loading, error, onReload, refreshing, onRefresh,} = useFetchData(url, {
        list: [],
        error: undefined,
    },navigation);
    if (!error) {
        return <NetworkError onReload={() => onReload(url)} text='网络错误，请点击' buttonTitle='重新加载'/>;
    }
    // if (data.error){
    //     return <NetworkError onReload={() => onReload(url)} text='网络错误，请点击' buttonTitle='重新加载'/>;
    // }
    console.log(data);
    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <VideoPlayer
                    // style={styles.videoPlayer}
                    video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                    videoWidth={1600}
                    videoHeight={900}
                    thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                />
            </View>
            <View style={styles.maskBox}>
                <Icon
                    name="arrow-back"
                    size={25}
                    color={Colors.white}
                    style={styles.maskBack}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <MaskLoading refreshing={loading} />
        </View>
    );
};
export default myVideoPlayer;
const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.backgroundColor,
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: 45,
    },
    maskBox: {
        flex: 1,
        position: "absolute",
        zIndex: 9,
    },
    maskBack: {
        marginTop: 50,
        marginLeft: 15,
    },
    videoPlayer: {
        width: '100%',
    },
});