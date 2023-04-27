import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PostList } from '../components/PostList';

export const BookedScreen = ({ navigation }) => {
  const bookedPosts = useSelector(state => state.post.bookedPosts);

  const openPostHandler = post => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked });
  };

  return <PostList data={bookedPosts} onOpen={openPostHandler} />;
};
