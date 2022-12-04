import {
    Dimensions,
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
import fetchRequest, {postRequest} from "../../utils/fetchRequest";
// @ts-ignore
import md5 from "react-native-md5";
import RNToolsManager from "../../../modal/RNToolsManager";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-community/async-storage";
// @ts-ignore
import moment from "moment/moment";
export type TabViewRouteProps = {
    callIndex: (index: number)=> void,
    loading: boolean,
    setLoading: any,
    deviceId: string,
    platform: string,
    phone: string,
    setPhone: (v: string)=>void,
} & ScreenProps;
var {width, height} = Dimensions.get('window');
const FirstRoute = (props: {
    password: string,
    setPassword: (v: string)=>void,
}&TabViewRouteProps) => {
    const {callIndex,setLoading,navigation,phone,setPhone,password,setPassword} = props;
    const [check,setCheck,] = useState(false);
    const [show,setShow] = useState(false);
    const [phoneText,setPhoneText] = useState("");
    const [passwordText,setPasswordText] = useState("");
    if (!phoneText&&phone){
        setPhoneText(phone);
    }
    if (!passwordText&&password){
        setPasswordText(password);
    }
    return (
        <>
            <View style={{flex: 1, backgroundColor: Colors.headerBackgroundColor,}}>
                <View style={{marginTop: 30,}}>
                    <Text style={{color: Colors.white,marginLeft: 10,}}>用户名</Text>
                    <Input
                        keyboardType="default"
                        autoCompleteType={undefined}
                        returnKeyType="next"
                        underlineColorAndroid="transparent"
                        placeholder="请输入手机号或者用户名"
                        multiline={false}
                        value={phoneText||phone}
                        onChangeText={setPhoneText}
                        onFocus={()=>{
                            if (!phoneText){
                                setPhoneText(phone);
                            }
                        }}
                        onBlur={()=>{
                            setCheck(false);
                            if (new RegExp(/^\+?[1-9][0-9]*$/).test(phoneText)){
                                if (phoneText.length > 10) setCheck(true);
                            }else {
                                if (phoneText.length > 5) setCheck(true);
                            }
                            setPhone(phoneText);
                        }}
                        style={{color: Colors.white,}}
                        rightIcon={
                            <View style={{flexDirection: 'row'}}>
                                { check ? (<Icon name="check" color={Colors.orange} size={24} />):
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
                        value={passwordText || password}
                        onChangeText={setPasswordText}
                        onBlur={()=>{
                            setPassword?.(passwordText);
                        }}
                        onFocus={()=>{
                            if (!passwordText&&password){
                                setPasswordText(password);
                            }
                        }}
                        style={{color: Colors.white,}}
                        rightIcon={
                            <View style={{flexDirection: 'row'}}>
                                {passwordText.length>0 && (
                                    <TouchableOpacity
                                        onPress={()=>setShow(!show)}
                                    >
                                        <Entypo name={show?"eye-with-line":"eye"} color={Colors.white} size={24} />
                                    </TouchableOpacity>
                                )}
                                {passwordText.length === 0 && (<Icon name="clear" color={Colors.red} size={24} />)}
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
                            setLoading(true);
                            if (!check && password) {
                                Toast.show({
                                    type: 'error',
                                    text1: '账号密码长度不对!',
                                });
                                setLoading(false);
                                return;
                            }
                            let username = phone;
                            if (new RegExp(/^\+?[1-9][0-9]*$/).test(phone)){
                                if (!phone.startsWith('+')){
                                    username = `+86${phone}`;
                                }
                            }
                            postRequest(NetWorkUtil.userLogin,{
                                params: {
                                    username: username,
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
const SecondRoute = (props: {
    codeId: string,
    setCodeId: (v: string)=>void,
    code: string,
    setCode: (v: string)=>void,
    countTimeRoot: number,
    setCountTimeRoot: (v: number)=>void,
} & TabViewRouteProps) => {
    const {
        callIndex,
        setLoading,
        navigation,
        phone,
        setPhone,
        code,
        setCode,
        codeId,
        setCodeId,
        countTimeRoot,
        setCountTimeRoot,
    } = props;
    const [phoneText,setPhoneText] = useState("");
    const [codeText,setCodeText] = useState("");
    // const [codeIdText,setCodeIdText] = useState("");
    const [check,setCheck,] = useState(false);
    const [countTime,setCountTime] = useState(0);
    // if (countTime == 0&& countTimeRoot>0){
    //     setCountTime(countTimeRoot);
    // }
    // if (countTimeRoot>0){
    //     countDown({setCountTime:setCountTimeRoot,countTime:countTimeRoot});
    // }
    if (!phoneText&&phone){
        setPhoneText(phone);
    }
    // if (!codeText&&code){
    //     setCodeText(code);
    // }
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
                        value={phoneText||phone}
                        onChangeText={setPhoneText}
                        onFocus={()=>{
                            if (!phoneText&&phone){
                                setPhoneText(phone);
                            }
                        }}
                        onBlur={()=>{
                            setCheck(false);
                            if (phoneText.length > 10){
                                setCheck(true);
                            }
                            setPhone(phoneText);
                        }}
                        style={{color: Colors.white,}}
                        rightIcon={
                            <View style={{flexDirection: 'row'}}>
                                {check ? (<Icon name="check" color={Colors.orange} size={24} />):
                                    (<Icon name="clear" color={Colors.red} size={24} />)}
                            </View>
                        }
                    />
                </View>
                <View style={{marginTop: 30,}}>
                    <Text style={{color: Colors.white,marginLeft: 10,}}>验证码</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: width - 90,
                        }}
                    >
                        <Input
                            keyboardType="number-pad"
                            autoCompleteType={undefined}
                            returnKeyType="done"
                            underlineColorAndroid="transparent"
                            placeholder="请输入短信验证码"
                            multiline={false}
                            value={codeText||code}
                            onChangeText={setCodeText}
                            onBlur={()=>{
                                setCode(codeText);
                            }}
                            onFocus={()=>{
                                if (code&&!codeText){
                                    setCodeText(code);
                                }
                            }}
                            style={{
                                color: Colors.white,
                            }}
                            inputContainerStyle={{
                                // width: '80%',
                            }}
                            containerStyle={{
                                width: '70%',
                                // backgroundColor: Colors.white,
                            }}
                            rightIcon={
                                <View style={{flexDirection: 'row'}}>
                                    {code ? (<Icon name="check" color={Colors.orange} size={24} />):
                                        (<Icon name="clear" color={Colors.red} size={24} />)}
                                </View>
                            }
                        />
                        <View
                            style={{
                                backgroundColor: (countTime&&countTime > 0)?Colors.headerBackgroundColor:Colors.primary,
                                borderRadius: 30,
                                marginLeft: 9,
                            }}
                        >
                            {countTime&&countTime > 0?(
                                <Text
                                    style={{
                                        color:Colors.white,
                                        margin: 6,
                                    }}
                                >
                                    {/*等待中*/}
                                    {"重新发送"+moment(new Date().setHours(0, 0, 0, 0)).add(countTime, 'second').format('mm:ss')}
                                </Text>
                            ):(
                                <TouchableOpacity
                                    onPress={()=>{
                                        setPhone(phoneText);
                                        if(phoneText.startsWith('+')){
                                            sendCodeSms({
                                                phone:phoneText||phone,
                                                setCountTime,
                                                setCodeId,
                                            });
                                        }else {
                                            sendCodeSms({
                                                phone:`+86${phoneText}`,
                                                setCountTime,
                                                setCodeId,
                                            });
                                        }
                                    }}
                                >
                                    <Text style={{
                                        color:Colors.white,
                                        margin: 6,
                                    }}>{
                                        codeId ? "重新发送":"获取验证码"
                                    }</Text>
                                </TouchableOpacity>
                            )
                            }
                        </View>
                    </View>
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
                            // const t1 =codeIdText;
                            // const t2 =countTime;
                            // setCodeId(codeIdText);
                            // setCountTimeRoot(t2);
                            callIndex(0);
                        }}
                    >
                        <Text style={{color: Colors.date}}>密码登录?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: 15}}>
                    <TouchableOpacity
                        onPress={()=>{
                            if (!codeId){
                                Toast.show({
                                    type: 'error',
                                    text1: '请先发送验证码',
                                });
                                return;
                            }
                            if (!codeText){
                                Toast.show({
                                    type: 'error',
                                    text1: '请输入验证码',
                                });
                                return;
                            }
                            setLoading(true);
                            postRequest(NetWorkUtil.userLoginPhone,{
                                params: {
                                    code: codeText||code,
                                    codeId: codeId,
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
const countDown = ({setCountTime,countTime=-1}:{setCountTime:(v:number)=>void,countTime?: number})=>{
    if (countTime===-1){
        countTime = 120;
        setCountTime(countTime);
    }
    const _timer = setInterval(() => {
        if (countTime > 0){
            countTime--;
        }else {
            clearInterval(_timer);
        }
        setCountTime(countTime);
    },1000);
};
const sendCodeSms = ({phone,setCountTime, setCodeId,}: {
    phone: string,
    setCountTime: (v: number) => void,
    setCodeId: (v: string) => void,
}) => {
    if (phone.length == 0) {
        Toast.show({
            type: 'error',
            text1: '手机号码不能为空!',
        });
        return;
    }
    fetchRequest(NetWorkUtil.userLoginSms.replace('{phone}',phone),{}).then((data: any) => {
        // console.log(data);
        const { id } = data;
        setCodeId(id);
        countDown({setCountTime});
        Toast.show({
            type: 'success',
            text2: '发送验证码！',
            text1: '验证码已成功发送',
        });
    });
}
export const Login = (props: ScreenProps) => {
    const {navigation} = props;
    const [loading,setLoading,] = useState(false);
    const [platform,setPlatform] = useState("");
    const [deviceId,setDeviceId] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [code,setCode] = useState("");
    const [codeId,setCodeId] = useState("");
    const [countTime,setCountTime] = useState(0);

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: '密码登录' },
        { key: 'second', title: '验证码登录' },
    ]);
    RNToolsManager.getAppVersionPackage((event: { identifierForVendor: React.SetStateAction<string>; name: React.SetStateAction<string>; board: React.SetStateAction<string>; androidId: React.SetStateAction<string>; }) => {
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
                                first: ()=>FirstRoute({
                                    ...props,
                                    callIndex: setIndex,
                                    loading,
                                    setLoading,
                                    deviceId,
                                    platform,
                                    phone,
                                    setPhone,
                                    password,
                                    setPassword,
                                }),
                                second: ()=>SecondRoute({
                                    ...props,
                                    callIndex: setIndex,
                                    loading,
                                    setLoading,
                                    deviceId,
                                    platform,
                                    phone,
                                    setPhone,
                                    code,
                                    setCode,
                                    codeId,
                                    setCodeId,
                                    countTimeRoot: countTime,
                                    setCountTimeRoot: setCountTime,
                                }),
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
