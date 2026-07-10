import { db } from "../../config/db.js";

const REPOSITORY_SELECT = `
  SELECT
    r.repo_id AS id,
    r.owner_id,
    r.name,
    r.description,
    r.visibility,
    r.created_at,
    r.updated_at,
    p.username,
    p.avatar
  FROM repositories r
  JOIN profile p ON p.user_id = r.owner_id
`;


export const findRepositoriesByOwner = async (ownerId) => {
  const [rows] = await db.query(
    `${REPOSITORY_SELECT}
     WHERE r.owner_id = ?
     ORDER BY r.updated_at DESC, r.repo_id DESC`,
    [ownerId],
  );

  return rows;
};

export const findRepositoryById = async (repoId) => {
  const [rows] = await db.query(`${REPOSITORY_SELECT} WHERE r.repo_id = ?`, [
    repoId,
  ]);

  return rows[0];
};

export const findRepositoryForOwner = async (repoId, ownerId) => {
  const [rows] = await db.query(
    `${REPOSITORY_SELECT} WHERE r.repo_id = ? AND r.owner_id = ?`,
    [repoId, ownerId],
  );

  return rows[0];
};

export const findRepositoriesForProfile = async ({ username, viewerId }) => {
  const [rows] = await db.query(
    `${REPOSITORY_SELECT}
     WHERE p.username = ? AND (r.visibility = 'public' OR r.owner_id = ?)
     ORDER BY r.updated_at DESC, r.repo_id DESC`,
    [username, viewerId||null],
  );

  return rows;
};

export const findRepositoryByOwnerAndName = async (ownerId, name) => {
  const [rows] = await db.query(
    `${REPOSITORY_SELECT} WHERE r.owner_id = ? AND r.name = ?`,
    [ownerId, name],
  );

  return rows[0];
};

export const findRepositoryByPath = async ({ viewerId, username, name }) => {
  const [rows] = await db.query(
    `${REPOSITORY_SELECT}
     WHERE p.username = ?
       AND r.name = ?
       AND (r.visibility = 'public' OR r.owner_id = ?)`,
    [username, name, viewerId],
  );

  return rows[0];
};

export const createRepository = async ({
  ownerId,
  name,
  description,
  visibility,
}) => {
  const [result] = await db.query(
    `INSERT INTO repositories (owner_id, name, description, visibility)
     VALUES (?, ?, ?, ?)`,
    [ownerId, name, description, visibility],
  );

  return findRepositoryById(result.insertId);
};
