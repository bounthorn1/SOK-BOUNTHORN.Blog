import db from '../db.json';

export const getPosts = async () => {
  if (db && db.posts) {
    return db.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
  return [];
};

export const getPost = async (id) => {
  if (db && db.posts) {
    return db.posts.find(p => p.id === parseInt(id));
  }
  return null;
};

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
  if (db && db.users) {
    return db.users;
  }
  return [];
};

export const createUser = async (data) => {
  return data;
};