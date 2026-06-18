import API from "./axios";

// REGISTER
export const signup = (data) => API.post("/auth/signup", data);

// LOGIN
export const login = (data) => API.post("/auth/login", data);