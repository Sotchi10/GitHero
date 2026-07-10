import API from "./axios";

// Send current user id for authentication
const withUser = (userId) => ({
  headers: {
    "x-user-id": userId,
  },
});


// REPOSITORY

export const getMyRepositories = (userId) =>
  API.get("/api/repositories", withUser(userId));


export const createRepository = (data, userId) =>
  API.post("/api/repositories", data, withUser(userId));


export const getRepositoryByPath = (username, repoName, userId) =>
  API.get(
    `/api/repositories/${username}/${repoName}`,
    withUser(userId)
  );


// FILES

export const getRepositoryFiles = (repoId, userId) =>
  API.get(
    `/api/repositories/${repoId}/files`,
    withUser(userId)
  );


export const createRepositoryFile = (repoId, data, userId) =>
  API.post(
    `/api/repositories/${repoId}/files`,
    data,
    withUser(userId)
  );


export const saveRepositoryFile = (repoId, fileId, data, userId) =>
  API.put(
    `/api/repositories/${repoId}/files/${fileId}`,
    data,
    withUser(userId)
  );


// COMMITS

export const getRepositoryCommits = (repoId, userId) =>
  API.get(
    `/api/repositories/${repoId}/commits`,
    withUser(userId)
  );


export const createRepositoryCommit = (repoId, data, userId) =>
  API.post(
    `/api/repositories/${repoId}/commits`,
    data,
    withUser(userId)
  );