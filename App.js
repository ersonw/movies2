import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Alert } from 'react-native';

import CodePush from 'react-native-code-push';
import RootStackScreen from './src/navigation/RootStackScreen';
import OpeninstallModule from 'openinstall-react-native';
//定义全局的变量,进行更好的适配
// var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
class App extends Component<{}> {
  constructor() {
    super();
    this.state = { restartAllowed: true, updateState: false };
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

  toggleAllowRestart() {
    this.state.restartAllowed ? CodePush.disallowRestart() : CodePush.allowRestart();

    this.setState({ restartAllowed: !this.state.restartAllowed });
  }

  getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then(
      (metadata: LocalPackage) => {
        this.setState({ syncMessage: metadata ? JSON.stringify(metadata) : 'Running binary version', progress: false });
      },
      (error: any) => {
        this.setState({ syncMessage: 'Error: ' + error, progress: false });
      },
    );
  }

  /** Update is downloaded silently, and applied on restart (recommended) */
  sync() {
    CodePush.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  }

  /** Update pops a confirmation dialog, and then immediately reboots the app */
  syncImmediate() {
    CodePush.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  }
  componentDidMount() {
    console.log('componentDidMount');
    //该方法用于监听app通过univeral link或scheme拉起后获取唤醒参数
    this.receiveWakeupListener = map => {
      if (map) {
        //do your work here
        // console.log(JSON.stringify(map));
      }
      // console.log(JSON.stringify(map));
      // Alert.alert('唤醒参数', JSON.stringify(map));
    };
    OpeninstallModule.addWakeUpListener(this.receiveWakeupListener);
  }

  componentWillUnMount() {
    OpeninstallModule.removeWakeUpListener(this.receiveWakeupListener); //移除监听
  }
  render() {
    this.sync();
    OpeninstallModule.init();
    OpeninstallModule.getInstall(10, map => {
      if (map) {
        //do your work here
      }
      // Alert.alert('安装参数', JSON.stringify(map));
    });
    OpeninstallModule.getWakeUpAlwaysCallback(map => {
      if (map) {
        //do your work here
      }
      // Alert.alert('唤醒参数', JSON.stringify(map));
    });
    // return this.update();
    return this.state.updateState ? this.update() : RootStackScreen();
    // let progressView;
    //
    // if (this.state.progress) {
    //   progressView = (
    //     <Text style={styles.messages}>
    //       {this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received
    //     </Text>
    //   );
    // }
    //
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.welcome}>Welcome to CodePush!</Text>
    //     <TouchableOpacity onPress={this.sync.bind(this)}>
    //       <Text style={styles.syncButton}>Press for background sync</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={this.syncImmediate.bind(this)}>
    //       <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
    //     </TouchableOpacity>
    //     {progressView}
    //     <Image style={styles.image} resizeMode={'contain'} source={require('./images/laptop_phone_howitworks.png')} />
    //     <TouchableOpacity onPress={this.toggleAllowRestart.bind(this)}>
    //       <Text style={styles.restartToggleButton}>Restart {this.state.restartAllowed ? 'allowed' : 'forbidden'}</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={this.getUpdateMetadata.bind(this)}>
    //       <Text style={styles.syncButton}>Press for Update Metadata</Text>
    //     </TouchableOpacity>
    //     <Text style={styles.messages}>{this.state.syncMessage || ''}</Text>
    //   </View>
    // );
  }
  update() {
    let progressView;

    if (this.state.progress) {
      progressView = (
        <Text style={styles.messages}>
          {this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received
        </Text>
      );
    }
    return (
      <ImageBackground source={require('./images/SplashBKImages.jpg')} style={styles.container}>
        <View style={styles.iconview}>
          {/*<Text style={styles.welcome}>应用检查更新...</Text>*/}
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
