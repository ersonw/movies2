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
import {FirstRoute, SecondRoute} from "./tools";
import moment from "moment";
// @ts-ignore

var {width, height} = Dimensions.get('window');
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
    const {navigation,route} = props;
    const {params} = route;
    const {login} = (params as any);
    const [loading,setLoading,] = useState(false);
    const [register,setRegister,] = useState(!login);
    const [platform,setPlatform] = useState("");
    const [deviceId,setDeviceId] = useState("");

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
    const [count,setCount] = useState(false);
    const [checkPhone,setCheckPhone] = useState(false);
    const [showPasswd,setShowPasswd] = useState(false);
    const [showPasswd1,setShowPasswd1] = useState(false);
    const [countTime,setCountTime] = useState(0);
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [password1,setPassword1] = useState('');
    const [code,setCode] = useState('');
    const [codeId,setCodeId] = useState('');
    if (countTime>0&&!count){
        countDown({setCountTime,countTime});
    }
    return (
        <View>
            <ImageBackground source={require('../../assets/background/login.png')} imageStyle={styles.bkImage} >
                <View style={styles.headerBox}>
                    <Text style={[styles.headerText,{marginBottom: 35}]}>欢迎来到23AV！</Text>
                    <Text style={[styles.headerText,{marginBottom: 9}]}>Hi</Text>
                </View>
                <View style={[styles.bodyBox,{height: layout.height - 200}]}>
                    <View style={styles.container}>
                        {register?(
                            <View
                                style={{
                                    flex: 1,
                                    width: '87%',
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:Colors.white,
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                        }}
                                    >注册</Text>
                                </View>
                                <View style={{marginTop: 15,}}>
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
                                        onFocus={()=>{}}
                                        onBlur={()=>{
                                            setCheckPhone(false);
                                            if (phone.length > 10){
                                                setCheckPhone(true);
                                            }
                                        }}
                                        style={{color: Colors.white,}}
                                        rightIcon={
                                            <View style={{flexDirection: 'row'}}>
                                                {checkPhone ? (<Icon name="check" color={Colors.orange} size={24} />):
                                                    (<Icon name="clear" color={Colors.red} size={24} />)}
                                            </View>
                                        }
                                    />
                                </View>
                                <View style={{marginTop: 15,}}>
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
                                            value={code}
                                            onChangeText={setCode}
                                            onBlur={()=>{}}
                                            onFocus={()=>{}}
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
                                                    {code.length===6 ? (<Icon name="check" color={Colors.orange} size={24} />):
                                                        (<Icon name="clear" color={Colors.red} size={24} />)}
                                                </View>
                                            }
                                        />
                                        <View
                                            style={{
                                                backgroundColor: (countTime > 0)?Colors.headerBackgroundColor:Colors.primary,
                                                borderRadius: 30,
                                                marginLeft: 9,
                                            }}
                                        >
                                            {countTime > 0?(
                                                <Text
                                                    style={{
                                                        color:Colors.white,
                                                        margin: 6,
                                                    }}
                                                >
                                                    {"重新发送"+moment(new Date().setHours(0, 0, 0, 0)).add(countTime, 'second').format('mm:ss')}
                                                </Text>
                                            ):(
                                                <TouchableOpacity
                                                    onPress={()=>{
                                                        let phoneNumber = phone;
                                                        if(!phone.startsWith('+')){
                                                            phoneNumber=`+86${phone}`;
                                                        }
                                                        sendCodeSms({
                                                            phone: phoneNumber,
                                                            setCountTime,
                                                            setCodeId,
                                                        });
                                                        setCount(true);
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
                                <View style={{marginTop: 15,}}>
                                    <Text style={{color: Colors.white,marginLeft: 10,}}>密码</Text>
                                    <Input
                                        autoCompleteType={undefined}
                                        returnKeyType="done"
                                        underlineColorAndroid="transparent"
                                        placeholder="请输入密码"
                                        multiline={false}
                                        secureTextEntry={!showPasswd}
                                        value={password}
                                        onChangeText={setPassword}
                                        onBlur={()=>{}}
                                        onFocus={()=>{}}
                                        style={{color: Colors.white,}}
                                        rightIcon={
                                            <View style={{flexDirection: 'row'}}>
                                                {password.length>0 && (
                                                    <TouchableOpacity
                                                        onPress={()=>setShowPasswd(!showPasswd)}
                                                    >
                                                        <Entypo name={showPasswd?"eye-with-line":"eye"} color={Colors.white} size={24} />
                                                    </TouchableOpacity>
                                                )}
                                                {password.length < 6 && (<Icon name="clear" color={Colors.red} size={24} />)}
                                            </View>
                                        }
                                    />
                                </View>
                                <View style={{marginTop: 15,}}>
                                    <Text style={{color: Colors.white,marginLeft: 10,}}>确认密码</Text>
                                    <Input
                                        autoCompleteType={undefined}
                                        returnKeyType="done"
                                        underlineColorAndroid="transparent"
                                        placeholder="请再次确认密码"
                                        multiline={false}
                                        secureTextEntry={!showPasswd1}
                                        value={password1}
                                        onChangeText={setPassword1}
                                        onBlur={()=>{}}
                                        onFocus={()=>{}}
                                        style={{color: Colors.white,}}
                                        rightIcon={
                                            <View style={{flexDirection: 'row'}}>
                                                {password.length>0 && (
                                                    <TouchableOpacity
                                                        onPress={()=>setShowPasswd1(!showPasswd1)}
                                                    >
                                                        <Entypo name={showPasswd1?"eye-with-line":"eye"} color={Colors.white} size={24} />
                                                    </TouchableOpacity>
                                                )}
                                                {password1 !== password && (<Icon name="clear" color={Colors.red} size={24} />)}
                                            </View>
                                        }
                                    />
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
                                            if (!code){
                                                Toast.show({
                                                    type: 'error',
                                                    text1: '请输入验证码',
                                                });
                                                return;
                                            }
                                            setLoading(true);
                                            postRequest(NetWorkUtil.register,{
                                                params: {
                                                    code: code,
                                                    codeId: codeId,
                                                    password: md5.hex_md5(password),
                                                },
                                            }).then(({error,data}: any)=>{
                                                setLoading(false);
                                                if (!error){
                                                    console.log(data);
                                                    const {nickname, token} = data;
                                                    Toast.show({
                                                        type: 'success',
                                                        text1: `${nickname} 注册成功！`,
                                                        text2: `欢迎新用户【${phone}】加入春潮视频社区`,
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
                                            }}>注册并登录</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            setRegister(false);
                                        }}
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
                                            }}>已有账号?</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ):(
                            <TabView
                                style={[styles.tabView,{ width: layout.width - 60 }]}
                                navigationState={{ index, routes }}
                                renderScene={SceneMap({
                                    first: ()=>FirstRoute({
                                        ...props,
                                        setIndex,
                                        setLoading,
                                        deviceId,
                                        platform,
                                        setRegister:()=>setRegister(true),
                                    }),
                                    second: ()=>SecondRoute({
                                        ...props,
                                        setIndex,
                                        setLoading,
                                        deviceId,
                                        platform,
                                        setRegister:()=>setRegister(true),
                                    }),
                                })}
                                renderTabBar={renderTabBar}
                                onIndexChange={setIndex}
                                // initialLayout={{ width: layout.width - 65, height: layout.height-333 }}
                                // tabBarPosition='bottom'
                            />
                        )}
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
    fetchRequest(NetWorkUtil.registerSms.replace('{phone}',phone),{}).then((data: any) => {
        // console.log(data);
        const { id } = data;
        setCodeId(id);
        countDown({setCountTime});
        Toast.show({
            type: 'success',
            text2: '注册验证码！',
            text1: '验证码已成功发送',
        });
    });
}
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
