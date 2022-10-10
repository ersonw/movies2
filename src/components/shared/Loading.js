import * as React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

const Loading = () => {
  return <ActivityIndicator size="small" color={Colors.primary} style={styles.ActivityIndicatorStyle} />;
};

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Loading;
