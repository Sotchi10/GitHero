import API from "./axios";

export const getPosts = () => API.get("/api/posts");

export const getPost = (id) => API.get(`/api/posts/${id}`);

export const createPost = (data, userId) =>
  API.post("/api/posts", data, {
    headers: {
      "x-user-id": userId,
    },
  });

export const getDevelopers = () => API.get("/api/developers");
