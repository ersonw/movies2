import * as React from 'react';
import {View, Text, Button} from 'react-native';

const CoursesScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 24}}>视频课程页</Text>

      <Button
        title="跳转到视频章节页"
        onPress={() =>
          navigation.navigate('ChapterStack', {screen: 'Chapters'})
        }
      />
    </View>
  );
};

export default CoursesScreen;
