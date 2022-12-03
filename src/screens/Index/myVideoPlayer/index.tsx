import Colors, {ScreenProps} from "../../../constants/Colors";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
// @ts-ignore
import VideoPlayer from 'react-native-video-player';
// @ts-ignore
import MoVideoPlayer from 'react-native-mo-video-player';
import NetworkError from "../../../components/shared/NetworkError";
import * as React from "react";
import useFetchData from "../../../hooks/useFetchData";
import NetWorkUtil from "../../../utils/NetWorkUtil";
import {MaskLoading} from "../../../components/MaskLoading";
import {createRef, useState} from "react";

const {width, height} = Dimensions.get('window');
const myVideoPlayer = (props: ScreenProps)=>{
    const { navigation, route } = props;
    const [ playerRef ] = useState(createRef());
    const {params} = route;
    const {id} = (params as any);
    if (!id) {
        return <NetworkError onReload={() => navigation.goBack()} text='系统错误，请点击' buttonTitle='返回上一页'/>;
    }
    const url = NetWorkUtil.videoPlayer.replace('{id}', id);
    const {data, loading, error, onReload, refreshing, onRefresh,} = useFetchData(url, {player:{}},navigation);
    if (error) {
        return <NetworkError onReload={() => onReload(url)} text='网络错误，请点击' buttonTitle='重新加载'/>;
    }
    const {player} = data;
    // console.log(player.vodPlayUrl);
    return (
        <>
            <View style={styles.body}>
                <View style={styles.container}>
                    {/*<VideoPlayer*/}
                    {/*    style={styles.videoPlayer}*/}
                    {/*    ref={playerRef}*/}
                    {/*    autoplay={true}*/}
                    {/*    video={{ uri: player.vodPlayUrl }}*/}
                    {/*    videoWidth={1600}*/}
                    {/*    videoHeight={900}*/}
                    {/*    thumbnail={{ uri: player.picThumb }}*/}
                    {/*/>*/}
                    <MoVideoPlayer
                        ref={playerRef}
                        autoplay={true}
                        source={{uri: player.vodPlayUrl}}
                        poster={player.picThumb}
                        playInBackground={false}
                        title={player.title}
                        style={{width: width,height: height / 3}}
                        showHeader={true}
                        showSeeking10SecondsButton={true}
                        showCoverButton={true}
                        showFullScreenButton={true}
                        showSettingButton={true}
                        showMuteButton={true}
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
            </View>
            <MaskLoading refreshing={loading} />
        </>
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