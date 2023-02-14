import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

export const authLoginAPI = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${URL}/api/v1/users/login`, data);

  return response;
};

export const authRegisterAPI = async (data: {
  name: string;
  secondName: string;
  email: string;
  phone: string;
  birthDay: string;
  positions: Array<{ name: string }>;
}) => {
  const response = await axios.post(`${URL}/api/v1/users/register`, data);

  return response;
};

export const getAllPositionsAPI = async () => {
  const response = await axios.get(`${URL}/api/v1/positions`);

  return response;
};

export default {
  authLoginAPI,
  authRegisterAPI,
  getAllPositionsAPI,
};
