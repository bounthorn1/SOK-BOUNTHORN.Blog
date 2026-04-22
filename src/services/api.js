// Import your database directly!
import db from './db.json';

export const getPosts = async () => {
  // Get posts directly from db.json instead of localhost:3000
  return db.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getPost = async (id) => {
  return db.posts.find(p => p.id === parseInt(id));
};

// ⚠️ NOTE: The functions below will NOT save permanently on Vercel 
// because Vercel files are "read-only". But they will not break your site.
export const createPost = async (data) => {
  console.log("Would save to db.json locally, but cannot save on Vercel.");
  return data; 
};

export const updatePost = async (id, data) => {
  return data;
};

export const deletePost = async (id) => {
  return id;
};

export const getUsers = async () => {
  return db.users; // Assuming your db.json has a "users" array
};

export const createUser = async (data) => {
  return data;
};