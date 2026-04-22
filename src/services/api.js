// DO NOT USE AXIOS OR LOCALHOST ON VERCEL
import db from '.../db.json';

export const getPosts = async () => {
  return db.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getPost = async (id) => {
  return db.posts.find(p => p.id === parseInt(id));
};

// These buttons will NOT save permanently on Vercel, but they won't break the site
export const createPost = async (data) => {
  return data;
};

export const updatePost = async (id, data) => {
  return data;
};

export const deletePost = async (id) => {
  return id;
};

export const getUsers = async () => {
  return db.users || [];
};

export const createUser = async (data) => {
  return data;
};