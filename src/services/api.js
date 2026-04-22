// We removed axios and localhost because Vercel doesn't use them.
// We are using local mock data so your Vercel site actually shows something.

const mockPosts = [
  {
    id: 1,
    title: "Welcome to my Blog!",
    content: "This is a test story to prove the Vercel deployment is working perfectly.",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Second Story",
    content: "You can add more mock stories here so your website isn't empty.",
    created_at: new Date().toISOString()
  }
];

const mockUsers = [];

// This simulates a tiny loading time, just like a real server
const delay = (ms) => new Promise(resolve => setTimeout(resolve, 200));

export const getPosts = async () => {
  await delay(200);
  return mockPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getPost = async (id) => {
  await delay(200);
  return mockPosts.find(p => p.id === parseInt(id));
};

// WARNING: This will NOT save permanently on Vercel. 
// It will only save in the browser's memory until you refresh the page.
export const createPost = async (data) => {
  await delay(200);
  const newPost = { id: Date.now(), ...data, created_at: new Date().toISOString() };
  mockPosts.push(newPost);
  return newPost;
};

export const updatePost = async (id, data) => {
  await delay(200);
  return { id, ...data };
};

export const deletePost = async (id) => {
  await delay(200);
  return id;
};

export const getUsers = async () => {
  await delay(200);
  return mockUsers;
};

export const createUser = async (data) => {
  await delay(200);
  return data;
};