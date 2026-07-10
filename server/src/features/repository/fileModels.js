import { db } from "../../config/db.js";


export const findFilesByRepository = async (repoId) => {
  const [rows] = await db.query(
    `
    SELECT
      file_id,
      repo_id,
      name,
      path,
      content,
      created_at,
      updated_at
    FROM files
    WHERE repo_id = ?
    ORDER BY created_at ASC
    `,
    [repoId]
  );

  return rows;
};


export const createFile = async ({
  repoId,
  name,
  content = "",
}) => {

  const [result] = await db.query(
    `
    INSERT INTO files
    (
      repo_id,
      name,
      path,
      content
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      repoId,
      name,
      name,
      content,
    ]
  );


  const [rows] = await db.query(
    `
    SELECT *
    FROM files
    WHERE file_id = ?
    `,
    [result.insertId]
  );


  return rows[0];
};


export const updateFile = async ({
  fileId,
  content,
}) => {

  await db.query(
    `
    UPDATE files
    SET content = ?
    WHERE file_id = ?
    `,
    [
      content,
      fileId,
    ]
  );


  const [rows] = await db.query(
    `
    SELECT *
    FROM files
    WHERE file_id = ?
    `,
    [fileId]
  );


  return rows[0];
};