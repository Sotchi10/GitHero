import { db } from "../../config/db.js";

const PROFILE_SELECT = `
    SELECT
        p.profile_id,
        p.user_id,
        u.email,
        p.first_name,
        p.last_name,
        TRIM(CONCAT_WS(' ', p.first_name, p.last_name)) AS full_name,
        p.username,
        p.bio,
        p.description,
        p.gender,
        u.role,
        p.location,
        p.avatar
    FROM profile p
    JOIN users u ON u.user_id = p.user_id
`;

export const findProfileByUserId = async (userId) => {
    const [rows] = await db.query(
        `${PROFILE_SELECT} WHERE p.user_id = ?`,
        [userId]
    );

    return rows[0];
};

export const findProfileByUsername = async (username) => {
    const [rows] = await db.query(
        `${PROFILE_SELECT} WHERE p.username = ?`,
        [username]
    );

    return rows[0];
};

export const findProfileByUsernameForOtherUser = async (username, userId) => {
    const [rows] = await db.query(
        "SELECT profile_id FROM profile WHERE username = ? AND user_id <> ?",
        [username, userId]
    );

    return rows[0];
};

export const updateProfileByUserId = async (userId, data) => {
    const allowedFields = ["first_name", "last_name", "username", "bio", "description", "avatar"];
    const entries = Object.entries(data).filter(([key]) =>
        allowedFields.includes(key)
    );

    if (entries.length === 0) {
        return findProfileByUserId(userId);
    }

    const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
    const values = entries.map(([, value]) => value);

    await db.query(
        `UPDATE profile SET ${setClause} WHERE user_id = ?`,
        [...values, userId]
    );

    return findProfileByUserId(userId);
};
