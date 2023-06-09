import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const AboutScreen = props => {
  return (
    <View style={styles.center}>
      <Text>This is the best app for personal notes</Text>
      <Text>
        App version: <Text style={styles.version}>1.0.0</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  version: {
    fontFamily: 'openBold',
  },
});
