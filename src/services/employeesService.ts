import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

const token = JSON.parse(localStorage.getItem('token') as string);

export const getEmployeesRequestsAPI = async () => {
  const response = await axios.get(`${URL}/api/v1/employees/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export default {
  getEmployeesRequestsAPI,
};
