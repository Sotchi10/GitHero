import API from "./axios";

// Get user profile info by username
export const getPfp = (username) => API.get(`/api/profile/${username}`);

// Get active user's profile info by auth user ID
export const getPfpByUserId = (userId) => API.get(`/api/profile/user/${userId}`);

// Update active user's editable profile fields
//export const updatePfp = (userId, data) =>
//  API.patch(`/api/profile/user/${userId}`, data);

// Update authenticated user's profile through the API route
export const updateCurrentProfile = (userId, data) =>
  API.patch(`/api/profile/user/${userId}`, data, {
    headers: {
      "x-user-id": userId,
    },
  });

