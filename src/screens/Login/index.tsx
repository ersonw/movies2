import {
    ImageBackground, Platform, StyleProp,
    StyleSheet,
    Text,
    TextStyle, TouchableOpacity,
    useWindowDimensions,
    View,
    ViewStyle
} from "react-native";
import Colors, {ScreenProps} from "../../constants/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {MaskLoading} from "../../components/MaskLoading";
import * as React from "react";
import {usePostData} from "../../hooks/useFetchData";
import NetWorkUtil from "../../utils/NetWorkUtil";
import {useState} from "react";
import {
    NavigationState,
    Route,
    SceneMap,
    SceneRendererProps,
    TabBar,
    TabBarIndicatorProps,
    TabBarItemProps,
    TabView
} from "react-native-tab-view";
import {Scene, Event} from "react-native-tab-view/lib/typescript/src/types";
import {Input} from "react-native-elements";
import {postRequest} from "../../utils/fetchRequest";
// @ts-ignore
import md5 from "react-native-md5";
import RNToolsManager from "../../../modal/RNToolsManager";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-community/async-storage";
export type TabViewRouteProps = {
    callIndex: (index: number)=> void,
    loading: boolean,
    setLoading: any,
    deviceId: string,
    platform: string,
} & ScreenProps;
const FirstRoute = (props: TabViewRouteProps) => {
    const {callIndex,loading,setLoading,navigation} = props;
    // const [loading,setLoading,] = useState(false);
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [show,setShow] = useState(false);
    // const {data, loading, error, onReload } = usePostData("/api/test", {},);
    // console.log(data);
    return (
        <>
            <View style={{flex: 1, backgroundColor: Colors.headerBackgroundColor,}}>
                <View style={{marginTop: 30,}}>
                    <Text style={{color: Colors.white,marginLeft: 10,}}>手机号</Text>
                    <Input
                        keyboardType="phone-pad"
                        autoCompleteType={undefined}
                        returnKeyType="next"
                        underlineColorAndroid="transparent"
                        placeholder="请输入11位手机号"
                        multiline={false}
                        value={phone}
                        onChangeText={setPhone}
                        style={{color: Colors.white,}}
                        rightIcon={
                            <View style={{flexDirection: 'row'}}>
                                {phone.length === 11 ? (<Icon name="check" color={Colors.orange} size={24} />):
                                    (<Icon name="clear" color={Colors.red} size={24} />)}
                            </View>
                        }
                    />
                </View>
                <View style={{marginTop: 30,}}>
                    <Text style={{color: Colors.white,marginLeft: 10,}}>密码</Text>
                    <Input
                        autoCompleteType={undefined}
                        returnKeyType="done"
                        underlineColorAndroid="transparent"
                        placeholder="请输入密码"
                        multiline={false}
                        secureTextEntry={!show}
                        value={password}
                        onChangeText={setPassword}
                        style={{color: Colors.white,}}
                        rightIcon={
                            <View style={{flexDirection: 'row'}}>
                                {password.length > 0 && (
                                    <TouchableOpacity
                                        onPress={()=>setShow(!show)}
                                    >
                                        <Entypo name={show?"eye-with-line":"eye"} color={Colors.white} size={24} />
                                    </TouchableOpacity>
                                )}
                                {password.length === 0 && (<Icon name="clear" color={Colors.red} size={24} />)}
                            </View>
                        }
                    />
                </View>
                <View
                    style={{
                        width: '100%',
                        marginBottom: 15,
                        alignItems: 'flex-end',
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>{
                            callIndex(1);
                        }}
                    >
                        <Text style={{color: Colors.date}}>忘记密码?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: 15}}>
                    <TouchableOpacity
                        onPress={()=>{
                            // onReload(NetWorkUtil.userLogin,{});
                            setLoading(true);
                            postRequest(NetWorkUtil.userLogin,{
                                params: {
                                    username: `+86${phone}`,
                                    password: md5.hex_md5(password),
                                    deviceId: props.deviceId,
                                    platform: props.platform,
                                },
                            }).then(({error,data}: any)=>{
                                setLoading(false);
                                if (!error){
                                    const {nickname, token} = data;
                                    Toast.show({
                                        type: 'success',
                                        text2: '欢迎回来！',
                                        text1: nickname,
                                    });
                                    AsyncStorage.setItem('userToken',token).then(()=>navigation.goBack());
                                }
                            });
                        }}
                    >
                        <View style={{
                            backgroundColor: '#FF7031',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                        }}>
                            <Text style={{
                                color: Colors.white,
                                marginTop: 12,
                                marginBottom: 12,
                            }}>登录</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{}}
                    >
                        <View style={{
                            marginTop: 30,
                            // backgroundColor: '#FF7031',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                        }}>
                            <Text style={{
                                color: Colors.date,
                                marginTop: 12,
                                marginBottom: 12,
                            }}>注册</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    );
};

const SecondRoute = (props: TabViewRouteProps) => {
    return (<View style={{flex: 1, backgroundColor: '#673ab7'}}/>
    );
};
const bottomLine = (props: any) => {
    // props中传入的每个item宽度
    // const {itemWidth} = this.props;
    return {
        color: Colors.transparent,
        backgroundColor: Colors.transparent,
        // height: 60,
        // width: itemWidth * 0.6,
        // borderRadius: 30,
        // marginLeft: itemWidth * 0.2,
        // marginBottom: 18,
        // backgroundColor: '#FEC60B',
        // elevation: 10,
    };
};

const renderTabBar = (props: JSX.IntrinsicAttributes & SceneRendererProps & { navigationState: NavigationState<Route>; scrollEnabled?: boolean | undefined; bounces?: boolean | undefined; activeColor?: string | undefined; inactiveColor?: string | undefined; pressColor?: string | undefined; pressOpacity?: number | undefined; getLabelText?: ((scene: Scene<Route>) => string | undefined) | undefined; getAccessible?: ((scene: Scene<Route>) => boolean | undefined) | undefined; getAccessibilityLabel?: ((scene: Scene<Route>) => string | undefined) | undefined; getTestID?: ((scene: Scene<Route>) => string | undefined) | undefined; renderLabel?: ((scene: Scene<Route> & { focused: boolean; color: string; }) => React.ReactNode) | undefined; renderIcon?: ((scene: Scene<Route> & { focused: boolean; color: string; }) => React.ReactNode) | undefined; renderBadge?: ((scene: Scene<Route>) => React.ReactNode) | undefined; renderIndicator?: ((props: TabBarIndicatorProps<Route>) => React.ReactNode) | undefined; renderTabBarItem?: ((props: TabBarItemProps<Route> & { key: string; }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) | undefined; onTabPress?: ((scene: Scene<Route> & Event) => void) | undefined; onTabLongPress?: ((scene: Scene<Route>) => void) | undefined; tabStyle?: StyleProp<ViewStyle>; indicatorStyle?: StyleProp<ViewStyle>; indicatorContainerStyle?: StyleProp<ViewStyle>; labelStyle?: StyleProp<TextStyle>; contentContainerStyle?: StyleProp<ViewStyle>; style?: StyleProp<ViewStyle>; gap?: number | undefined; testID?: string | undefined; }) => (
    <TabBar
        {...props}
        activeColor={'white'}
        inactiveColor={'rgba(255,255,255,0.6)'}
        style={{backgroundColor:Colors.headerBackgroundColor}}
        // @ts-ignore
        indicatorStyle={bottomLine(props)}
    />
);
export const Login = (props: ScreenProps) => {
    const {navigation} = props;
    const [loading,setLoading,] = useState(false);
    const [refreshing,setRefreshing] = useState(false);
    const [platform,setPlatform] = useState("");
    const [deviceId,setDeviceId] = useState("");

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: '密码登录' },
        { key: 'second', title: '验证码登录' },
    ]);
    RNToolsManager.getAppVersionPackage((event: any) => {
        // console.log(event);
        if (Platform.OS === 'ios') {
            // console.log(`IOS IFV:${event.deviceToken}\n ${JSON.stringify(event.utsname)}`);
            setDeviceId(event.identifierForVendor);
            setPlatform(event.name);
        } else if (Platform.OS === 'android') {
            // console.log(`androidId:${event.androidId}`);
            setPlatform(event.board);
            setDeviceId(event.androidId);
        }
    });
    return (
        <View>
            <ImageBackground source={require('../../assets/background/login.png')} imageStyle={styles.bkImage} >
                <View style={styles.headerBox}>
                    <Text style={[styles.headerText,{marginBottom: 35}]}>欢迎来到23AV！</Text>
                    <Text style={[styles.headerText,{marginBottom: 9}]}>Hi</Text>
                </View>
                <View style={[styles.bodyBox,{height: layout.height - 200}]}>
                    <View style={styles.container}>
                        <TabView
                            style={[styles.tabView,{ width: layout.width - 60 }]}
                            navigationState={{ index, routes }}
                            renderScene={SceneMap({
                                first: ()=>FirstRoute({...props,callIndex: setIndex,loading,setLoading,deviceId,platform}),
                                second: ()=>SecondRoute({...props,callIndex: setIndex,loading,setLoading,deviceId,platform}),
                            })}
                            renderTabBar={renderTabBar}
                            onIndexChange={setIndex}
                            // initialLayout={{ width: layout.width - 65, height: layout.height-333 }}
                            // tabBarPosition='bottom'
                        />
                    </View>
                </View>
            </ImageBackground>
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
const styles = StyleSheet.create({
    bkImage: {
        width: '100%',
        height: 241,
    },
    body: {
        backgroundColor: Colors.backgroundColor,
        flex: 1,
    },
    headerBox: {
        height: 200,
        flexDirection: 'column-reverse',
        // alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    headerText: {
        color: Colors.white,
        fontWeight: 'bold',
        marginLeft: 15,
        fontSize: 25,
    },
    bodyBox: {
        // flex: 1,
        // marginTop: 220,
        height: '100%',
        width: '100%',
        backgroundColor: Colors.headerBackgroundColor,
        borderTopRightRadius: 42,
        borderTopLeftRadius: 42,
    },
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    tabView: {
        // height: '60%',
        width: '100%',
        marginBottom: 60,
    },
    maskBox: {
        flex: 1,
        position: "absolute",
        zIndex: 10,
    },
    maskBack: {
        marginTop: 50,
        marginLeft: 15,
    },
    videoPlayer: {
        width: '100%',
    },
});