import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  tier: 'Free Ticket', // default tier
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { name, email, tier } = action.payload;
      state.name = name;
      state.email = email;
      state.tier = tier;
    },
    updateTier(state, action) {
      state.tier = action.payload;
    },
    clearUser(state) {
      state.name = '';
      state.email = '';
      state.tier = 'Free Ticket';
    },
  },
});

export const { setUser, updateTier, clearUser } = userSlice.actions;

export default userSlice.reducer;
