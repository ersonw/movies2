import * as React from 'react';
import {Text, View, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 24}}>新闻的首页</Text>

      <Button
        title="跳转到新闻内页"
        onPress={() => navigation.navigate('Articles')}
      />
    </View>
  );
};

export default HomeScreen;
