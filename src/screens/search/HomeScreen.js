import * as React from 'react';
import {Text, View, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 24}}>搜索的首页</Text>

      <Button
        title="跳转到搜索结果页"
        onPress={() => navigation.navigate('Results')}
      />
    </View>
  );
};

export default HomeScreen;
