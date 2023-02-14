import axios from 'axios';
import { RequestUserUpdateType } from '../store/profileSlice/profileSlice';

const URL = process.env.REACT_APP_API_URL;

const token = JSON.parse(localStorage.getItem('token') as string);

export const getCurrentUserAPI = async () => {
  const response = await axios.get(`${URL}/api/v1/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const updateCurrentUserAPI = async (data: RequestUserUpdateType) => {
  const response = await axios.put(`${URL}/api/v1/users`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export default {
  getCurrentUserAPI,
  updateCurrentUserAPI,
};
