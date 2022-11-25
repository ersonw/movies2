import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '../../constants/Colors';

const NetworkError = props => {
  const { onReload } = props;

  return (
    <View style={styles.notice}>
      <SimpleLineIcons name={'drawer'} size={160} color={'#ddd'} />
      <Text style={styles.noticeMsg}>Oops，网络出现故障，请点击</Text>
      <TouchableOpacity onPress={() => onReload()} style={styles.reload}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>重新加载</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  notice: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeMsg: {
    color: '#999',
  },
  labelWrapper: {
    backgroundColor: Colors.primary,
    height: 40,
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  label: {
    color: '#fff',
    lineHeight: 40,
  },
  reload: {
    marginTop: 10,
  },
});

export default NetworkError;
