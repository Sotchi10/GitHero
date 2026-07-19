import { db } from "../../config/db.js";

const POST_SELECT = `
    SELECT
        po.post_id AS id,
        po.user_id,
        po.title,
        po.content,
        po.created_at,
        p.profile_id,
        p.first_name,
        p.last_name,
        TRIM(CONCAT_WS(' ', p.first_name, p.last_name)) AS full_name,
        p.username,
        p.bio,
        u.role,
        p.avatar
    FROM posts po
    JOIN profile p ON p.user_id = po.user_id
    JOIN users u ON u.user_id = po.user_id
`;

export const findAllPosts = async () => {
    const [rows] = await db.query(`${POST_SELECT} ORDER BY po.created_at DESC, po.post_id DESC`);
    return rows;
};

export const findPostById = async (id) => {
    const [rows] = await db.query(`${POST_SELECT} WHERE po.post_id = ?`, [id]);
    return rows[0];
};

export const createPost = async ({ userId, title, content }) => {
    const [result] = await db.query(
        "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)",
        [userId, title, content]
    );

    return findPostById(result.insertId);
};

export const deletePostById = async (id, userId) => {
    const [result] = await db.query(
        "DELETE FROM posts WHERE post_id = ? AND user_id = ?",
        [id, userId]
    );

    return result.affectedRows;
};
