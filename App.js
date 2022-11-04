import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, ImageBackground, Platform, NativeModules } from 'react-native';
import CodePush from 'react-native-code-push';
import RootStackScreen from './src/navigation/RootStackScreen';
import OpeninstallModule from 'openinstall-react-native';
import { G, Path, Svg } from 'react-native-svg';
import { Alert, Button } from 'react-native';
import { initSDK, show } from './modal/MeiQia';

//定义全局的变量,进行更好的适配
// var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
class App extends Component<{}> {
  constructor() {
    super();
    this.state = { restartAllowed: true, updateState: false, meiQiaClientId: '' };
    CodePush.allowRestart();
  }

  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: '正在获取更新版本.' });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: '正在下载升级补丁.', updateState: true });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: '等待用户操作.', updateState: true });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: '正在安装更新补丁.', updateState: true });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: '已经是最新版本.', progress: false, updateState: false });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: '用户取消更新.', progress: false, updateState: true });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ syncMessage: '更新安装成功，等待重启生效.', progress: false, updateState: true });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: '未知错误.', progress: false, updateState: true });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ progress });
  }
  /** Update is downloaded silently, and applied on restart (recommended) */
  sync() {
    CodePush.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  }
  componentDidMount() {
    NativeModules.RNToolsManager.getAppVersionPackage(event => {
      if (Platform.OS === 'ios') {
        console.log(`IOS IFV:${event.identifierForVendor}`);
      } else if (Platform.OS === 'android') {
        console.log(`androidId:${event.androidId}`);
      }
    });
    initSDK({
      appKey: '55584b4e99ced1153307db4d80b19c97',
      secretKey: '$2a$04$XIszp1eXvt2w9.3J9x0.Q.YLyIg5c7z3/n3E5/9ICK2LGPP4jYBfy',
    }).then(event => {
      this.setState({ meiQiaClientId: event.clientId });
    });
    // this.sync();
    OpeninstallModule.init();
    if (Platform.OS === 'android') {
      //Android平台需要运行的代码
      OpeninstallModule.getWakeUpAlwaysCallback(map => {
        if (map) {
          console.log(map);
        }
      });
    } else if (Platform.OS === 'ios') {
      //iOS平台需要运行的代码
      //该方法用于监听app通过univeral link或scheme拉起后获取唤醒参数
      this.receiveWakeupListener = map => {
        if (map) {
          console.log(map);
        }
      };
      OpeninstallModule.addWakeUpListener(this.receiveWakeupListener);
    }
    OpeninstallModule.getInstall(15, map => {
      if (map) {
        console.log(map);
      }
    });
  }

  componentWillUnMount() {
    if (Platform.OS === 'ios') {
      OpeninstallModule.removeWakeUpListener(this.receiveWakeupListener); //移除监听
    }
  }
  render() {
    return this.update();
    // return RootStackScreen();
    // return this.state.updateState ? this.update() : RootStackScreen();
  }
  onButtonClick(event) {
    show(
      {
        clientInfo: {
          name: '31312游客312322',
          avatar: 'https://s3.cn-north-1.amazonaws.com.cn/pics.meiqia.bucket/1dee88eabfbd7bd4',
          gender: '男',
          tel: '1300000000',
        },
        clientId: {
          id: this.state.meiQiaClientId,
        },
      },
      _ => {
        console.log(_);
      },
    );
  }
  update() {
    let progressView;
    let progres;
    if (this.state.progress) {
      progres = `M5 8 l${(this.state.progress.receivedBytes / this.state.progress.totalBytes) * 100 * (215 / 100)} 0`;
      progressView = (
        <Svg height="24" width="225">
          <G fill="none" stroke="#3d5875">
            <Path strokeLinecap="round" strokeWidth="8" d="M5 8 l215 0" />
          </G>
          <G fill="none" stroke="#00e0ff">
            <Path strokeLinecap="round" strokeWidth="8" d={progres} />
          </G>
        </Svg>
      );
    }
    return (
      <ImageBackground source={require('./images/SplashBKImages.png')} style={styles.container}>
        <View style={styles.iconview}>
          <Button onPress={this.onButtonClick.bind(this)} title={'打开客服'} />
          {progressView}
          <Text style={styles.messages}>{this.state.syncMessage || ''}</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    // paddingTop: 50,
    flex: 1,
    alignItems: 'center', //横向排列
    justifyContent: 'flex-end', //纵向排列
    width: null,
    height: null,
  },
  iconview: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  image: {
    margin: 30,
    width: Dimensions.get('window').width - 100,
    height: (365 * (Dimensions.get('window').width - 100)) / 651,
  },
  messages: {
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
  },
  restartToggleButton: {
    color: 'blue',
    fontSize: 17,
  },
  syncButton: {
    color: 'green',
    fontSize: 17,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
});

/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };

App = CodePush(codePushOptions)(App);

export default App;
