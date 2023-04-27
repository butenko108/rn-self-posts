import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import { Post } from './Post';

export const PostList = ({ data, onOpen }) => (
  <View style={styles.wrapper}>
    {!data.length ? (
      <View style={styles.wrapper}>
        <Text style={styles.noItems}>No posts yet</Text>
      </View>
    ) : (
      <FlatList data={data} renderItem={({ item }) => <Post post={item} onOpen={onOpen} />} />
    )}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  noItems: {
    fontFamily: 'openRegular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
  },
});
