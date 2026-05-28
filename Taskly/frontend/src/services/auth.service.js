import axios from 'axios';

const BASE_URL = '/api/auth';

export const authService = {
  register: async (data) => {
    const res = await axios.post(`${BASE_URL}/register`, data);
    return res.data;
  },

  login: async (data) => {
    const res = await axios.post(`${BASE_URL}/login`, data);
    return res.data;
  },
};