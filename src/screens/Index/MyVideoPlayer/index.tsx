import Colors, {ScreenProps} from "@/constants/Colors";
import { Dimensions, StyleSheet, Text, View} from "react-native";
// @ts-ignore
import VideoPlayer from 'react-native-video-player';
// @ts-ignore
import MoVideoPlayer from '@/components/MoVideoPlayer';
import NetworkError from "@/components/shared/NetworkError";
import * as React from "react";
import useFetchData from "@/hooks/useFetchData";
import NetWorkUtil from "@/utils/NetWorkUtil";
import {MaskLoading} from "@/components/MaskLoading";

const {width, height} = Dimensions.get('window');
const MyVideoPlayer = (props: ScreenProps)=>{
    const { navigation, route } = props;
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
    // if (loading){
    //     return <MaskLoading refreshing={loading} backgroundColor={Colors.headerBackgroundColor} />
    // }
    const {player} = data;
    // console.log(player);
    return (
        <View style={styles.body}>
            <View
                style={[
                    styles.container,
                   // {...((Platform.OS) === 'android'&&{marginTop: 0})}
                ]}
            >
                { !loading && (
                    <MoVideoPlayer
                        autoPlay={true}
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
                        onReadyForDisplay={()=>{
                        }}
                        onProgress={(e:number)=>{
                            // if (player.trial > 0 && e > player.trial){
                            //     setPlay(false);
                            // }
                        }}
                        callback={()=>{
                            navigation.goBack();
                        }}
                    >
                        <Text style={{color: Colors.white}}>TEST</Text>
                    </MoVideoPlayer>
                )}
            </View>
            <MaskLoading refreshing={loading} />
        </View>
    );
};
export default MyVideoPlayer;
const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.backgroundColor,
        flex: 1,
    },
    container: {
        flex: 1,
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
