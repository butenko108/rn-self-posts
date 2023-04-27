import { configureStore } from '@reduxjs/toolkit';
import postSlice from './reducers/post';

export default configureStore({
  reducer: {
    post: postSlice,
  },
});
