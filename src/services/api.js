import axios from 'axios';

// We point directly to the public file. 
// Note: We use a relative path '/db.json'
const API_URL = '/db.json';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. GET ALL POSTS
export const getPosts = async () => {
  // We fetch the whole file, then access the 'posts' array inside it
  const res = await api.get('');
  return res.data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

// 2. GET SINGLE POST
export const getPost = async (id) => {
  const res = await api.get('');
  // Find the specific post in the array
  return res.data.posts.find(post => post.id == id);
};

// 3. CREATE POST (Disabled for Production)
export const createPost = async (data) => {
  if (window.location.hostname !== 'localhost') {
    console.error("Cannot save posts on the hosted version (Read-Only)");
    return null;
  }
  // This only works locally with json-server
  const res = await axios.post('http://localhost:3000/posts', data);
  return res.data;
};

// 4. UPDATE POST (Disabled for Production)
export const updatePost = async (id, data) => {
  if (window.location.hostname !== 'localhost') {
    console.error("Cannot update posts on the hosted version (Read-Only)");
    return null;
  }
  const res = await axios.put(`http://localhost:3000/posts/${id}`, data);
  return res.data;
};

// 5. DELETE POST (Disabled for Production)
export const deletePost = async (id) => {
  if (window.location.hostname !== 'localhost') {
    console.error("Cannot delete posts on the hosted version (Read-Only)");
    return null;
  }
  const res = await axios.delete(`http://localhost:3000/posts/${id}`);
  return res.data;
};

// 6. GET USERS
export const getUsers = async () => {
  const res = await api.get('');
  return res.data.users;
};

// 7. CREATE USER (Disabled for Production)
export const createUser = async (data) => {
  if (window.location.hostname !== 'localhost') {
    console.error("Cannot create users on the hosted version (Read-Only)");
    return null;
  }
  const res = await axios.post('http://localhost:3000/users', data);
  return res.data;
};