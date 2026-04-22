
import axios from 'axios';

const API_URL = 'https://github.com/bounthorn1/SOK-BOUNTHORN.Blog/blob/main/src/services/api.js';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPosts = async () => {
  const res = await api.get('/posts');
  return res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getPost = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const createPost = async (data) => {
  const res = await api.post('/posts', data);
  return res.data;
};

export const updatePost = async (id, data) => {
  const res = await api.put(`/posts/${id}`, data);
  return res.data;
};

export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};

export const getUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};

export const createUser = async (data) => {
  const res = await api.post('/users', data);
  return res.data;
};