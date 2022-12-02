import {ParamListBase, RouteProp} from "@react-navigation/native";

export default {
  primary: '#FF7031',
  premium: '#1f99b0',
  free: '#d3d7e0',
  moderator: '#56b1e0',
  maintainer: '#ff7f6f',
  admin: '#eac62a',
  yellow: '#eac62a',
  white: '#fff',
  black: '#404044',
  navbarBottom: '#a7a7aa',
  tabBarInactiveText: '#504F56',
  tabBarActiveText: '#404044',
  date: '#787C7D',
  headerTitle: '#d3d7e0',
  headerBackgroundColor: '#181921',
  headerButton: '#fff',
  backgroundColor: '#181921',
  transparent: 'rgba(255,255,255,0)',
};
export type ScreenProps = { route: RouteProp<ParamListBase, string>;navigation:any;};