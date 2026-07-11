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
            u.role,
            p.avatar
        FROM profile p
        JOIN users u ON u.user_id = p.user_id
        WHERE LOWER(u.role) = 'developer'
        ORDER BY p.profile_id DESC
    `);

    return rows;
};
export const findAllStudents = async () => {
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
            u.role,
            p.avatar
        FROM profile p
        JOIN users u ON u.user_id = p.user_id
        WHERE LOWER(u.role) = 'student'
        ORDER BY p.profile_id DESC
    `);

    return rows;
};
export const findAllUsers = async () => {
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
            u.role,
            p.avatar
        FROM profile p
        JOIN users u ON u.user_id = p.user_id
        WHERE LOWER(u.role) != 'admin'
        ORDER BY p.profile_id DESC
    `);

    return rows;
};
