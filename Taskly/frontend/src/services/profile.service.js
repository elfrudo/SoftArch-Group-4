import axios from 'axios';

const BASE_URL = '/api/profile';

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const profileService = {
  getProfile: async () => {
    const res = await axios.get(BASE_URL, getHeaders());
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await axios.put(BASE_URL, data, getHeaders());
    return res.data;
  },

  updatePassword: async (data) => {
    const res = await axios.put(`${BASE_URL}/password`, data, getHeaders());
    return res.data;
  },
};