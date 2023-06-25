import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import Colors, {ScreenProps} from "@/constants/Colors";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Toast from "react-native-toast-message";
import fetchRequest, {postRequest} from "@/utils/fetchRequest";
import NetWorkUtil from "@/utils/NetWorkUtil";
import AsyncStorage from "@react-native-community/async-storage";
import * as React from "react";
// @ts-ignore
import md5 from "react-native-md5";
import moment from "moment/moment";
var {width, height} = Dimensions.get('window');
export type TabViewRouteProps = {
    setIndex: (index: number)=> void,
    setRegister: ()=> void,
    setLoading: any,
    deviceId: string,
    platform: string,
} & ScreenProps;
// @ts-ignore
const loginData:{
    phone: string,
    password: string,
    code: string,
    codeId: string,
    countTime: number,
}={
    phone: '',
    password: '',
    code: '',
    codeId: '',
    countTime: 0,
};
export const FirstRoute = (props: TabViewRouteProps) => {
    const {setIndex,setLoading,navigation,setRegister} = props;
    const [check,setCheck,] = useState(false);
    const [show,setShow] = useState(false);
    const [phone,setPhone] = useState(loginData.phone);
    const [password,setPassword] = useState(loginData.password);
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
                        value={phone}
                        onChangeText={(v)=>{
                            loginData.phone = v;
                            setPhone(v);
                        }}
                        onFocus={()=>{}}
                        onBlur={()=>{
                            setCheck(false);
                            if (new RegExp(/^\+?[1-9][0-9]*$/).test(phone)){
                                if (phone.length > 10) setCheck(true);
                            }else {
                                if (phone.length > 5) setCheck(true);
                            }
                            loginData.phone = phone;
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
                        value={password}
                        onChangeText={(v)=>{
                            loginData.password = v;
                            setPassword(v);
                        }}
                        onBlur={()=>{
                            loginData.password = password;
                        }}
                        onFocus={()=>{}}
                        style={{color: Colors.white,}}
                        rightIcon={
                            <View style={{flexDirection: 'row'}}>
                                {password.length>0 && (
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
                            setIndex(1);
                        }}
                    >
                        <Text style={{color: Colors.date}}>忘记密码?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: 15}}>
                    <TouchableOpacity
                        onPress={()=>{
                            setLoading(true);
                            if (!check && password.length === 0) {
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
                                    password: md5.hex_md5(loginData.password),
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
                        onPress={()=>{
                            setRegister();
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
                            }}>注册</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    );
};



export const SecondRoute = (props: TabViewRouteProps) => {
    const {
        setIndex,
        setLoading,
        navigation,
        setRegister
    } = props;
    const [check,setCheck,] = useState(false);
    const [count,setCount] = useState(false);
    const [countTime,setCountTime] = useState(loginData.countTime);
    const [phone,setPhone] = useState(loginData.phone);
    const [code,setCode] = useState(loginData.code);
    if (!count&&countTime>0){
        setCount(true);
        countDown({
            setCountTime: (v)=>{
                loginData.countTime = v;
                setCountTime(v);
            },
            countTime,
        });
    }
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
                        onChangeText={(v)=>{
                            loginData.phone = v;
                            setPhone(v);
                        }}
                        onFocus={()=>{}}
                        onBlur={()=>{
                            setCheck(false);
                            if (phone.length > 10){
                                setCheck(true);
                            }
                            loginData.phone = phone;
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
                            value={code}
                            onChangeText={(v)=>{
                                loginData.code = v;
                                setCode(v);
                            }}
                            onBlur={()=>{
                                loginData.code = code;
                            }}
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
                                    {code ? (<Icon name="check" color={Colors.orange} size={24} />):
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
                                            setCountTime: (v)=>{
                                                loginData.countTime = v;
                                                setCountTime(v);
                                            },
                                            setCodeId:(v: string)=>{
                                                loginData.codeId = v;
                                            },
                                        });
                                        setCount(true);
                                    }}
                                >
                                    <Text style={{
                                        color:Colors.white,
                                        margin: 6,
                                    }}>{
                                        loginData.codeId ? "重新发送":"获取验证码"
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
                            setIndex(0);
                        }}
                    >
                        <Text style={{color: Colors.date}}>密码登录?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: 15}}>
                    <TouchableOpacity
                        onPress={()=>{
                            if (!loginData.codeId){
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
                            postRequest(NetWorkUtil.userLoginPhone,{
                                params: {
                                    code: code,
                                    codeId: loginData.codeId,
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
                        onPress={()=>{
                            setRegister();
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
                            }}>注册</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </>
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
    fetchRequest(NetWorkUtil.userLoginSms.replace('{phone}',phone),{}).then((data: any) => {
        // console.log(data);
        const { id } = data;
        setCodeId(id);
        countDown({setCountTime});
        Toast.show({
            type: 'success',
            text2: '登录验证码！',
            text1: '验证码已成功发送',
        });
    });
}