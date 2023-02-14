import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

const token = JSON.parse(localStorage.getItem('token') as string);

export const getJobRequestsAPI = async () => {
  const response = await axios.get(`${URL}/api/v1/job-requests`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const sentJobRequestAPI = async (id: string, positionName: string) => {
  const response = await axios.put(
    `${URL}/api/v1/job-requests/${id}/approve?positionName=${positionName}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return response;
};

export default {
  getJobRequestsAPI,
};
