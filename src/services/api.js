import db from '../../db.json';

export const getPosts = async () => {
  if (db && db.posts) {
    return db.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
  return [];
};

export const getPost = async (id) => {
  // This will print in the console to help us debug
  console.log("Looking for Post ID:", id);
  
  if (db && db.posts) {
    const foundPost = db.posts.find(p => String(p.id) === String(id));
    console.log("Found this post:", foundPost);
    return foundPost;
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