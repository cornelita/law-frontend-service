import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearBulkDownload } from '../download';

export const initialAuthState = {
  email: '',
  name: '',
  username: '',
  token: '',
  expiry: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: initialAuthState,
  },
  reducers: {
    login: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
      axios.defaults.headers.common.Authorization = `Token ${state.value.token}`;
    },
    logout: (state) => {
      state.value = initialAuthState;
      axios.defaults.headers.common.Authorization = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

// Timer to handle expired token (source: https://stackoverflow.com/a/71220230)
export const runLogoutTimer = (dispatch, expiry) => {
  const timer = Date.parse(expiry) - Date.now() || 9 * 60 * 60 * 1000; // Default: 9 hours

  setTimeout(() => {
    dispatch(logout());
    dispatch(clearBulkDownload());
  }, timer);
};

export default authSlice.reducer;
