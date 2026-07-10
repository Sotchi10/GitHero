import { db } from "../../config/db.js";


export const findCommitsByRepository = async (repoId) => {

  const [rows] = await db.query(
    `
    SELECT
      c.commit_id,
      c.repo_id,
      c.message,
      c.created_at,

      p.username AS author_username,
      p.avatar

    FROM commits c

    JOIN profile p
      ON p.user_id = c.author_id

    WHERE c.repo_id = ?

    ORDER BY c.created_at DESC
    `,
    [repoId]
  );


  return rows;
};



export const createCommit = async ({
  repoId,
  authorId,
  message,
}) => {

  const [result] = await db.query(
    `
    INSERT INTO commits
    (
      repo_id,
      author_id,
      message
    )
    VALUES (?, ?, ?)
    `,
    [
      repoId,
      authorId,
      message,
    ]
  );


  const [rows] = await db.query(
    `
    SELECT
      c.commit_id,
      c.repo_id,
      c.author_id,
      c.message,
      c.created_at,
      p.username AS author_username

    FROM commits c

    JOIN profile p
      ON p.user_id = c.author_id

    WHERE c.commit_id = ?
    `,
    [result.insertId]
  );


  return rows[0];
};
