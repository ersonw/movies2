import {Button, Text, View} from 'react-native';
import * as React from 'react';
import styles from './styles';
import WebView from 'react-native-webview';
const Applets = ({route,navigation}) => {
    const { params } = route;
    return (
        <WebView source={{ uri: 'https://reactnative.dev/' }} />
    );
    // return (
    //     <View style={styles.container}>
    //         <Text style={{fontSize: 24,color: '#ffff'}}>视频课程页 {params?.title}</Text>
    //
    //         <Button
    //             title="跳转到视频章节页"
    //             onPress={() =>
    //                 navigation.navigate('ChapterStack', {screen: 'Chapters'})
    //             }
    //         />
    //     </View>
    // );
};
export default Applets;