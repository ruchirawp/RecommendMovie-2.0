import { createSlice } from '@reduxjs/toolkit';

const tierSlice = createSlice({
  name: 'tier',
  initialState: {
    value: 'Free Ticket', // default tier
  },
  reducers: {
    setTier: (state, action) => {
      state.value = action.payload;
    },
    resetTier: (state) => {
      state.value = 'Free Ticket';
    },
  },
});

export const { setTier, resetTier } = tierSlice.actions;

export default tierSlice.reducer;
