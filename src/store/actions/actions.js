import { createAsyncThunk } from '@reduxjs/toolkit';
import { DB } from '../../db';
import * as FileSystem from 'expo-file-system';

export const loadPosts = createAsyncThunk('post/getPosts', async () => await DB.getPosts());

export const addPost = createAsyncThunk('post/addPost', async post => {
  const fileName = post.img.split('/').pop();
  const newPath = FileSystem.documentDirectory + fileName;

  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: post.img,
    });
  } catch (e) {
    console.log('Error:', e);
  }

  const payload = { ...post, img: newPath };
  const id = await DB.createPost(payload);
  payload.id = id;

  return payload;
});

export const toggleBooked = createAsyncThunk('post/toggleBooked', async post => {
  await DB.updatePost(post);

  return post.id;
});

export const removePost = createAsyncThunk('post/removePost', async id => {
  await DB.removePost(id);

  return id;
});
