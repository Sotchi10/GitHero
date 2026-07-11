import API from "./axios";

export const getPosts = () => API.get("/api/posts");

export const getPost = (id) => API.get(`/api/posts/${id}`);

export const createPost = (data, userId) =>
  API.post("/api/posts", data, {
    headers: {
      "x-user-id": userId,
    },
  });

export const getUsers = () => API.get("/api/users");
export const getDevelopers = () => API.get("/api/users/developers");
export const getStudents = () => API.get("/api/users/students");

