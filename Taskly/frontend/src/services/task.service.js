import axios from 'axios';

const BASE_URL = '/api/tasks';

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const taskService = {
  getAll: async () => {
    const res = await axios.get(BASE_URL, getHeaders());
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`, getHeaders());
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(BASE_URL, data, getHeaders());
    return res.data;
  },

  update: async (id, data) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data, getHeaders());
    return res.data;
  },

  delete: async (id) => {
    await axios.delete(`${BASE_URL}/${id}`, getHeaders());
  },
};