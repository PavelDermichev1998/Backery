import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

const token = JSON.parse(localStorage.getItem('token') as string);

export const getAllLogsRequestsAPI = async () => {
  const response = await axios.get(`${URL}/api/v1/logs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const getUserLogRequestAPI = async (id: string) => {
  const response = await axios.get(`${URL}/api/v1/logs/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const addUserLogAPI = async (data: { time: string; description: string }) => {
  const response = await axios.post(`${URL}/api/v1/logs`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const exportLogsAPI = async () => {
  const response = await axios.get(`${URL}/api/v1/logs/export`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export default {
  exportLogsAPI,
  addUserLogAPI,
  getUserLogRequestAPI,
  getAllLogsRequestsAPI,
};
