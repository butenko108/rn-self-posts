import { createSlice } from '@reduxjs/toolkit';
import { loadPosts, addPost, toggleBooked, removePost } from '../actions/actions';

const initialState = {
  allPosts: [],
  bookedPosts: [],
  loading: true,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.allPosts = action.payload;
      state.bookedPosts = action.payload.filter(post => post.booked);
      state.loading = false;
    });

    builder.addCase(addPost.fulfilled, (state, action) => {
      state.allPosts = [action.payload, ...state.allPosts];
    });

    builder.addCase(toggleBooked.fulfilled, (state, action) => {
      const allPosts = state.allPosts.map(post =>
        post.id === action.payload ? { ...post, booked: !post.booked } : post,
      );

      state.allPosts = allPosts;
      state.bookedPosts = allPosts.filter(post => post.booked);
    });

    builder.addCase(removePost.fulfilled, (state, action) => {
      state.allPosts = state.allPosts.filter(post => post.id !== action.payload);
      state.bookedPosts = state.bookedPosts.filter(post => post.id !== action.payload);
    });
  },
});

export default postSlice.reducer;
