import { db } from "../../config/db.js";

export const findAllDevelopers = async () => {
    const [rows] = await db.query(`
        SELECT
            p.profile_id,
            p.user_id,
            p.first_name,
            p.last_name,
            TRIM(CONCAT_WS(' ', p.first_name, p.last_name)) AS full_name,
            p.username,
            p.bio,
            p.description,
            p.role,
            p.avatar
        FROM profile p
        WHERE LOWER(p.role) = 'developer'
        ORDER BY p.profile_id DESC
    `);

    return rows;
};
