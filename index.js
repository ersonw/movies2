import { AppRegistry } from 'react-native';
import 'rn-overlay';
import RootStackScreen from './src/navigation/RootStackScreen';
import { name as appName } from './app.json';
// 图标库
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import App from './App';

// AppRegistry.registerComponent(appName, () => RootStackScreen);
AppRegistry.registerComponent(appName, () => App);

Entypo.loadFont().then(() => {});
SimpleLineIcons.loadFont().then(() => {});
Ionicons.loadFont().then(() => {});
EvilIcons.loadFont().then(() => {});
MaterialIcons.loadFont().then(() => {});
AntDesign.loadFont().then(() => {});
