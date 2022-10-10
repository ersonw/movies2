import * as React from 'react';
import {View, Text, Button} from 'react-native';

const ChaptersScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 24}}>视频章节页</Text>

      <Button
        title="跳转到教师页"
        onPress={() => navigation.navigate('Teacher')}
      />
    </View>
  );
};

export default ChaptersScreen;
