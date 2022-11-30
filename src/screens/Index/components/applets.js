import {Alert, Button, Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constants/Colors';
import FileUtil from '../../../utils/fileUtil';
import {Component, useState} from 'react';
import MessageBox from '../../../../modal/MessageBox';

const {width} = Dimensions.get('window');
const appletsPath = 'applets/index';
const CustomHeaderWebView = (props) => {
    const {uri, onLoadStart, ...restProps} = props;
    const [currentURI, setURI] = useState(props.source.uri);
    const newSource = {...props.source, uri: currentURI};

    return (
        <WebView
            {...restProps}
            source={newSource}
            onShouldStartLoadWithRequest={(request) => {
                // If we're loading the current URI, allow it to load
                if (request.url === currentURI) {
                    return true;
                }
                // We're loading a new URL -- change state first
                setURI(request.url);
                return false;
            }}
        />
    );
};
export default class Applets extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.webView = React.createRef();
    }

    componentDidMount() {
        const {route, navigation} = this.props;
        const {params} = route;
        this.setState({route, params, navigation});
    }

    render() {
        const html = `
      <html>
      <head></head>
      <body>
        <script>
          setTimeout(function () {
            window.ReactNativeWebView.postMessage("Hello!")
          }, 2000)
        </script>
      </body>
      </html>
    `;
        const injectedJavascript = '(function() {window.postMessage = function(data) {window.ReactNativeWebView.postMessage(data);};})()';
        return (
            <View style={styles.container}>
                <WebView
                    ref={this.webView}
                    // source={{html}}
                    source={{
                        // uri: 'http://172.21.68.12:8080/api/test',
                        // uri: 'https://github.com/react-native-webview/react-native-webview',
                        // baseUrl: `${FileUtil.baseUri}/${appletsPath}/index.html`,
                        html,
                        headers: {'Token': 'sdasdsadsadsad'},
                    }}
                    sharedCookiesEnabled={true}
                    applicationNameForUserAgent="ChunChao2.0"
                    onShouldStartLoadWithRequest={(request) => {
                        // console.log(request);
                        return true;
                    }}
                    automaticallyAdjustContentInsets={false}
                    onMessage={(event) => {
                        console.log(event.nativeEvent.data);
                    }}
                    injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
                    injectedJavaScriptForMainFrameOnly={false}

                    /* We set this property in each frame */
                    injectedJavaScriptBeforeContentLoaded={`console.log("executing injectedJavaScriptBeforeContentLoaded... " + (new Date()).toString());`}

                    /* We read the colourToUse property in each frame to recolour each frame */
                    injectedJavaScript={injectedJavascript}
                />
                <View style={{...styles.header, width: width}}>
                    <View style={styles.headerButtonBox}>
                        <View style={styles.headerButton}>
                            <Icon
                                name="settings-backup-restore"
                                size={25}
                                color={Colors.white}
                                onPress={() => {
                                    this.webView.current.reload();
                                    // MessageBox({title:'绑定手机号 ', context: '应国家政策要求需强化实名制认证，请先绑定手机号获取权限'});
                                }}
                            />
                            <Icon
                                name="adjust"
                                size={25}
                                color={Colors.white}
                                style={{marginLeft: 6}}
                                onPress={() => this.state.navigation.goBack()}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    swiper: {
        display: 'flex',
    },
    swiperImage: {
        margin: '2%',
        height: '96%',
        width: '96%',
        borderRadius: 9,
    },
    container: {
        flex: 1,
        // marginTop: 45,
        backgroundColor: Colors.backgroundColor,
    },
    header: {
        backgroundColor: 'transparent',
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        marginTop: 45,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    headerButtonBox: {
        // width: 60,
        marginRight: 15,
        backgroundColor: 'black',
        opacity: 0.2,
        borderRadius: 21,
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4.5,
        marginBottom: 4.5,
        marginLeft: 12,
        marginRight: 12,
    },
});