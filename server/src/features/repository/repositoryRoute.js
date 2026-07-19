import express from "express";
import { requireAuth } from "../../middleware/auth.js";

import {
  addRepository,
  getMyRepositories,
  getRepositoryByPath,
  getProfileRepositories,
  getRepositoryFiles,
  createRepositoryFile,
  saveRepositoryFile,
  getRepositoryCommits,
  createRepositoryCommit,
  removeRepository,
} from "./repositoryController.js";


const repositoryRoute = express.Router();


// LIST
repositoryRoute.get("/", requireAuth, getMyRepositories);

// CREATE
repositoryRoute.post("/", requireAuth, addRepository);

// DELETE
repositoryRoute.delete("/:repoId", requireAuth, removeRepository);

// FILES
repositoryRoute.get("/:repoId/files", requireAuth, getRepositoryFiles);
repositoryRoute.post("/:repoId/files", requireAuth, createRepositoryFile);
repositoryRoute.put("/:repoId/files/:fileId", requireAuth, saveRepositoryFile);

// COMMITS
repositoryRoute.get("/:repoId/commits", requireAuth, getRepositoryCommits);
repositoryRoute.post("/:repoId/commits", requireAuth, createRepositoryCommit);

// PROFILE
repositoryRoute.get("/user/:username", requireAuth, getProfileRepositories);

repositoryRoute.get("/:username/:repoName", requireAuth, getRepositoryByPath);


export default repositoryRoute;
