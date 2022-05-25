import axios from 'axios';

import config from 'app/config';
import { login, logout } from './index';
import { clearBulkDownload } from '../download';

export const loginUser = async (userData, dispatch) => {
  axios.defaults.headers.common.Authorization = null;
  try {
    const response = await axios.post(
      `${config.API_AUTH_URL}/api/login/`,
      userData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (response.status !== 200) {
      const message = `Error: ${
        response.data?.non_field_errors ||
        response.data?.error ||
        'Please make sure the data is correct and try again later'
      }`;
      return new Error(message);
    }

    dispatch(login(response.data.user_info));
    return response.data;
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.non_field_errors ||
      err.response?.data?.error ||
      'Please make sure the data is correct and try again later'
    }`;
    return new Error(message);
  }
};

export const logoutUser = async (dispatch) => {
  try {
    const response = await axios.post(`${config.API_AUTH_URL}/api/logout/`);

    if (response.status !== 204) {
      const message = `Error: ${
        response.data?.detail || 'Please try again later'
      }`;
      return new Error(message);
    }

    dispatch(logout());
    dispatch(clearBulkDownload());
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.detail || 'Please try again later'
    }`;
    return new Error(message);
  }
};

export const registerUser = async (userData) => {
  axios.defaults.headers.common.Authorization = null;
  try {
    const response = await axios.post(
      `${config.API_AUTH_URL}/api/register/`,
      userData,
    );

    if (response.status !== 200) {
      const message = `Error: ${
        response.data?.email ||
        response.data?.non_field_errors ||
        response.data?.error ||
        'Please make sure the data is correct and try again later'
      }`;
      return new Error(message);
    }

    return response.data;
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.email ||
      err.response?.data?.non_field_errors ||
      err.response?.data?.error ||
      'Please make sure the data is correct and try again later'
    }`;
    return new Error(message);
  }
};
