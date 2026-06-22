import API from "./axios";

// Get user profile info by username
export const getPfp = (username) => API.get(`/profile/${username}`);

// Get active user's profile info by auth user ID
export const getPfpByUserId = (userId) => API.get(`/profile/user/${userId}`);

// Update active user's editable profile fields
export const updatePfp = (userId, data) =>
  API.patch(`/profile/user/${userId}`, data);
