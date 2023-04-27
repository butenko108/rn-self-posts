import { useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Image, Button, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

import { removePost, toggleBooked } from '../store/actions/actions';
import { THEME } from '../theme';

export const PostScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { postId } = route.params;
  const post = useSelector(state => state.post.allPosts.find(post => post.id === postId));

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post));
  }, [dispatch, post]);

  const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId));

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Take photo" iconName={booked ? 'ios-star' : 'ios-star-outline'} onPress={toggleHandler} />
        </HeaderButtons>
      ),
    });
  }, [navigation, booked]);

  const removeHandler = () => {
    Alert.alert(
      'Removing post',
      'Are you sure to want to delete the post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            navigation.navigate('Main');
            dispatch(removePost(postId));
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  if (!post) {
    return null;
  }

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />

      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>

      <Button title="Remove" color={THEME.DANGER_COLOR} onPress={removeHandler} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: 'openRegular',
  },
});
