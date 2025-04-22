import { configureStore } from '@reduxjs/toolkit';
import tierReducer from './slices/tierSlice';

const store = configureStore({
  reducer: {
    tier: tierReducer,
  },
});

export default store;
