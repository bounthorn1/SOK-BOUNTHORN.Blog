// WE DO NOT USE AXIOS. WE DO NOT USE GITHUB LINKS.
// We just grab the file locally from the root folder!
import db from '../db.json';

export const getPosts = async () => {
  return db.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getPost = async (id) => {
  return db.posts.find(p => p.id === parseInt(id));
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
  return db.users || [];
};

export const createUser = async (data) => {
  return data;
};