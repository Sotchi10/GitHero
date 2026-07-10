import {
  createRepository,
  findRepositoryByPath,
  findRepositoriesForProfile,
  findRepositoriesByOwner,
  findRepositoryByOwnerAndName,
} from "./repositoryModels.js";

import {
  findFilesByRepository,
  createFile,
  updateFile,
} from "./fileModels.js";

import {
  findCommitsByRepository,
  createCommit,
} from "./commitModels.js";

const validateRepository = (body) => {
  const name = String(body.name || "").trim();
  const description = String(body.description || "").trim();
  const visibility = body.visibility === "private" ? "private" : "public";

  if (!name) return { error: "Repository name is required" };
  if (name.length > 100) {
    return { error: "Repository name must be 100 characters or fewer" };
  }
  if (description.length > 500) {
    return { error: "Description must be 500 characters or fewer" };
  }

  return {
    repository: {
      name,
      description,
      visibility,
    },
  };
};

export const getMyRepositories = async (req, res) => {
  try {
    const repositories = await findRepositoriesByOwner(req.auth.userId);
    res.json(repositories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addRepository = async (req, res) => {
  try {
    const { repository, error } = validateRepository(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const existingRepository = await findRepositoryByOwnerAndName(
      req.auth.userId,
      repository.name,
    );

    if (existingRepository) {
      return res.status(409).json({
        message: "You already have a repository with that name",
      });
    }

    const createdRepository = await createRepository({
      ownerId: req.auth.userId,
      ...repository,
    });

    res.status(201).json({
      message: "Repository created successfully",
      repository: createdRepository,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getRepositoryByPath = async (req, res) => {
  try {
    const repository = await findRepositoryByPath({
      viewerId: req.auth.userId,
      username: req.params.username,
      name: req.params.repoName,
    });

    if (!repository) {
      return res.status(404).json({ message: "Repository not found" });
    }

    res.json(repository);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProfileRepositories = async (req, res) => {
  try {
    const repositories = await findRepositoriesForProfile({
      username: req.params.username,
      viewerId: req.user.id,
    });
    res.json(repositories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRepositoryFiles = async (req, res) => {
  try {
    const files = await findFilesByRepository(
      req.params.repoId
    );
    res.json(files);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const createRepositoryFile = async (req, res) => {
  try {

    const {
      name,
      content,
    } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "File name is required",
      });
    }
    const file = await createFile({
      repoId: req.params.repoId,
      name,
      content,
    });
    res.status(201).json({
      message: "File created successfully",
      file,
    });
  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
};

export const saveRepositoryFile = async (req, res) => {
  try {

    const file = await updateFile({
      fileId: req.params.fileId,
      content: req.body.content,
    });
    res.json({
      message: "File updated successfully",
      file,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const getRepositoryCommits = async (req, res) => {
  try {

    const commits = await findCommitsByRepository(
      req.params.repoId
    );
    res.json(commits);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const createRepositoryCommit = async (req, res) => {
  try {
    const {
      message,
    } = req.body;
    if (!message) {
      return res.status(400).json({
        message: "Commit message is required",
      });
    }
    const commit = await createCommit({
      repoId: req.params.repoId,
      authorId: req.auth.userId,
      message,
    });
    res.status(201).json({
      message: "Commit created successfully",
      commit,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};